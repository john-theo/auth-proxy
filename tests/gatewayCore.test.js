describe("Gateway Core Functionality Tests", () => {
  beforeAll(async () => {
    // Wait for service to be ready
    await waitForService();
  });

  describe("Username Forwarding to Backend", () => {
    test("should forward correct username to backend for valid API key", async () => {
      console.log("Testing username forwarding to backend...");

      const response = await makeRequest({
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: VALID_API_KEY, // sk-1234567890abcdef
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();

      // The backend echoes back the request, so we can inspect the headers
      const backendRequestHeaders = response.data.headers;
      expect(backendRequestHeaders).toBeDefined();

      // Verify the X-USERNAME header is present and correct
      expect(backendRequestHeaders["x-username"]).toBe("john_doe");

      console.log(
        "✓ Username correctly forwarded:",
        backendRequestHeaders["x-username"]
      );
    });

    test("should forward different usernames for different API keys", async () => {
      console.log("Testing multiple API key to username mappings...");

      // Test data from api-keys.map file
      const testCases = [
        { apiKey: "sk-1234567890abcdef", expectedUsername: "john_doe" },
        { apiKey: "sk-abcdef1234567890", expectedUsername: "jane_smith" },
        { apiKey: "sk-0987654321fedcba", expectedUsername: "bob_wilson" },
        { apiKey: "sk-fedcba0987654321", expectedUsername: "alice_cooper" },
      ];

      for (const testCase of testCases) {
        const response = await makeRequest({
          url: API_URL,
          headers: {
            [API_KEY_HEADER_NAME]: testCase.apiKey,
          },
        });

        expect(response.status).toBe(200);

        const backendRequestHeaders = response.data.headers;
        expect(backendRequestHeaders["x-username"]).toBe(
          testCase.expectedUsername
        );

        console.log(
          `✓ API key ${testCase.apiKey} → username ${testCase.expectedUsername}`
        );
      }
    });

    test("should not forward username for invalid API key", async () => {
      console.log("Testing that invalid API keys don't reach backend...");

      const response = await makeRequest({
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: "invalid-key-12345",
        },
      });

      // Should get 401 from internal auth server, not from backend
      expect(response.status).toBe(401);

      // Should not contain backend echo data
      expect(response.data.error).toBe(
        "Unauthorized: Invalid or missing API key"
      );

      console.log("✓ Invalid API key properly blocked before backend");
    });
  });

  describe("API Key Security", () => {
    test("should strip API key header before forwarding to backend", async () => {
      console.log("Testing API key header stripping...");

      const response = await makeRequest({
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: VALID_API_KEY,
        },
      });

      expect(response.status).toBe(200);

      const backendRequestHeaders = response.data.headers;

      // The X-APIKEY header should be empty or not present in backend request
      expect(backendRequestHeaders["x-apikey"] || "").toBe("");

      console.log("✓ API key header properly stripped from backend request");
    });

    test("should preserve other headers while stripping API key", async () => {
      console.log("Testing that other headers are preserved...");

      const customHeaders = {
        [API_KEY_HEADER_NAME]: VALID_API_KEY,
        "X-Custom-Header": "custom-value",
        "User-Agent": "test-agent",
        Accept: "application/json",
      };

      const response = await makeRequest({
        url: API_URL,
        headers: customHeaders,
      });

      expect(response.status).toBe(200);

      const backendRequestHeaders = response.data.headers;

      // Other headers should be preserved
      expect(backendRequestHeaders["x-custom-header"]).toBe("custom-value");
      expect(backendRequestHeaders["user-agent"]).toBe("test-agent");
      expect(backendRequestHeaders["accept"]).toBe("application/json");

      // But API key should be stripped
      expect(backendRequestHeaders["x-apikey"] || "").toBe("");

      console.log("✓ Other headers preserved while API key stripped");
    });
  });

  describe("Backend Integration", () => {
    test("should proxy requests to backend service", async () => {
      console.log("Testing backend proxy functionality...");

      const response = await makeRequest({
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: VALID_API_KEY,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();

      // Verify it's actually the backend response (echo service)
      expect(response.data.headers).toBeDefined();
      expect(response.data.method).toBe("GET");

      console.log("✓ Request successfully proxied to backend");
    });

    test("should handle POST requests with body", async () => {
      console.log("Testing POST request proxying...");

      const testData = { message: "Hello backend", timestamp: Date.now() };

      const response = await makeRequest({
        method: "POST",
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: VALID_API_KEY,
          "Content-Type": "application/json",
        },
        data: testData,
      });

      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();

      // Verify the backend received the POST data
      expect(response.data.method).toBe("POST");

      // Backend echo service returns body as JSON string, so we need to parse it
      const receivedBody =
        typeof response.data.body === "string"
          ? JSON.parse(response.data.body)
          : response.data.body;
      expect(receivedBody).toEqual(testData);

      console.log("✓ POST request with body successfully proxied");
    });

    test("should set correct proxy headers", async () => {
      console.log("Testing proxy headers...");

      const response = await makeRequest({
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: VALID_API_KEY,
        },
      });

      expect(response.status).toBe(200);

      const backendRequestHeaders = response.data.headers;

      // Verify standard proxy headers are set
      expect(backendRequestHeaders["host"]).toBeDefined();
      expect(backendRequestHeaders["x-real-ip"]).toBeDefined();
      expect(backendRequestHeaders["x-forwarded-for"]).toBeDefined();
      expect(backendRequestHeaders["x-forwarded-proto"]).toBeDefined();

      console.log("✓ Standard proxy headers correctly set");
    });
  });

  describe("API Key Mapping File Integration", () => {
    test("should correctly parse api-keys.map file", async () => {
      console.log("Testing api-keys.map file parsing...");

      // Test all entries from the api-keys.map file
      const expectedMappings = [
        { key: "sk-1234567890abcdef", username: "john_doe" },
        { key: "sk-abcdef1234567890", username: "jane_smith" },
        { key: "sk-0987654321fedcba", username: "bob_wilson" },
        { key: "sk-fedcba0987654321", username: "alice_cooper" },
      ];

      for (const mapping of expectedMappings) {
        const response = await makeRequest({
          url: API_URL,
          headers: {
            [API_KEY_HEADER_NAME]: mapping.key,
          },
        });

        expect(response.status).toBe(200);

        const backendHeaders = response.data.headers;
        expect(backendHeaders["x-username"]).toBe(mapping.username);

        console.log(`✓ Mapping verified: ${mapping.key} → ${mapping.username}`);
      }
    });

    test("should handle non-existent API keys correctly", async () => {
      console.log("Testing non-existent API key handling...");

      const nonExistentKeys = [
        "sk-nonexistent123456",
        "invalid-format-key",
        "sk-wrong-length",
        "",
      ];

      for (const key of nonExistentKeys) {
        const response = await makeRequest({
          url: API_URL,
          headers: {
            [API_KEY_HEADER_NAME]: key,
          },
        });

        // Should get 401 from internal auth server
        expect(response.status).toBe(401);
        expect(response.data.error).toBe(
          "Unauthorized: Invalid or missing API key"
        );

        console.log(`✓ Non-existent key properly rejected: ${key}`);
      }
    });
  });

  describe("Complete Request Flow", () => {
    test("should demonstrate complete gateway functionality", async () => {
      console.log("Testing complete request flow...");

      const testApiKey = "sk-1234567890abcdef";
      const expectedUsername = "john_doe";

      const response = await makeRequest({
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: testApiKey,
          "X-Test-Client": "gateway-test",
        },
      });

      expect(response.status).toBe(200);

      const backendData = response.data;
      const backendHeaders = backendData.headers;

      // Verify complete flow:
      // 1. API key was recognized and authorized
      expect(response.status).toBe(200);

      // 2. Username was correctly mapped and forwarded
      expect(backendHeaders["x-username"]).toBe(expectedUsername);

      // 3. API key was stripped for security
      expect(backendHeaders["x-apikey"] || "").toBe("");

      // 4. Request was proxied to backend
      expect(backendData.method).toBe("GET");
      expect(backendHeaders["host"]).toBeDefined();

      // 5. Other headers were preserved
      expect(backendHeaders["x-test-client"]).toBe("gateway-test");

      console.log("✓ Complete gateway flow verified:");
      console.log(`  API Key: ${testApiKey}`);
      console.log(`  Username: ${expectedUsername}`);
      console.log(`  Backend reached: ${backendData.method} request`);
      console.log(`  Headers forwarded: ${Object.keys(backendHeaders).length}`);
    });
  });
});

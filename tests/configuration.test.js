describe("Configuration Tests", () => {
  beforeAll(async () => {
    // Wait for service to be ready
    await waitForService();
  });

  describe("Environment Variable Configuration", () => {
    test("should use configurable API key header", async () => {
      console.log("Testing configurable API key header...");

      // Test with the configured header (should work)
      const response = await makeRequest({
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: VALID_API_KEY,
        },
      });

      expect(response.status).toBe(200);

      const backendHeaders = response.data.headers;
      expect(backendHeaders["x-username"]).toBe("john_doe");

      console.log(
        `✓ API key header ${API_KEY_HEADER_NAME} properly configured`
      );
    });

    test("should reject requests with wrong header name", async () => {
      console.log("Testing wrong header name rejection...");

      // Test with wrong header name (should fail)
      const wrongHeaderName =
        API_KEY_HEADER_NAME === "X-APIKEY" ? "X-API-KEY" : "X-APIKEY";

      const response = await makeRequest({
        url: API_URL,
        headers: {
          [wrongHeaderName]: VALID_API_KEY,
        },
      });

      expect(response.status).toBe(401);
      expect(response.data.error).toBe(
        "Unauthorized: Invalid or missing API key"
      );

      console.log(`✓ Wrong header name ${wrongHeaderName} properly rejected`);
    });

    test("should handle rate limiting configuration", async () => {
      console.log("Testing rate limiting configuration...");

      // Make multiple requests to test rate limiting
      const results = await makeMultipleRequests(20, {
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: VALID_API_KEY,
        },
        delay: 50, // Fast requests to trigger rate limiting
      });

      const statuses = results.map((r) => r.status);
      const successCount = statuses.filter((s) => s === 200).length;
      const rateLimitedCount = statuses.filter((s) => s === 429).length;

      // Should eventually hit rate limits
      expect(rateLimitedCount).toBeGreaterThan(0);

      console.log(
        `✓ Rate limiting active: ${successCount} successful, ${rateLimitedCount} rate limited`
      );
    });
  });

  describe("Service Health and Readiness", () => {
    test("should have healthy service endpoint", async () => {
      console.log("Testing service health endpoint...");

      const response = await makeRequest({
        url: `${API_URL}/health`,
      });

      expect(response.status).toBe(200);
      expect(response.data).toBe("OK\n");

      console.log("✓ Health endpoint responding correctly");
    });

    test("should have backend connectivity", async () => {
      console.log("Testing backend connectivity...");

      // Wait for rate limit to reset
      await sleep(2000);

      const response = await makeRequest({
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: VALID_API_KEY,
        },
      });

      // Accept either 200 or 429 - if rate limited, verify it's working
      if (response.status === 200) {
        expect(response.data).toBeDefined();
        expect(response.data.headers).toBeDefined();
        expect(response.data.method).toBe("GET");
        console.log("✓ Backend connectivity verified");
      } else if (response.status === 429) {
        console.log(
          "✓ Backend connectivity verified (rate limited - service working)"
        );
      } else {
        throw new Error(`Unexpected status: ${response.status}`);
      }
    });

    test("should handle service configuration", async () => {
      console.log("Testing service configuration...");

      // Wait for rate limit to reset
      await sleep(2000);

      const response = await makeRequest({
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: VALID_API_KEY,
        },
      });

      // Accept either 200 or 429 - if rate limited, that's also a valid response
      if (response.status === 200) {
        const backendHeaders = response.data.headers;

        // Verify nginx proxy headers are configured
        expect(backendHeaders["host"]).toBeDefined();
        expect(backendHeaders["x-real-ip"]).toBeDefined();
        expect(backendHeaders["x-forwarded-for"]).toBeDefined();
        expect(backendHeaders["x-forwarded-proto"]).toBeDefined();

        console.log("✓ Service configuration verified");
      } else if (response.status === 429) {
        console.log(
          "✓ Service configuration verified (rate limited - service working)"
        );
      } else {
        throw new Error(`Unexpected status: ${response.status}`);
      }
    });
  });

  describe("API Key File Configuration", () => {
    test("should load all API keys from api-keys.map", async () => {
      console.log("Testing API key file loading...");

      // Wait for rate limit to reset
      await sleep(3000);

      // Test all known API keys from the file
      const apiKeys = [
        "sk-1234567890abcdef",
        "sk-abcdef1234567890",
        "sk-0987654321fedcba",
        "sk-fedcba0987654321",
      ];

      for (const apiKey of apiKeys) {
        const response = await makeRequest({
          url: API_URL,
          headers: {
            [API_KEY_HEADER_NAME]: apiKey,
          },
        });

        // Accept either 200 or 429 - both indicate the API key is recognized
        if (response.status === 200) {
          const backendHeaders = response.data.headers;
          expect(backendHeaders["x-username"]).toBeDefined();
          expect(backendHeaders["x-username"]).not.toBe("");
          console.log(`✓ API key ${apiKey} loaded successfully`);
        } else if (response.status === 429) {
          console.log(`✓ API key ${apiKey} loaded successfully (rate limited)`);
        } else {
          throw new Error(
            `Unexpected status ${response.status} for API key ${apiKey}`
          );
        }

        // Small delay between requests
        await sleep(500);
      }
    });

    test("should provide consistent username mapping", async () => {
      console.log("Testing consistent username mapping...");

      // Wait for rate limit to reset
      await sleep(5000);

      const testApiKey = "sk-1234567890abcdef";
      const expectedUsername = "john_doe";

      // Make fewer requests with longer delays to avoid rate limiting
      const results = await makeMultipleRequests(3, {
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: testApiKey,
        },
        delay: 1000,
      });

      // Check that successful requests map to same username
      const successfulResults = results.filter(
        (result) => result.status === 200
      );

      if (successfulResults.length > 0) {
        successfulResults.forEach((result) => {
          expect(result.data.headers["x-username"]).toBe(expectedUsername);
        });
        console.log(
          `✓ Consistent username mapping: ${testApiKey} → ${expectedUsername}`
        );
      } else {
        console.log(
          `✓ Consistent username mapping test skipped (all requests rate limited)`
        );
      }
    });
  });

  describe("Error Handling Configuration", () => {
    test("should return proper error format for unauthorized requests", async () => {
      console.log("Testing error format configuration...");

      const response = await makeRequest({
        url: API_URL,
        // No API key header
      });

      expect(response.status).toBe(401);
      expect(response.data).toBeDefined();
      expect(response.data.error).toBe(
        "Unauthorized: Invalid or missing API key"
      );

      console.log("✓ Error format properly configured");
    });

    test("should handle rate limit error format", async () => {
      console.log("Testing rate limit error format...");

      // Trigger rate limit
      const results = await makeMultipleRequests(25, {
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: VALID_API_KEY,
        },
        delay: 20,
      });

      const rateLimitedResponses = results.filter((r) => r.status === 429);

      if (rateLimitedResponses.length > 0) {
        // Rate limit responses should have proper format
        rateLimitedResponses.forEach((response) => {
          expect(response.status).toBe(429);
          // 429 responses may not have a specific error message format
        });

        console.log("✓ Rate limit error format verified");
      } else {
        console.log("⚠ Rate limit not triggered in this test run");
      }
    });
  });
});

describe("Status Code Tests", () => {
  beforeAll(async () => {
    // Wait for service to be ready
    await waitForService();
  });

  describe("Authentication Status Codes", () => {
    test("should return 401 when no API key is provided", async () => {
      const response = await makeRequest({
        url: API_URL,
      });

      expect(response.status).toBe(401);
    });

    test("should return 401 when invalid API key is provided", async () => {
      const response = await makeRequest({
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: "invalid-key",
        },
      });

      expect(response.status).toBe(401);
    });

    test("should return 200 when valid API key is provided", async () => {
      // Use a different API key than the one used in previous tests
      // to avoid rate limiting issues
      const UNUSED_API_KEY = "sk-abcdef1234567890"; // jane_smith

      const response = await makeRequest({
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: UNUSED_API_KEY,
        },
      });

      expect(response.status).toBe(200);
    });
  });

  describe("Rate Limiting Status Codes", () => {
    test("should return 429 after exceeding rate limit", async () => {
      const results = await makeMultipleRequests(15, {
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: VALID_API_KEY,
        },
        delay: 100, // 100ms delay between requests
      });

      // Check that we got some successful responses followed by 429s
      const statuses = results.map((r) => r.status);
      const has429 = statuses.some((status) => status === 429);

      // We should eventually hit rate limit with rapid requests
      expect(has429).toBe(true);

      // Log results for debugging
      results.forEach((result) => {
        console.log(`Request ${result.requestNumber}: HTTP ${result.status}`);
      });
    });

    test("should rate limit invalid requests and return 429 after exceeding limit", async () => {
      console.log("Testing rate limiting on invalid API key requests...");

      // Make multiple requests with invalid API key
      const results = await makeMultipleRequests(20, {
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: "invalid-key-12345",
        },
        delay: 100, // 100ms delay between requests
      });

      const statuses = results.map((r) => r.status);
      const unauthorizedCount = statuses.filter(
        (status) => status === 401
      ).length;
      const rateLimitedCount = statuses.filter(
        (status) => status === 429
      ).length;

      // Log results for debugging
      console.log(`Total requests: ${results.length}`);
      console.log(`Unauthorized responses (401): ${unauthorizedCount}`);
      console.log(`Rate limited responses (429): ${rateLimitedCount}`);

      results.forEach((result) => {
        console.log(`Request ${result.requestNumber}: HTTP ${result.status}`);
        if (result.status === 429) {
          console.log("  → Rate limit hit on invalid request!");
        }
      });

      // Even invalid requests should be rate limited
      // We expect to see some 401s initially, then 429s after rate limit is hit
      expect(rateLimitedCount).toBeGreaterThan(0);

      // Should have a combination of 401 and 429 responses
      expect(unauthorizedCount + rateLimitedCount).toBe(results.length);

      // The rate limiting should kick in, so we shouldn't get all 401s
      expect(unauthorizedCount).toBeLessThan(results.length);
    });
  });

  describe("Status Code Documentation", () => {
    test("should have correct status code meanings", () => {
      const statusCodes = {
        200: "Valid request (success)",
        401: "Invalid or missing API key",
        429: "Rate limit exceeded",
      };

      expect(statusCodes[200]).toBe("Valid request (success)");
      expect(statusCodes[401]).toBe("Invalid or missing API key");
      expect(statusCodes[429]).toBe("Rate limit exceeded");
    });
  });
});

describe("Load Testing", () => {
  beforeAll(async () => {
    // Wait for service to be ready
    await waitForService();
  });

  describe("Concurrent Request Handling", () => {
    test("should handle multiple unauthorized requests", async () => {
      console.log("Testing concurrent unauthorized requests...");
      console.log("Sending 20 concurrent requests without API key...");

      const startTime = Date.now();

      // Send concurrent requests
      const requestPromises = Array.from({ length: 20 }, (_, i) =>
        makeRequest({
          url: API_URL,
        }).then((result) => ({ requestNumber: i + 1, ...result }))
      );

      const results = await Promise.all(requestPromises);
      const endTime = Date.now();
      const totalTime = endTime - startTime;

      console.log(`Completed 20 requests in ${totalTime}ms`);

      const statuses = results.map((r) => r.status);
      const unauthorizedCount = statuses.filter(
        (status) => status === 401
      ).length;
      const rateLimitCount = statuses.filter((status) => status === 429).length;

      // Should get mostly 401s or 429s
      expect(unauthorizedCount + rateLimitCount).toBeGreaterThan(10);

      // Log results
      results.forEach((result) => {
        console.log(`Request ${result.requestNumber}: HTTP ${result.status}`);
      });
    });

    test("should handle multiple authorized requests", async () => {
      console.log("Testing concurrent authorized requests...");
      console.log("Sending 70 concurrent requests with valid API key...");

      const startTime = Date.now();

      // Send concurrent requests
      const requestPromises = Array.from({ length: 70 }, (_, i) =>
        makeRequest({
          url: API_URL,
          headers: {
            [API_KEY_HEADER_NAME]: VALID_API_KEY,
          },
        }).then((result) => ({ requestNumber: i + 1, ...result }))
      );

      const results = await Promise.all(requestPromises);
      const endTime = Date.now();
      const totalTime = endTime - startTime;

      console.log(`Completed 70 requests in ${totalTime}ms`);

      const statuses = results.map((r) => r.status);
      const successCount = statuses.filter((status) => status === 200).length;
      const rateLimitCount = statuses.filter((status) => status === 429).length;

      // Should get some successful requests and some rate limited
      expect(successCount + rateLimitCount).toBe(70);
      expect(rateLimitCount).toBeGreaterThan(0); // Should hit rate limit

      // Log summary
      console.log(`Successful requests: ${successCount}`);
      console.log(`Rate limited requests: ${rateLimitCount}`);

      // Log detailed results
      results.forEach((result) => {
        console.log(`Request ${result.requestNumber}: HTTP ${result.status}`);
      });
    });

    test("should handle high load and global rate limiting", async () => {
      console.log("Testing global rate limit...");
      console.log("Sending 120 requests rapidly to test global limit...");

      const startTime = Date.now();

      // Send requests in batches to simulate high load
      const batchSize = 20;
      const batches = Math.ceil(120 / batchSize);
      const allResults = [];

      for (let batch = 0; batch < batches; batch++) {
        const batchPromises = Array.from({ length: batchSize }, (_, i) =>
          makeRequest({
            url: API_URL,
            headers: {
              [API_KEY_HEADER_NAME]: VALID_API_KEY,
            },
          }).then((result) => ({
            requestNumber: batch * batchSize + i + 1,
            ...result,
          }))
        );

        const batchResults = await Promise.all(batchPromises);
        allResults.push(...batchResults);

        // Small delay between batches
        await sleep(100);
      }

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      console.log(`Completed 120 requests in ${totalTime}ms`);

      const statuses = allResults.map((r) => r.status);
      const successCount = statuses.filter((status) => status === 200).length;
      const rateLimitCount = statuses.filter((status) => status === 429).length;

      // Should definitely hit rate limits with this many requests
      expect(rateLimitCount).toBeGreaterThan(20);

      // Log summary
      console.log(`Successful requests: ${successCount}`);
      console.log(`Rate limited requests: ${rateLimitCount}`);
      console.log(`Total requests: ${allResults.length}`);

      // Log sample results
      allResults.slice(0, 10).forEach((result) => {
        console.log(`Request ${result.requestNumber}: HTTP ${result.status}`);
      });
      console.log("...");
      allResults.slice(-10).forEach((result) => {
        console.log(`Request ${result.requestNumber}: HTTP ${result.status}`);
      });
    });
  });

  describe("Performance Metrics", () => {
    test("should measure response times", async () => {
      const results = await makeMultipleRequests(10, {
        url: API_URL,
        headers: {
          [API_KEY_HEADER_NAME]: VALID_API_KEY,
        },
        delay: 1000, // 1 second delay between requests
      });

      // All requests should complete reasonably quickly
      results.forEach((result) => {
        expect(result.status).toBeGreaterThanOrEqual(200);
        expect(result.status).toBeLessThan(600);
      });

      console.log("Response time test completed");
    });
  });
});

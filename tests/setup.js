const axios = require("axios");

// Global test configuration
global.API_URL = "http://localhost:8080";
global.VALID_API_KEY = "sk-1234567890abcdef";
global.API_KEY_HEADER_NAME = process.env.API_KEY_HEADER_NAME || "X-APIKEY";

// Global test utilities
global.makeRequest = async (options = {}) => {
  const {
    method = "GET",
    url = global.API_URL,
    headers = {},
    data = undefined,
    validateStatus = () => true, // Don't throw on any status code
  } = options;

  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
      validateStatus,
      timeout: 5000,
    });

    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      };
    }
    throw error;
  }
};

// Utility to wait for a specified time
global.sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Utility to make multiple requests
global.makeMultipleRequests = async (count, options = {}) => {
  const results = [];
  for (let i = 0; i < count; i++) {
    const result = await global.makeRequest(options);
    results.push({ requestNumber: i + 1, ...result });

    // Small delay between requests to prevent overwhelming
    if (options.delay) {
      await global.sleep(options.delay);
    }
  }
  return results;
};

// Setup and teardown helpers
global.waitForService = async (retries = 10, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await global.makeRequest();
      if (response.status < 500) {
        return true;
      }
    } catch (error) {
      // Service not ready yet
    }
    await global.sleep(delay);
  }
  throw new Error("Service did not become ready within the timeout period");
};

// Jest timeout configuration
jest.setTimeout(30000);

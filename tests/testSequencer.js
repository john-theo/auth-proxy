const Sequencer = require("@jest/test-sequencer").default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    // Define the order of test execution
    const testOrder = [
      "gatewayCore.test.js", // Core gateway functionality first
      "configuration.test.js", // Configuration validation
      "statusCodes.test.js",
      "rateLimiting.test.js",
      "loadTesting.test.js",
    ];

    return tests.sort((testA, testB) => {
      const indexA = testOrder.findIndex((name) => testA.path.includes(name));
      const indexB = testOrder.findIndex((name) => testB.path.includes(name));

      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });
  }
}

module.exports = CustomSequencer;

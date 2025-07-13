module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: [
    '<rootDir>/tests/**/*.test.js'
  ],
  verbose: true,
  collectCoverage: false,
  maxWorkers: 1, // Run tests sequentially to avoid rate limiting conflicts
  testSequencer: '<rootDir>/tests/testSequencer.js'
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'], // Loads environment variables for tests
  testMatch: ['**/__tests__/**/*.test.ts'], // Specifies test file locations
  globalSetup: './jest-global-setup.js', // Optional, for setting up global test resources
  verbose: true,
  forceExit: true,
  // clearMocks: true,
  collectCoverage: true, // Enables coverage collection
  collectCoverageFrom: ['src/**/*.ts'], // Specifies files to collect coverage from
  coverageDirectory: 'coverage', // Directory where coverage information will be saved
  coverageReporters: ['text', 'lcov'], // Report formats (text for console, lcov for detailed HTML)
  testSequencer: './customSequencer.js',
};

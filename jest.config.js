/**
 * Jest Configuration for Node.js Tutorial Project
 * 
 * This configuration file sets up Jest for testing the Express.js application
 * featuring the /hello endpoint. It configures the test environment, coverage
 * reporting, and quality thresholds.
 * 
 * @see https://jestjs.io/docs/configuration
 */

module.exports = {
  /**
   * Use Node.js test environment instead of jsdom (browser-like environment)
   * Required for testing Express.js backend applications
   */
  testEnvironment: 'node',

  /**
   * Directory where Jest should output coverage reports
   */
  coverageDirectory: 'coverage',

  /**
   * Glob patterns indicating which files to collect coverage from
   * Includes all JavaScript files in the src directory
   */
  collectCoverageFrom: ['src/**/*.js'],

  /**
   * Glob patterns Jest uses to detect test files
   * Matches all .test.js files in the tests directory
   */
  testMatch: ['**/tests/**/*.test.js'],

  /**
   * Enable verbose output for detailed test results
   * Shows individual test results with pass/fail status
   */
  verbose: true,

  /**
   * Coverage reporter formats to generate
   * - text: Console output summary
   * - lcov: LCOV format for CI/CD integrations
   * - html: Interactive HTML report for detailed analysis
   */
  coverageReporters: ['text', 'lcov', 'html'],

  /**
   * Coverage threshold enforcement
   * Tests will fail if coverage drops below these thresholds
   * Based on industry best practices for production code quality
   */
  coverageThreshold: {
    global: {
      /**
       * Branch coverage: 75%
       * Ensures conditional logic (if/else, switch, ternary) is tested
       */
      branches: 75,

      /**
       * Function coverage: 90%
       * Ensures all exported functions have test coverage
       */
      functions: 90,

      /**
       * Line coverage: 80%
       * Industry standard for production code
       */
      lines: 80,

      /**
       * Statement coverage: 80%
       * Comprehensive code execution verification
       */
      statements: 80
    }
  }
};

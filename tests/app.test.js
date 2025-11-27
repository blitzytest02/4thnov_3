/**
 * @fileoverview Integration tests for Express application configuration.
 *
 * This test file validates that the Express application is properly configured,
 * routes are correctly mounted, and error handling works as expected.
 * Tests use Jest as the testing framework and Supertest for HTTP assertions.
 *
 * Test Categories:
 * - Application Export: Validates Express app instance
 * - Route Mounting: Verifies /hello route is accessible
 * - 404 Handler: Tests undefined route handling
 * - Error Handler: Tests error middleware behavior
 *
 * @module tests/app.test
 * @requires supertest
 * @requires ../src/app
 */

const request = require('supertest');
const app = require('../src/app');

/**
 * Test suite for Express Application configuration.
 * Verifies the app is properly configured and exports a valid Express instance.
 */
describe('Express App', () => {
  /**
   * Test suite for validating the Express application export.
   * Express apps are functions that can be passed to http.createServer().
   */
  describe('Application Export', () => {
    /**
     * Test: App should export a valid Express application.
     * Express applications are functions with additional properties.
     */
    it('should export a valid Express application', () => {
      // Arrange - app is imported at module level

      // Act - no action needed, testing the export itself

      // Assert
      expect(app).toBeDefined();
      expect(typeof app).toBe('function');
    });

    /**
     * Test: App should have required Express methods available.
     * Validates that common Express methods are present on the app instance.
     */
    it('should have required Express methods', () => {
      // Arrange - app is imported at module level

      // Act - no action needed, testing the export itself

      // Assert
      expect(typeof app.use).toBe('function');
      expect(typeof app.get).toBe('function');
      expect(typeof app.post).toBe('function');
      expect(typeof app.put).toBe('function');
      expect(typeof app.delete).toBe('function');
      expect(typeof app.listen).toBe('function');
    });

    /**
     * Test: App should not be null or undefined.
     * Additional safety check for the exported module.
     */
    it('should not be null or undefined', () => {
      // Arrange - app is imported at module level

      // Act - no action needed, testing the export itself

      // Assert
      expect(app).not.toBeNull();
      expect(app).not.toBeUndefined();
    });
  });

  /**
   * Test suite for verifying routes are properly mounted on the application.
   * Tests that the /hello endpoint is accessible and responds correctly.
   */
  describe('Route Mounting', () => {
    /**
     * Test: /hello route should be mounted and accessible.
     * Verifies the route returns 200 status code.
     */
    it('should have /hello route mounted', async () => {
      // Arrange - app is imported at module level

      // Act
      const response = await request(app).get('/hello');

      // Assert
      expect(response.status).toBe(200);
    });

    /**
     * Test: /hello route should return "Hello world" in response body.
     * Verifies the route returns the expected content.
     */
    it('should return "Hello world" from /hello route', async () => {
      // Arrange - app is imported at module level

      // Act
      const response = await request(app).get('/hello');

      // Assert
      expect(response.text).toBe('Hello world');
    });

    /**
     * Test: /hello route should respond with correct content type.
     * Verifies the response has appropriate HTTP headers.
     */
    it('should respond with text content type from /hello route', async () => {
      // Arrange - app is imported at module level

      // Act
      const response = await request(app).get('/hello');

      // Assert
      expect(response.headers['content-type']).toMatch(/text/);
    });
  });

  /**
   * Test suite for 404 Not Found handler.
   * Verifies undefined routes are caught and return proper 404 responses.
   */
  describe('404 Handler', () => {
    /**
     * Test: Undefined routes should return 404 status code.
     * Verifies the 404 middleware catches unknown routes.
     */
    it('should return 404 for undefined routes', async () => {
      // Arrange - app is imported at module level

      // Act
      const response = await request(app).get('/undefined-route');

      // Assert
      expect(response.status).toBe(404);
    });

    /**
     * Test: Non-existent nested routes should return 404.
     * Tests that deep paths are also caught by the 404 handler.
     */
    it('should return 404 for non-existent nested routes', async () => {
      // Arrange - app is imported at module level

      // Act
      const response = await request(app).get('/api/v1/nonexistent');

      // Assert
      expect(response.status).toBe(404);
    });

    /**
     * Test: 404 response should include "Not Found" in body.
     * Verifies the error response body content.
     */
    it('should return "Not Found" in response body for undefined routes', async () => {
      // Arrange - app is imported at module level

      // Act
      const response = await request(app).get('/unknown-path');

      // Assert
      expect(response.text).toBe('Not Found');
    });

    /**
     * Test: POST to undefined route should return 404.
     * Verifies POST requests to unknown routes are handled.
     */
    it('should return 404 for POST to undefined routes', async () => {
      // Arrange - app is imported at module level

      // Act
      const response = await request(app).post('/nonexistent');

      // Assert
      expect(response.status).toBe(404);
    });

    /**
     * Test: PUT to undefined route should return 404.
     * Verifies PUT requests to unknown routes are handled.
     */
    it('should return 404 for PUT to undefined routes', async () => {
      // Arrange - app is imported at module level

      // Act
      const response = await request(app).put('/nonexistent');

      // Assert
      expect(response.status).toBe(404);
    });

    /**
     * Test: DELETE to undefined route should return 404.
     * Verifies DELETE requests to unknown routes are handled.
     */
    it('should return 404 for DELETE to undefined routes', async () => {
      // Arrange - app is imported at module level

      // Act
      const response = await request(app).delete('/nonexistent');

      // Assert
      expect(response.status).toBe(404);
    });
  });

  /**
   * Test suite for error handling middleware.
   * Tests that server errors are properly caught and handled.
   */
  describe('Error Handler', () => {
    /**
     * Test: Error handling middleware should return 500 for server errors.
     * Creates a test app with the same error handler pattern to verify behavior.
     */
    it('should return 500 for internal server errors', async () => {
      // Arrange - Create a test Express app with error-triggering route
      const express = require('express');
      const testApp = express();

      // Add a route that throws an error
      testApp.get('/error-test', (req, res, next) => {
        next(new Error('Test error'));
      });

      // Add the same error handling middleware pattern as app.js
      testApp.use((err, req, res, next) => {
        res.status(500).send('Internal Server Error');
      });

      // Act
      const response = await request(testApp).get('/error-test');

      // Assert
      expect(response.status).toBe(500);
      expect(response.text).toBe('Internal Server Error');
    });

    /**
     * Test: Error handler should handle thrown exceptions.
     * Verifies synchronous errors are caught by error middleware.
     */
    it('should handle thrown exceptions', async () => {
      // Arrange - Create a test Express app with exception-throwing route
      const express = require('express');
      const testApp = express();

      // Add a route that throws a synchronous error
      testApp.get('/throw-test', (req, res, next) => {
        throw new Error('Synchronous error');
      });

      // Add error handling middleware
      testApp.use((err, req, res, next) => {
        res.status(500).send('Internal Server Error');
      });

      // Act
      const response = await request(testApp).get('/throw-test');

      // Assert
      expect(response.status).toBe(500);
    });
  });

  /**
   * Test suite for HTTP method handling on /hello route.
   * Tests edge cases for unsupported HTTP methods on the /hello endpoint.
   */
  describe('HTTP Method Handling', () => {
    /**
     * Test: POST to /hello should return 404.
     * The /hello route only supports GET method.
     */
    it('should return 404 for POST to /hello', async () => {
      // Arrange - app is imported at module level

      // Act
      const response = await request(app).post('/hello');

      // Assert
      expect(response.status).toBe(404);
    });

    /**
     * Test: PUT to /hello should return 404.
     * The /hello route only supports GET method.
     */
    it('should return 404 for PUT to /hello', async () => {
      // Arrange - app is imported at module level

      // Act
      const response = await request(app).put('/hello');

      // Assert
      expect(response.status).toBe(404);
    });

    /**
     * Test: DELETE to /hello should return 404.
     * The /hello route only supports GET method.
     */
    it('should return 404 for DELETE to /hello', async () => {
      // Arrange - app is imported at module level

      // Act
      const response = await request(app).delete('/hello');

      // Assert
      expect(response.status).toBe(404);
    });
  });

  /**
   * Test suite for performance requirements.
   * Verifies that the application responds within acceptable time limits.
   */
  describe('Performance', () => {
    /**
     * Test: /hello endpoint should respond within 100ms.
     * Ensures the endpoint meets performance requirements.
     */
    it('should respond within 100ms for /hello endpoint', async () => {
      // Arrange
      const startTime = Date.now();

      // Act
      await request(app).get('/hello');
      const endTime = Date.now();
      const duration = endTime - startTime;

      // Assert
      expect(duration).toBeLessThan(100);
    });
  });
});

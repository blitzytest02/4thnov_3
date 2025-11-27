/**
 * @fileoverview Integration tests for Express application configuration.
 * 
 * Tests that the app exports a valid Express instance, routes are properly
 * mounted, and 404 handler catches undefined routes.
 * 
 * @requires supertest
 * @requires ../src/app
 * @requires ../src/index
 */

const request = require('supertest');
const app = require('../src/app');

describe('Express App', () => {
  /**
   * Test that the app exports a valid Express application instance.
   * Express apps are functions that can be passed to http.createServer().
   */
  describe('Application Export', () => {
    it('should export a valid Express application', () => {
      // Assert
      expect(app).toBeDefined();
      expect(typeof app).toBe('function');
    });

    it('should have required Express methods', () => {
      // Assert
      expect(typeof app.use).toBe('function');
      expect(typeof app.get).toBe('function');
      expect(typeof app.post).toBe('function');
      expect(typeof app.listen).toBe('function');
    });
  });

  /**
   * Test that routes are properly mounted on the application.
   */
  describe('Route Mounting', () => {
    it('should have /hello route mounted', async () => {
      // Act
      const response = await request(app).get('/hello');

      // Assert
      expect(response.status).toBe(200);
    });
  });

  /**
   * Test that the 404 handler catches undefined routes.
   */
  describe('404 Handler', () => {
    it('should return 404 for undefined routes', async () => {
      // Act
      const response = await request(app).get('/undefined');

      // Assert
      expect(response.status).toBe(404);
    });

    it('should return 404 for non-existent nested routes', async () => {
      // Act
      const response = await request(app).get('/api/v1/nonexistent');

      // Assert
      expect(response.status).toBe(404);
    });

    it('should return "Not Found" in response body for undefined routes', async () => {
      // Act
      const response = await request(app).get('/unknown');

      // Assert
      expect(response.text).toBe('Not Found');
    });
  });
});

describe('Application Index', () => {
  /**
   * Test that the index module re-exports the app correctly.
   */
  describe('Index Module Export', () => {
    it('should re-export the app from index.js', () => {
      // Arrange
      const indexApp = require('../src/index');
      
      // Assert
      expect(indexApp).toBeDefined();
      expect(typeof indexApp).toBe('function');
    });

    it('should export the same app instance as app.js', () => {
      // Arrange
      const indexApp = require('../src/index');
      const directApp = require('../src/app');
      
      // Assert
      expect(indexApp).toBe(directApp);
    });

    it('should have /hello route accessible through index.js', async () => {
      // Arrange
      const indexApp = require('../src/index');
      
      // Act
      const response = await request(indexApp).get('/hello');

      // Assert
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello world');
    });
  });
});

describe('Error Handler', () => {
  /**
   * Test that the error handling middleware catches errors and returns 500.
   * This test creates a temporary Express app with the same error handler.
   */
  describe('Error Handling Middleware', () => {
    it('should return 500 for internal server errors', async () => {
      // Arrange - Create an Express app that will throw an error
      const express = require('express');
      const testApp = express();
      
      // Add a route that throws an error
      testApp.get('/error-test', (req, res, next) => {
        next(new Error('Test error'));
      });
      
      // Add the same error handling middleware as app.js
      testApp.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Internal Server Error');
      });
      
      // Act
      const response = await request(testApp).get('/error-test');
      
      // Assert
      expect(response.status).toBe(500);
      expect(response.text).toBe('Internal Server Error');
    });
  });
});

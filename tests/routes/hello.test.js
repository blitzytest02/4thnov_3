/**
 * @fileoverview Unit and integration tests for the /hello endpoint.
 * 
 * Tests the route handler with happy path scenarios (GET returns 200 and
 * 'Hello world'), edge cases for unsupported HTTP methods (POST/PUT/DELETE
 * return 404), and performance assertions ensuring response time is under 100ms.
 * 
 * @requires supertest
 * @requires ../../src/app
 */

const request = require('supertest');
const app = require('../../src/app');

describe('GET /hello', () => {
  /**
   * Happy path tests for the /hello endpoint.
   * Verify that GET requests return the expected response.
   */
  describe('Happy Path', () => {
    it('should return 200 status code', async () => {
      // Act
      const response = await request(app).get('/hello');

      // Assert
      expect(response.status).toBe(200);
    });

    it('should return "Hello world" in response body', async () => {
      // Act
      const response = await request(app).get('/hello');

      // Assert
      expect(response.text).toBe('Hello world');
    });

    it('should return text content type', async () => {
      // Act
      const response = await request(app).get('/hello');

      // Assert
      expect(response.headers['content-type']).toMatch(/text/);
    });
  });

  /**
   * Edge case tests for unsupported HTTP methods.
   * Only GET is supported; other methods should return 404.
   */
  describe('Unsupported HTTP Methods', () => {
    it('should return 404 for POST requests', async () => {
      // Act
      const response = await request(app).post('/hello');

      // Assert
      expect(response.status).toBe(404);
    });

    it('should return 404 for PUT requests', async () => {
      // Act
      const response = await request(app).put('/hello');

      // Assert
      expect(response.status).toBe(404);
    });

    it('should return 404 for DELETE requests', async () => {
      // Act
      const response = await request(app).delete('/hello');

      // Assert
      expect(response.status).toBe(404);
    });

    it('should return 404 for PATCH requests', async () => {
      // Act
      const response = await request(app).patch('/hello');

      // Assert
      expect(response.status).toBe(404);
    });
  });

  /**
   * Performance tests to ensure the endpoint responds quickly.
   */
  describe('Performance', () => {
    it('should respond within 100ms', async () => {
      // Arrange
      const start = Date.now();

      // Act
      await request(app).get('/hello');

      // Assert
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(100);
    });
  });

  /**
   * Response format validation tests.
   */
  describe('Response Format', () => {
    it('should return exact string "Hello world" without extra whitespace', async () => {
      // Act
      const response = await request(app).get('/hello');

      // Assert
      expect(response.text).toBe('Hello world');
      expect(response.text.trim()).toBe(response.text);
    });

    it('should have Content-Length header', async () => {
      // Act
      const response = await request(app).get('/hello');

      // Assert
      expect(response.headers['content-length']).toBeDefined();
    });
  });
});

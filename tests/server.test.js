/**
 * @fileoverview Server lifecycle tests.
 * 
 * Tests server startup, port binding, and graceful shutdown.
 * Uses the app module directly to create server instances, avoiding
 * auto-starting the server by importing server.js.
 * 
 * @requires ../src/app
 */

const app = require('../src/app');

describe('Server Lifecycle', () => {
  let server;

  /**
   * Clean up after each test by closing the server if it's running.
   * This ensures test isolation and prevents port conflicts.
   */
  afterEach((done) => {
    if (server && server.listening) {
      server.close(done);
    } else {
      done();
    }
  });

  describe('Server Startup', () => {
    it('should start the server successfully', (done) => {
      // Arrange & Act
      server = app.listen(0, () => {
        // Assert
        expect(server.listening).toBe(true);
        done();
      });
    });

    it('should listen on assigned port', (done) => {
      // Arrange
      const PORT = 3001;

      // Act
      server = app.listen(PORT, () => {
        // Assert
        const address = server.address();
        expect(address.port).toBe(PORT);
        done();
      });
    });

    it('should handle dynamic port assignment', (done) => {
      // Arrange & Act (port 0 means system assigns available port)
      server = app.listen(0, () => {
        // Assert
        const address = server.address();
        expect(address.port).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe('Server Shutdown', () => {
    it('should close gracefully', (done) => {
      // Arrange
      server = app.listen(0, () => {
        // Act
        server.close(() => {
          // Assert
          expect(server.listening).toBe(false);
          server = null;
          done();
        });
      });
    });
  });
});

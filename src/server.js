/**
 * @fileoverview Server entry point module for the Node.js tutorial application.
 * 
 * This module imports the Express app from app.js and starts the HTTP server
 * on the configured port. The separation of server startup from app configuration
 * enables testability with Supertest without port conflicts, as recommended in
 * Section 0.10.2 of the technical specification.
 * 
 * The server instance is exported to enable:
 * - Graceful shutdown in production environments
 * - Server lifecycle testing (startup and shutdown)
 * - Access to server properties (address, listening status)
 * 
 * @module server
 * @requires ./app
 * @see {@link module:app} for Express application configuration
 */

'use strict';

const app = require('./app');

/**
 * Port number for the HTTP server.
 * Uses environment variable PORT if set, otherwise defaults to 3000.
 * This allows flexible deployment across different environments.
 * 
 * @constant {number}
 * @default 3000
 */
const PORT = process.env.PORT || 3000;

/**
 * HTTP server instance created by Express.
 * This server object is an instance of Node.js http.Server and provides:
 * - close(): Stops the server from accepting new connections
 * - address(): Returns the bound address, family, and port
 * - listening: Boolean indicating if the server is listening for connections
 * 
 * The server is exported to enable graceful shutdown in tests and process managers,
 * supporting server lifecycle testing as specified in Section 0.5.1.
 * 
 * @type {http.Server}
 * @property {Function} close - Stops the server from accepting new connections
 * @property {Function} address - Returns the bound address information
 * @property {boolean} listening - Indicates if the server is listening
 */
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

/**
 * Handle server error events.
 * Logs error details and exits the process on fatal errors like port conflicts.
 * 
 * @param {Error} error - The error that occurred
 * @listens http.Server#error
 */
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

/**
 * Handle graceful shutdown on SIGTERM signal.
 * Allows in-flight requests to complete before closing the server.
 * 
 * @listens process#SIGTERM
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

/**
 * Handle graceful shutdown on SIGINT signal (Ctrl+C).
 * Allows in-flight requests to complete before closing the server.
 * 
 * @listens process#SIGINT
 */
process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

/**
 * Export the server instance for external access.
 * This enables:
 * - Graceful shutdown from process managers
 * - Server lifecycle testing with Jest
 * - Access to server.address() for dynamic port testing
 * - Checking server.listening status
 * 
 * @exports server
 */
module.exports = server;

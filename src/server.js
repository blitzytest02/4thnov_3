/**
 * @fileoverview Server entry point module.
 * 
 * This module imports the Express app from app.js and starts
 * the HTTP server on the configured port. The separation of
 * server startup from app configuration enables testability
 * with Supertest without starting an actual server.
 * 
 * @module server
 * @requires ./app
 */

const app = require('./app');

/**
 * Port number for the HTTP server.
 * Uses environment variable PORT if set, otherwise defaults to 3000.
 * 
 * @type {number}
 */
const PORT = process.env.PORT || 3000;

/**
 * HTTP server instance.
 * Created by calling app.listen() with the configured port.
 * Exported to enable graceful shutdown in tests and process managers.
 * 
 * @type {http.Server}
 */
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;

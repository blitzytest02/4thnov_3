/**
 * @fileoverview Express route handler module for the /hello endpoint.
 * 
 * This module implements a simple GET endpoint that returns "Hello world" to HTTP clients.
 * The router is designed to be mounted at the '/hello' path in the main Express application,
 * enabling modular route organization and testability with Supertest.
 * 
 * @module routes/hello
 * @requires express
 */

const express = require('express');

/**
 * Express Router instance for handling /hello endpoint requests.
 * This router handles the GET method on the root path ('/'), which will be
 * mounted at '/hello' in the main application (app.js).
 * 
 * @type {express.Router}
 */
const router = express.Router();

/**
 * GET / - Returns "Hello world" to the calling HTTP client.
 * 
 * When mounted at '/hello' in app.js, this handles GET requests to '/hello'.
 * Returns a 200 OK status with plain text "Hello world" in the response body.
 * 
 * Other HTTP methods (POST, PUT, DELETE, PATCH) are not handled by this route
 * and will fall through to the 404 handler in the main application.
 * 
 * @name GET /
 * @function
 * @memberof module:routes/hello
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @returns {void} Sends "Hello world" response with 200 status
 * 
 * @example
 * // HTTP Request:
 * // GET /hello HTTP/1.1
 * // Host: localhost:3000
 * //
 * // HTTP Response:
 * // HTTP/1.1 200 OK
 * // Content-Type: text/html; charset=utf-8
 * //
 * // Hello world
 */
router.get('/', (req, res) => {
  res.send('Hello world');
});

/**
 * Export the router for mounting in the main Express application.
 * 
 * @example
 * // In app.js:
 * const helloRoute = require('./routes/hello');
 * app.use('/hello', helloRoute);
 */
module.exports = router;

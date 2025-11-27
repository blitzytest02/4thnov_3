/**
 * @fileoverview Express application configuration module.
 * 
 * This module creates and configures the Express application instance,
 * sets up middleware, mounts routes including the /hello endpoint,
 * and configures error handling. The app is exported without calling
 * listen() to enable testing with Supertest without port conflicts.
 * 
 * @module app
 * @requires express
 * @requires ./routes/hello
 */

const express = require('express');
const helloRoute = require('./routes/hello');

/**
 * Express application instance.
 * Configured with routes and error handling middleware.
 * 
 * @type {express.Application}
 */
const app = express();

/**
 * Mount the hello route at /hello path.
 * All requests to /hello will be handled by the helloRoute router.
 */
app.use('/hello', helloRoute);

/**
 * 404 Not Found handler.
 * Catches all requests to undefined routes and returns 404 status.
 * 
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

/**
 * Error handling middleware.
 * Catches all errors and returns 500 status.
 * 
 * @param {Error} err - Error object
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

module.exports = app;

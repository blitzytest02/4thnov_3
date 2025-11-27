/**
 * @fileoverview Application index module - main entry point.
 * 
 * This file serves as the package's main entry point as referenced
 * in package.json's "main" field. It re-exports the Express app
 * from the app module for convenient imports and smoke testing.
 * 
 * @module index
 * @requires ./app
 */

const app = require('./app');

/**
 * Re-export the Express application instance.
 * This allows other modules to import the app via the package's main entry point.
 * 
 * @example
 * // Import the app from the package root
 * const app = require('./src');
 * // or
 * const app = require('./src/index');
 */
module.exports = app;

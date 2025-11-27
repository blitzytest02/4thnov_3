# 4thnov_3

A Node.js tutorial project featuring a simple Express.js HTTP server with a `/hello` endpoint that returns "Hello world" to calling HTTP clients.

## Project Description

This project demonstrates the fundamentals of building a RESTful API with Node.js and Express.js. It serves as a learning resource for:

- Setting up an Express.js application
- Creating HTTP endpoints
- Writing comprehensive tests with Jest and Supertest
- Implementing test coverage reporting

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** - Version 18.x or higher (20.x LTS recommended)
- **npm** - Comes bundled with Node.js

To verify your Node.js installation:

```bash
node --version
npm --version
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd 4thnov_3
```

2. Install all dependencies (including test dependencies):

```bash
npm install
```

This will install both production dependencies (Express.js) and development dependencies (Jest, Supertest).

## Usage

### Starting the Server

To start the application server:

```bash
npm start
```

The server will start on port 3000 by default. You can access the hello endpoint at:

```
http://localhost:3000/hello
```

### Development Mode

For development with auto-restart on file changes (if nodemon is configured):

```bash
npm run dev
```

## API Documentation

### GET /hello

Returns a simple greeting message.

**URL:** `/hello`

**Method:** `GET`

**Success Response:**

- **Status Code:** `200 OK`
- **Content-Type:** `text/html` or `text/plain`
- **Response Body:** `Hello world`

**Example Request:**

```bash
curl http://localhost:3000/hello
```

**Example Response:**

```
Hello world
```

**Error Responses:**

- **404 Not Found** - Returned for unsupported HTTP methods (POST, PUT, DELETE, PATCH) on this endpoint

## Testing

This project uses [Jest](https://jestjs.io/) as the testing framework and [Supertest](https://github.com/ladjs/supertest) for HTTP endpoint testing.

### Installing Test Dependencies

Test dependencies are included in `devDependencies` and are installed automatically when running:

```bash
npm install
```

To install test dependencies explicitly:

```bash
npm install --save-dev jest supertest
```

### Running Tests

**Run all tests once:**

```bash
npm test
```

**Run tests in watch mode (for development):**

```bash
npm run test:watch
```

This will re-run tests automatically whenever you modify source or test files.

**Run tests with verbose output:**

```bash
npm run test:verbose
```

**Run a specific test file:**

```bash
npm test -- tests/routes/hello.test.js
```

**Run tests matching a pattern:**

```bash
npm test -- --testNamePattern="hello"
```

### Generating Coverage Reports

To run tests with code coverage analysis:

```bash
npm run test:coverage
```

This command generates a coverage report showing:

- **Line Coverage** - Percentage of code lines executed during tests
- **Branch Coverage** - Percentage of conditional branches tested
- **Function Coverage** - Percentage of functions called during tests
- **Statement Coverage** - Percentage of statements executed

Coverage reports are generated in the `coverage/` directory:

- `coverage/lcov-report/index.html` - HTML report (open in browser)
- `coverage/lcov.info` - LCOV format for CI tools
- Terminal output shows a summary table

**Coverage Targets:**

| Metric | Target |
|--------|--------|
| Line Coverage | ≥80% |
| Branch Coverage | ≥75% |
| Function Coverage | ≥90% |
| Statement Coverage | ≥80% |

### CI/CD Integration

For continuous integration environments:

```bash
npm run test:ci
```

This runs tests in non-interactive mode with coverage reporting, suitable for automated pipelines.

## Test File Organization

The test suite is organized to mirror the source code structure:

```
project-root/
├── src/
│   ├── app.js              # Express application configuration
│   ├── server.js           # Server entry point
│   └── routes/
│       └── hello.js        # Hello route handler
├── tests/
│   ├── app.test.js         # Express application tests
│   ├── server.test.js      # Server lifecycle tests
│   └── routes/
│       └── hello.test.js   # Hello endpoint tests
├── jest.config.js          # Jest configuration
└── package.json            # Project configuration
```

### Test Files Description

| Test File | Description | Test Count |
|-----------|-------------|------------|
| `tests/app.test.js` | Tests for Express application configuration, middleware setup, and route mounting | 3-4 tests |
| `tests/routes/hello.test.js` | Tests for the `/hello` endpoint including happy path, edge cases, error handling, and performance | 6-8 tests |
| `tests/server.test.js` | Tests for server lifecycle including startup and graceful shutdown | 2-3 tests |

### Test Categories

**Unit Tests:**
- Isolated route handler logic
- Response body content validation
- Status code verification

**Integration Tests:**
- Full HTTP request/response cycle through Express middleware stack
- End-to-end endpoint behavior with Supertest
- Response headers and content-type validation

**Edge Case Tests:**
- Unsupported HTTP methods (POST, PUT, DELETE, PATCH) on `/hello`
- Requests to non-existent routes
- Malformed request handling

**Error Handling Tests:**
- 404 Not Found responses for undefined routes
- Proper error response format

## Project Structure

```
4thnov_3/
├── src/
│   ├── app.js              # Express app configuration (exported for testing)
│   ├── server.js           # Server startup (listens on PORT)
│   ├── index.js            # Application entry point
│   └── routes/
│       └── hello.js        # /hello route handler
├── tests/
│   ├── app.test.js
│   ├── server.test.js
│   └── routes/
│       └── hello.test.js
├── coverage/               # Generated coverage reports (gitignored)
├── jest.config.js          # Jest configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `npm start` | Start the production server |
| `dev` | `npm run dev` | Start development server with hot reload |
| `test` | `npm test` | Run all tests once |
| `test:watch` | `npm run test:watch` | Run tests in watch mode |
| `test:coverage` | `npm run test:coverage` | Run tests with coverage report |
| `test:verbose` | `npm run test:verbose` | Run tests with detailed output |
| `test:ci` | `npm run test:ci` | Run tests for CI/CD (non-interactive) |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Ensure all tests pass (`npm test`)
5. Ensure coverage thresholds are met (`npm run test:coverage`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## License

This project is for educational purposes.

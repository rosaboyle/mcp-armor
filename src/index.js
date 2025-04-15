/**
 * mcp-armor-npx
 * A secure sandboxed environment for running npx commands with caching.
 */

const { runDocker } = require('./docker');

module.exports = {
  runDocker
}; 
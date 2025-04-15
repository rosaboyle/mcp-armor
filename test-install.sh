#!/bin/bash

# Test script to verify mcp-armor installation

echo "Testing mcp-armor installation..."

# Test if both commands are available
which mcp-armor-npx >/dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✓ mcp-armor-npx command is available"
else
  echo "✗ mcp-armor-npx command is not available"
  exit 1
fi

which npx-armor >/dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✓ npx-armor command is available"
else
  echo "✗ npx-armor command is not available"
  exit 1
fi

# Test Docker availability
docker --version >/dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✓ Docker is available"
else
  echo "✗ Docker is not available. Please install Docker to use mcp-armor."
  exit 1
fi

# Run a simple test with both commands
echo "Running test with mcp-armor-npx..."
mcp-armor-npx --version
if [ $? -eq 0 ]; then
  echo "✓ mcp-armor-npx test successful"
else
  echo "✗ mcp-armor-npx test failed"
  exit 1
fi

echo "Running test with npx-armor..."
npx-armor --version
if [ $? -eq 0 ]; then
  echo "✓ npx-armor test successful"
else
  echo "✗ npx-armor test failed"
  exit 1
fi

echo "All tests passed!"
exit 0 
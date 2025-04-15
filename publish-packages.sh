#!/bin/bash

# Script to publish both mcp-armor and mcp-armor-npx packages

set -e

echo "==== Publishing mcp-armor package ===="
npm publish

echo "==== Creating temporary directory for mcp-armor-npx package ===="
mkdir -p temp-npx-package
cp -r bin src Dockerfile .npmignore README.md CONTRIBUTING.md temp-npx-package/
cp mcp-armor-npx-package.json temp-npx-package/package.json

echo "==== Publishing mcp-armor-npx package ===="
cd temp-npx-package
npm publish
cd ..

echo "==== Cleaning up ===="
rm -rf temp-npx-package

echo "==== Done! ===="
echo "Both packages published successfully:"
echo "- mcp-armor: Primary package with both 'mcp-armor-npx' and 'npx-armor' commands"
echo "- mcp-armor-npx: Alternative package with just the 'mcp-armor-npx' command"
echo ""
echo "Users can install either with:"
echo "npm install -g mcp-armor"
echo "npm install -g mcp-armor-npx" 
#!/usr/bin/env node

const path = require('path');
const { checkDocker, ensureDockerImage, pushDockerImage, runDocker } = require('../src/docker');

// Main function
function main() {
  // Get command line arguments (skip node and script name)
  const args = process.argv.slice(2);
  
  // Check if Docker is installed
  if (!checkDocker()) {
    process.exit(1);
  }

  // Special commands
  if (args[0] === '--push-image') {
    // Push the Docker image to Docker Hub
    if (!ensureDockerImage()) {
      process.exit(1);
    }
    
    if (!pushDockerImage()) {
      process.exit(1);
    }
    
    console.log('Image pushed successfully to Docker Hub.');
    process.exit(0);
  }
  
  // Ensure Docker image exists
  if (!ensureDockerImage()) {
    process.exit(1);
  }
  
  // Run the npx command in Docker
  runDocker(args).then(code => {
    process.exit(code);
  });
}

// Execute main function
main(); 
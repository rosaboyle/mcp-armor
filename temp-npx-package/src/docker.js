/**
 * Docker utilities for mcp-armor-npx
 */

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Constants
const DOCKER_USERNAME = 'dheerajpai';
const DOCKER_IMAGE_NAME = `${DOCKER_USERNAME}/mcp-armor-npx`;
const NPM_CACHE_DIR = path.join(os.homedir(), '.npm');
// Get the root directory of the package (where the Dockerfile should be)
const PACKAGE_ROOT = path.resolve(path.join(__dirname, '..'));

/**
 * Check if Docker is installed and available
 */
function checkDocker() {
  try {
    execSync('docker --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.error('Error: Docker is not installed or not in PATH.');
    console.error('Please install Docker to use mcp-armor-npx.');
    console.error('Visit https://docs.docker.com/get-docker/ for installation instructions.');
    return false;
  }
}

/**
 * Ensure the Docker image exists, build if needed
 */
function ensureDockerImage() {
  try {
    // First check if the image exists
    const imageCheck = execSync(`docker images -q ${DOCKER_IMAGE_NAME} 2>/dev/null || echo "not_found"`)
      .toString()
      .trim();
    
    if (imageCheck === "" || imageCheck === "not_found") {
      console.log(`Docker image ${DOCKER_IMAGE_NAME} not found locally.`);
      
      // Try to pull from Docker Hub first
      try {
        console.log(`Trying to pull ${DOCKER_IMAGE_NAME} from Docker Hub...`);
        execSync(`docker pull ${DOCKER_IMAGE_NAME}`, { 
          stdio: 'inherit'
        });
        console.log('Docker image pulled successfully.');
        return true;
      } catch (pullError) {
        console.log('Could not pull image from Docker Hub, will build locally.');
      }
      
      // If pull fails, build locally
      console.log('Building Docker image locally...');
      
      // Check if Dockerfile exists
      const dockerfilePath = path.join(PACKAGE_ROOT, 'Dockerfile');
      if (!fs.existsSync(dockerfilePath)) {
        console.error(`Error: Dockerfile not found at ${dockerfilePath}`);
        return false;
      }
      
      // Build the Docker image
      console.log(`Building from ${PACKAGE_ROOT}`);
      execSync(`docker build -t ${DOCKER_IMAGE_NAME} ${PACKAGE_ROOT}`, { 
        stdio: 'inherit'
      });
      
      console.log('Docker image built successfully.');
    }
    return true;
  } catch (error) {
    console.error('Error ensuring Docker image:', error.message);
    return false;
  }
}

/**
 * Push the Docker image to Docker Hub
 */
function pushDockerImage() {
  try {
    console.log(`Pushing ${DOCKER_IMAGE_NAME} to Docker Hub...`);
    execSync(`docker push ${DOCKER_IMAGE_NAME}`, {
      stdio: 'inherit'
    });
    console.log('Docker image pushed successfully.');
    return true;
  } catch (error) {
    console.error('Error pushing Docker image:', error.message);
    console.error('Make sure you are logged in to Docker Hub with `docker login`');
    return false;
  }
}

/**
 * Run a command inside Docker
 */
function runDocker(args) {
  // Ensure the npm cache directory exists
  if (!fs.existsSync(NPM_CACHE_DIR)) {
    fs.mkdirSync(NPM_CACHE_DIR, { recursive: true });
  }

  // Build the docker run command
  const dockerArgs = [
    'run',
    '--rm',
    '-v', `${NPM_CACHE_DIR}:/home/runner/.npm`,
    '-w', '/app',
    DOCKER_IMAGE_NAME,
    ...args
  ];

  // Run the Docker command and pass through stdin/stdout/stderr
  const dockerProcess = spawn('docker', dockerArgs, {
    stdio: 'inherit'
  });

  return new Promise((resolve) => {
    // Handle process exit
    dockerProcess.on('close', (code) => {
      resolve(code);
    });
  });
}

module.exports = {
  checkDocker,
  ensureDockerImage,
  pushDockerImage,
  runDocker,
  DOCKER_IMAGE_NAME,
  NPM_CACHE_DIR
}; 
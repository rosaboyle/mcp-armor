# mcp-armor

A secure, sandboxed environment for running `npx` commands with caching.

## Features

- ✅ Runs any `npx` command in a sandboxed Docker environment
- ✅ Caches downloaded npm modules between runs
- ✅ Works seamlessly as a drop-in replacement for `npx`
- ✅ No configuration required
- ✅ Pre-built Docker image available on Docker Hub

## Prerequisites

- Docker must be installed on your system
- Node.js and npm

## Installation

```bash
npm install -g mcp-armor
```

After installation, you'll have access to two CLI commands:

- `mcp-armor-npx` - The primary command
- `npx-armor` - An alias for the same functionality

Both commands function identically, choose whichever is easier to remember.

## Usage

Use either `mcp-armor-npx` or `npx-armor` exactly as you would use `npx`:

```bash
# Run a package directly
mcp-armor-npx cowsay "Hello, secure world!"
# Or using the alias
npx-armor cowsay "Hello, secure world!"

# Run a specific version of a package
mcp-armor-npx cowsay@2.0.0 "Version specific"

# Run a package with arguments
mcp-armor-npx figlet "Big text"
```

### Additional Commands

```bash
# Push the Docker image to Docker Hub (requires Docker Hub login)
mcp-armor-npx --push-image
```

### How It Works

1. First run: Downloads the requested package inside Docker container
2. Second run: Uses cached version for instant execution
3. All execution happens in a sandboxed Docker environment
4. Your npm cache is preserved between runs

### Docker Hub Image

The Docker image is available on Docker Hub at `dheerajpai/mcp-armor-npx`.

If you want to use the image directly:

```bash
docker run --rm -v ~/.npm:/home/runner/.npm dheerajpai/mcp-armor-npx [your-npx-args]
```

## Security

All commands run inside an isolated Docker container with:
- A non-root user account
- Limited access to the host system
- Only npm cache is shared with the host

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

Please visit our [GitHub repository](https://github.com/rosaboyle/mcp-armor) to contribute.

## License

ISC

## Author

Dheeraj Pai <dheerajmpaicmu@gmail.com> 
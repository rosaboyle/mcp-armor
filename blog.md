# Securing MCP Servers: A Simple Docker-Based Solution

## The Security Challenge with MCP Servers

Model Context Protocol (MCP) servers are revolutionizing how we interact with AI tools. They enable users to access different tools in their Large Language Models (LLMs) without developing custom integrations. This powerful capability allows developers to build servers that let their users access services/tools inside AI apps like Cursor or Claude—all without needing to understand the complex workings of LLMs or tool calling.

However, **MCP servers currently present significant security concerns**. Most MCP servers today are not remote Server-Sent Events (SSE) servers, which would provide a more controlled environment. Instead, they run locally on your machine.

While it appears seamless to connect an AI with a tool, you're actually exposing your system to code that:
- May have been written by unknown parties
- Has likely never been properly vetted
- Could have arbitrary access to your computer
- Might download malware without your knowledge

## My Security Dilemma

I wanted to experiment with various MCP servers, but I wasn't comfortable with the security implications. I needed a solution that would:

1. **Provide proper sandboxing** - Run everything in an isolated environment that doesn't expose my files, while logging network calls and system calls
2. **Require minimal configuration changes** - I didn't want to modify MCP configs extensively
3. **Maintain the benefits of `npx`** - The `npx` command used by many MCP servers efficiently caches npm modules in `.npm`, using cached versions when available and downloading the latest when needed

## Introducing mcp-armor

I built `mcp-armor`, a simple Docker-based sandbox wrapper for `npx` commands that addresses these security concerns without sacrificing convenience.

The tool is remarkably easy to use:

```bash
# Before: Running an MCP server with npx
npx @modelcontextprotocol/server-memory

# After: Running the same server in a secure sandbox
mcp-armor-npx @modelcontextprotocol/server-memory
```

That's it! Just replace `npx` with `mcp-armor-npx` (or `npx-armor` if you prefer), and the command runs in a secure Docker container while still maintaining the caching functionality.

## How It Works

`mcp-armor` uses Docker to create a sandboxed environment that:
- Runs all npx commands inside an isolated container
- Uses a non-root user for additional security
- Shares only the npm cache directory between runs for performance
- Prevents access to your local filesystem
- Keeps the convenience of npm caching

## Building It Quickly

I built this tool in just a few hours, using a simple approach:
1. Created a minimal Docker image based on Node Alpine
2. Set up a clean npm environment with proper caching
3. Developed a CLI tool that handles the Docker management
4. Published both the npm package and Docker image for immediate use

The entire implementation is under 200 lines of code, making it easy to review and verify. I didn't want to build a complex security solution—just something practical that makes using MCP servers safer.

## Get Started

You can start using `mcp-armor` today:

```bash
# Install globally
npm install -g mcp-armor

# Use it exactly like npx
mcp-armor-npx cowsay "Hello, secure world!"
```

Give it a try, and let me know how it works for you! Contributions are welcome on [GitHub](https://github.com/rosaboyle/mcp-armor).

## Future Improvements

While this solution addresses immediate security concerns, I'm considering additional features:
- More granular permission controls
- Detailed logging of all network and system calls
- Custom security profiles for different MCP servers



FROM node:20-alpine

# Create working directory
WORKDIR /app

# Create a non-root user for security
RUN adduser -D runner
USER runner

# Set the entrypoint to npx with -y flag to auto accept prompts
ENTRYPOINT ["npx", "-y"] 
# AutotaskMCP Server

MCP Server built with the MCP Builder [https://mcpbuilder.leniolabs.com] using the Streamable HTTP transport over ExpressJS.

## Description

This MCP (Model Context Protocol) server provides tools for interacting with Autotask REST API services. It uses Express.js with Streamable HTTP transport to handle MCP requests.

## Features

- Streamable HTTP transport for MCP protocol
- Express.js server for handling HTTP requests
- Multiple Autotask API tools for ticket management and querying
- Session management with proper cleanup

## Prerequisites

- Node.js 20 or higher
- npm or yarn

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

This will start the server in watch mode using `tsx`.

## Building

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

## Running

```bash
npm start
```

The server will start on port 3000 by default.

## Docker

### Build the Docker image

```bash
docker build -t autotaskmcp:latest .
```

### Run the container

```bash
docker run -p 3000:3000 autotaskmcp:latest
```

### Using Docker Compose

```bash
docker-compose up -d
```

## Environment Variables

- `PORT` - Port number for the server (default: 3000)
- `NODE_ENV` - Node environment (default: production in Docker)

## API Endpoints

- `POST /mcp` - Handle MCP requests (initialization and subsequent requests)
- `GET /mcp` - SSE stream for MCP responses
- `DELETE /mcp` - Terminate MCP session

## Configuration

### Autotask API Credentials

The server requires Autotask API credentials to be configured. These can be set via environment variables:

- `AUTOTASK_API_INTEGRATION_CODE` - Your Autotask API Integration Code
- `AUTOTASK_USER_NAME` - Your Autotask API Username
- `AUTOTASK_SECRET` - Your Autotask API Secret
- `AUTOTASK_IMPERSONATION_RESOURCE_ID` - Your Autotask Impersonation Resource ID

These can be set:
- As environment variables at runtime (recommended)
- As build arguments during Docker build (baked into image)

## Deployment

### Deploying to Northflank

1. **Build Context**: Set to `.` (the root directory where the Dockerfile is located)

2. **Port**: Expose port `3000` to the internet

3. **Environment Variables**: Set the following environment variables in Northflank:
   - `AUTOTASK_API_INTEGRATION_CODE` - Your Autotask API Integration Code
   - `AUTOTASK_USER_NAME` - Your Autotask API Username
   - `AUTOTASK_SECRET` - Your Autotask API Secret
   - `AUTOTASK_IMPERSONATION_RESOURCE_ID` - Your Autotask Impersonation Resource ID
   - `PORT` (optional) - Server port, defaults to 3000
   - `NODE_ENV` (optional) - Set to `production`

4. **Build Arguments** (Optional - if you want to hardcode credentials into the image):
   - `AUTOTASK_API_INTEGRATION_CODE`
   - `AUTOTASK_USER_NAME`
   - `AUTOTASK_SECRET`
   - `AUTOTASK_IMPERSONATION_RESOURCE_ID`

   Note: If using build arguments, the credentials will be baked into the Docker image. If using environment variables, they can be changed without rebuilding.

## Publishing

### Publishing to GitHub

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create a GitHub repository** and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/autotaskmcp.git
   git branch -M main
   git push -u origin main
   ```

### Publishing Docker Images (Optional)

**Note**: If you're deploying to Northflank or similar platforms that build from source, you don't need to publish images to a registry. The platform will build directly from your Dockerfile.

#### Option 1: GitHub Container Registry (Default - Automated)

The repository includes GitHub Actions workflows that automatically build and push to GitHub Container Registry (ghcr.io):

1. **Push to main/master branch**:
   - The CI workflow automatically builds and pushes on every push
   - Images are published to: `ghcr.io/YOUR_USERNAME/autotaskmcp:latest`
   - No additional setup required (uses GitHub token automatically)

2. **Create a release**:
   - Create a GitHub release to trigger versioned tags
   - The `docker-publish.yml` workflow handles release builds

#### Option 2: Manual Build and Push to GitHub Container Registry

1. **Build the Docker image**:
   ```bash
   docker build -t ghcr.io/YOUR_USERNAME/autotaskmcp:latest .
   ```

2. **Login to GitHub Container Registry**:
   ```bash
   echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin
   ```

3. **Push the image**:
   ```bash
   docker push ghcr.io/YOUR_USERNAME/autotaskmcp:latest
   ```

#### Option 3: Docker Hub (Optional - Manual Setup Required)

If you prefer Docker Hub, you can manually build and push:

1. **Build the Docker image**:
   ```bash
   docker build -t YOUR_DOCKERHUB_USERNAME/autotaskmcp:latest .
   ```

2. **Login to Docker Hub**:
   ```bash
   docker login
   ```

3. **Push the image**:
   ```bash
   docker push YOUR_DOCKERHUB_USERNAME/autotaskmcp:latest
   ```

**Note**: The GitHub Actions workflows use GitHub Container Registry by default. To use Docker Hub with GitHub Actions, you would need to:
- Add `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets to your repository
- Modify the workflows to use Docker Hub instead of GHCR

## License

MIT

## Author

MCP Builder https://mcpbuilder.leniolabs.com


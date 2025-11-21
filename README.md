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

### Publishing to Docker Hub

#### Option 1: Manual Build and Push

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

#### Option 2: Automated via GitHub Actions

The repository includes GitHub Actions workflows for automated Docker builds:

1. **Set up Docker Hub secrets in GitHub**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `DOCKER_USERNAME`: Your Docker Hub username
     - `DOCKER_PASSWORD`: Your Docker Hub access token (not password)

2. **Push to main/master branch**:
   - The CI workflow will automatically build and push the image on every push
   - Images will be tagged as `YOUR_USERNAME/autotaskmcp:latest` and `YOUR_USERNAME/autotaskmcp:COMMIT_SHA`

3. **Create a release**:
   - Create a GitHub release to trigger the `docker-publish.yml` workflow
   - This will create versioned tags for your Docker image

#### Using the Published Image

Once published, others can use your image:

```bash
docker pull YOUR_DOCKERHUB_USERNAME/autotaskmcp:latest
docker run -p 3000:3000 YOUR_DOCKERHUB_USERNAME/autotaskmcp:latest
```

## License

MIT

## Author

MCP Builder https://mcpbuilder.leniolabs.com


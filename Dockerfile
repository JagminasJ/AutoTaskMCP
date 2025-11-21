# Multi-stage build for smaller final image
# Stage 1: Build
FROM node:20-slim AS builder

WORKDIR /app

# Accept build arguments for Autotask credentials (optional - can also be set at runtime)
ARG AUTOTASK_API_INTEGRATION_CODE
ARG AUTOTASK_USER_NAME
ARG AUTOTASK_SECRET
ARG AUTOTASK_IMPERSONATION_RESOURCE_ID

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including dev dependencies for building)
RUN npm ci

# Copy source files
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Production
FROM node:20-slim

WORKDIR /app

# Accept build arguments (passed from builder stage or set at runtime)
ARG AUTOTASK_API_INTEGRATION_CODE
ARG AUTOTASK_USER_NAME
ARG AUTOTASK_SECRET
ARG AUTOTASK_IMPERSONATION_RESOURCE_ID

# Copy package files
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Create non-root user for security
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
# Set Autotask credentials from build args (can be overridden at runtime)
ENV AUTOTASK_API_INTEGRATION_CODE=${AUTOTASK_API_INTEGRATION_CODE}
ENV AUTOTASK_USER_NAME=${AUTOTASK_USER_NAME}
ENV AUTOTASK_SECRET=${AUTOTASK_SECRET}
ENV AUTOTASK_IMPERSONATION_RESOURCE_ID=${AUTOTASK_IMPERSONATION_RESOURCE_ID}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/mcp', (r) => {process.exit(r.statusCode === 400 ? 0 : 1)})" || exit 1

# Start the server
CMD ["npm", "start"]


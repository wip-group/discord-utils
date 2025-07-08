FROM oven/bun:1-alpine AS base
 
FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
RUN bun add -g turbo@^2
COPY . .
 
# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "web" is the name entered in the project's package.json: { name: "web" }
RUN turbo prune @repo/web --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Accept build args
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WEBSITE_URL
ARG NEXT_PUBLIC_PROJECT_NAME
ARG NEXT_PUBLIC_HOSTNAME
ARG NEXT_PUBLIC_DISCORD_INVITE
ARG NEXT_PUBLIC_NODE_ENV

# Set environment variables for build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WEBSITE_URL=$NEXT_PUBLIC_WEBSITE_URL
ENV NEXT_PUBLIC_PROJECT_NAME=$NEXT_PUBLIC_PROJECT_NAME
ENV NEXT_PUBLIC_HOSTNAME=$NEXT_PUBLIC_HOSTNAME
ENV NEXT_PUBLIC_DISCORD_INVITE=$NEXT_PUBLIC_DISCORD_INVITE
ENV NEXT_PUBLIC_NODE_ENV=$NEXT_PUBLIC_NODE_ENV
 
# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN bun install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN bun run turbo build
 
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
 
EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
CMD ["node", "apps/web/server.js"]
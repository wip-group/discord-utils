# Fullstack Template

A modern TypeScript fullstack template, featuring end-to-end type safety, authentication, and a modern development experience.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Elysia** - Type-safe, high-performance framework
- **tRPC** - End-to-end type-safe APIs
- **Bun** - Runtime environment
- **Mongoose** - TypeScript-first ORM
- **MongoDB** - Database engine
- **Authentication** - Email & password authentication with Better Auth
- **Turborepo** - Optimized monorepo build system
- **Biome** - Linting and formatting

## Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the web application.

The API is running at [http://localhost:3001](http://localhost:3001).


## Project Structure

```
fullstack-template/
├── apps/
│   ├── web/                    # Next.js 15 frontend (App Router)
│   └── api/                    # Elysia backend with tRPC
├── packages/
│   ├── database/               # Shared Mongoose models
│   ├── ui/                     # Shared shadcn/ui components
│   └── typescript-config/      # Shared TypeScript configs
└── .cursor/
    └── rules/                  # Cursor AI rules for development
```

## Available Scripts

- `bun dev` - Start all applications in development mode
- `bun build` - Build all applications for production
- `turbo dev --filter=@repo/web` - Start only the Next.js frontend
- `turbo dev --filter=@repo/api` - Start only the Elysia backend
- `bun check-types` - Run TypeScript checking across monorepo
- `bun check` - Run Biome formatting and linting

## Environment Setup

1. Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```

2. Required environment variables:
   - `DATABASE_URL` - MongoDB connection string
   - `REDIS_URL` - Redis connection string
   - `BETTER_AUTH_SECRET` - Secret for auth sessions
   - `NEXT_PUBLIC_WEBSITE_URL` - Frontend URL (dev: http://localhost:3000)
   - `NEXT_PUBLIC_API_URL` - Backend URL (dev: http://localhost:3001)

## Key Features

### Authentication
- **Better Auth** integration with MongoDB adapter
- Middleware-based route protection
- Session management with secure cookies
- Configurable protected and public routes

### Type Safety
- End-to-end type safety from database to frontend
- tRPC for type-safe API calls
- Zod validation for environment variables and API inputs
- Shared TypeScript configurations

### Development Experience
- Hot reload for both frontend and backend
- Biome for fast formatting and linting
- Turborepo for optimized monorepo builds
- Cursor AI rules for intelligent code assistance

## Architecture

- **Frontend**: Next.js 15 with App Router, shadcn/ui components
- **Backend**: Elysia server with tRPC integration
- **Database**: MongoDB with Mongoose ODM
- **Auth**: Better Auth with session-based authentication
- **Styling**: TailwindCSS with automatic class sorting
- **Monorepo**: Turborepo with shared packages for code reuse

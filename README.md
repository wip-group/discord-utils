# DiscordUtils

A collection of Discord utilities useful for Developers, and server managers alike.

## Tech Stack

DiscordUtils leverages a powerful set of tools and libraries to deliver a seamless experience:

- **Next.js** – ReactJS Framework that everyone and their mother knows
- **TurboRepo** – Monorepo support for scalable code management by Vercel
- **TailwindCSS** – Utility-first styling
- **Radix UI + ShadCN** – Accessible and customizable UI components
- **tRPC** – End-to-end type safety for API calls
- **Elysia** – Type-safe, high-performance framework
- **Zustand** – Lightweight global state management
- **MongoDB** – Flexible, persistent NoSQL database
- **Mongoose** – TypeScript-first ORM
- **Biome** – Linting and formatting
- **better-auth** – Authentication framework for TypeScript
- **...** – Various other libraries such as Zod

---

## Getting Started

Follow these steps to run **DiscordUtils** locally:

### Prerequisites

Make sure you have 
Make sure you have **Docker Desktop** (or a compatible container engine), and Bun installed and running.

> *You don’t need to know Docker deeply — just have it running.*

### Project Setup

1. Clone the repository
   ```bash
   git clone https://github.com/wip-group/discordutils
   ```

2. Open in your code editor

3. Install dependencies and run the app
    ```bash
    bun i        # Install dependencies
    bun run db   # Setup MongoDB
    bun run dev  # or just: bun dev
    ```

4. Open https://localhost:3000. The api is hosted on https://localhost:3001.

### Development Notes

- You only need to run all three commands once during setup.
- On daily development, just use:
    ```bash
    bun run dev
    ```
- Re-run `bun i` when new dependencies are added.


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
- **MongoDB** – Flexible, persistent NoSQL database
- **Mongoose** – TypeScript-first ORM
- **better-auth** – Authentication framework for TypeScript
- **Biome** – Linting and formatting
- **...** – Various other libraries such as Zod

---

## Getting Started

Follow these steps to run DiscordUtils locally:

### Prerequisites

Make sure you have Bun installed.

### Project Setup

1. Clone the repository
   ```bash
   git clone https://github.com/wip-group/discordutils
   ```

2. Open in your code editor

3. Setup `/apps/web/.env` and `/apps/api/.env` using their respective `.env.example` files as reference.

4. Install dependencies and run the app
    ```bash
    bun i        # Install dependencies
    bun run dev  # or just: bun dev
    ```

5. Open https://localhost:3000. The api is hosted on https://localhost:3001.

### Development Notes

- On daily development, just use:
    ```bash
    bun run dev
    ```
- Re-run `bun i` when new dependencies are added.


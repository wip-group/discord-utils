# Discord Utils
Discord Utils is a comprehensive toolkit for Discord communities.

This collection of utils aims to serve all community stakeholders, from owners, to members and developers. 

This is a free, open-source sister-site to [DiscordServers.gg](https://DiscordServers.gg).

If you want to support, or chat with the team, come join our Discord:

[![Discord Banner](https://discord.com/api/guilds/1375167498093203536/widget.png?style=banner2)](https://discord.gg/nN6BSs7gqW)

## Tech Stack

Discord Utils leverages a powerful set of tools and libraries to deliver a seamless experience:

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

## Getting Started

Follow these steps to run locally and start contributing.

### Prerequisites

- Bun (https://bun.com/)

### Project Setup

1. Clone the repository
   ```bash
   git clone https://github.com/wip-group/discordutils
   ```

2. Open in your code editor

3. Setup `/apps/web/.env` and `/apps/api/.env` using their respective `.env.example` files as reference

4. Install dependencies and run the app
    ```bash
    bun i        # Install dependencies
    bun run dev  # or just: bun dev
    ```

5. Open https://localhost:3000. The api is hosted on https://localhost:3001.


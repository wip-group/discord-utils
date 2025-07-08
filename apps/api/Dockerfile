FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lock ./
COPY packages ./packages
COPY apps/api/package.json ./apps/api/package.json

RUN bun install

COPY . .

RUN bun run build --filter=@repo/api

EXPOSE 3001
CMD ["bun", "run", "start:api"]
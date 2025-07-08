import { cors } from "@elysiajs/cors";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Elysia } from "elysia";
import { env } from "@/env";
import { auth } from "./lib/auth";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";

const _app = new Elysia()
  .use(
    cors({
      origin: env.NEXT_PUBLIC_WEBSITE_URL || "",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )
  .mount(auth.handler)
  .all("/trpc/*", async (context) => {
    const res = await fetchRequestHandler({
      endpoint: "/trpc",
      router: appRouter,
      req: context.request,
      createContext: () => createContext({ context }),
    });

    return res;
  })
  .get("/", () => "OK")
  .listen(3001, (server) => {
    console.log(`Server is running on http://localhost:${server.port}`);
  });

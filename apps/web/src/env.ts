import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const env = createEnv({
  server: {
  },

  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "NEXT_PUBLIC_",

  client: {
    NEXT_PUBLIC_API_URL: z.string().min(1),
    NEXT_PUBLIC_WEBSITE_URL: z.string().min(1),
    NEXT_PUBLIC_PROJECT_NAME: z.string().min(1),
    NEXT_PUBLIC_HOSTNAME: z
      .string()
      .regex(/\./, "Hostname must contain a dot."),
    NEXT_PUBLIC_DISCORD_INVITE: z.url(),
    NEXT_PUBLIC_NODE_ENV: z.enum(["development", "production"]),
  },

  runtimeEnv: {
    // Server-side variables (only available on server)
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    // Client-side variables (available on both server and client)
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
    NEXT_PUBLIC_PROJECT_NAME: process.env.NEXT_PUBLIC_PROJECT_NAME,
    NEXT_PUBLIC_HOSTNAME: process.env.NEXT_PUBLIC_HOSTNAME,
    NEXT_PUBLIC_DISCORD_INVITE: process.env.NEXT_PUBLIC_DISCORD_INVITE,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
  },

  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});

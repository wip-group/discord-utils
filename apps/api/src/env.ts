import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),

    DATABASE_URL: z.string().url(),
    REDIS_URL: z.string().url(),
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
    NEXT_PUBLIC_HOSTNAME: z.string().min(1),
    NEXT_PUBLIC_NODE_ENV: z.enum(["development", "production"]),
  },

  runtimeEnv: Bun.env,

  emptyStringAsUndefined: true,
});

import Redis from "ioredis";
import { env } from "@/env";

export const redis = new Redis(env.REDIS_URL, {
  keyPrefix: env.NEXT_PUBLIC_PROJECT_NAME,
});

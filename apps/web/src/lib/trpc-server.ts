import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { headers } from "next/headers";
import { SuperJSON } from "superjson";
import { env } from "@/env";
import type { AppRouter } from "../../../api/src/routers";

export const serverTrpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      transformer: SuperJSON,
      url: `${env.NEXT_PUBLIC_API_URL}/trpc`,
      headers: async () => {
        const headersList = await headers();
        return {
          cookie: headersList.get("cookie") || "",
        };
      },
    }),
  ],
});

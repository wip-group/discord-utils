import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { add, formatNumber, addAndFormat } from "@repo/shared";
import { z } from "zod";

export const appRouter = router({
  healthCheck: publicProcedure.query(({ ctx }) => {
    return {
      message: "OK",
      user: ctx.session?.user,
    };
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  calculate: publicProcedure
    .input(
      z.object({
        a: z.number(),
        b: z.number(),
        decimals: z.number().optional(),
      })
    )
    .query(({ input }) => {
      return {
        sum: add(input.a, input.b),
        formatted: addAndFormat(input.a, input.b, input.decimals),
      };
    }),
});

export type AppRouter = typeof appRouter;

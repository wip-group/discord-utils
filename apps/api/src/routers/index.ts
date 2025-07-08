import { protectedProcedure, publicProcedure, router } from "../lib/trpc";
import { botRouter } from "./bot-router";

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
  bot: botRouter,
});

export type AppRouter = typeof appRouter;

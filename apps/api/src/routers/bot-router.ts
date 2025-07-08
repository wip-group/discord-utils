
import { publicProcedure, router } from "../lib/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

type DiscordUserInfo = {
  id: string,
  username: string,
  discriminator: string,
  globalName: string,
  avatar: string,
  avatarUrl: string,
  isAnimated: boolean,
  hasCustomAvatar: boolean
};

export const botRouter = router({
  getUserInfo: publicProcedure.input(z.object({
    userId: z.string(),
  })).query(async ({ input }) => {
    const BOT_TOKEN = Bun.env.BOT_TOKEN;

    if (!BOT_TOKEN) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Bot token not configured',
      });
    }

    if (!input.userId.trim()) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'User ID is required',
      });
    }

    try {
      const response = await fetch(`https://discord.com/api/v10/users/${input.userId}`, {
        headers: {
          'Authorization': `Bot ${BOT_TOKEN}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          });
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to fetch user info: ${response.statusText}`,
        });
      }

      const data = await response.json();
      
      // Construct avatar URL
      const avatarHash = data.avatar;
      const isAnimated = avatarHash?.startsWith('a_') ?? false;
      const extension = isAnimated ? 'gif' : 'png';
      const avatarUrl = avatarHash 
        ? `https://cdn.discordapp.com/avatars/${data.id}/${avatarHash}.${extension}?size=1024`
        : `https://cdn.discordapp.com/embed/avatars/${parseInt(data.discriminator) % 5}.png`;

      return {
        id: data.id,
        username: data.username,
        discriminator: data.discriminator,
        globalName: data.global_name || data.username,
        avatar: avatarHash || null,
        avatarUrl,
        isAnimated,
        hasCustomAvatar: !!avatarHash
      } as DiscordUserInfo;
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }
      console.error('Error fetching user info:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch user info',
      });
    }
  }),
});

import { publicProcedure, router } from "../lib/trpc";
import { z } from "zod";

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

    if (!BOT_TOKEN || !input.userId.trim()) {
      return null;
    }

    try {
      const response = await fetch(`https://discord.com/api/v10/users/${input.userId}`, {
        headers: {
          'Authorization': `Bot ${BOT_TOKEN}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        return null;
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
      console.error('Error fetching user info:', error);
      return null;
    }
  }),
});
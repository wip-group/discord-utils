"use client"

import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

export type DiscordUserInfo = {
  id: string,
  username: string,
  discriminator: string,
  globalName: string,
  avatar: string,
  avatarUrl: string,
  isAnimated: boolean,
  hasCustomAvatar: boolean
};

export const useUserInfo = (userId: string) => {
  return useQuery({
    ...trpc.bot.getUserInfo.queryOptions({ userId }),
    enabled: !!userId
  });
};
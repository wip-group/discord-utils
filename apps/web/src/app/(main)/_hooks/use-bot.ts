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

export const useUserInfo = (userId: string): DiscordUserInfo | null => {
  const { data } = useQuery(trpc.bot.getUserInfo.queryOptions({ userId }));

  if (!data) return null;

  return data;
};
import type { Metadata } from "next";
import { BotInviteGenerator } from "./bot-invite-generator";

export const metadata: Metadata = {
  title: "Discord Bot Invite Generator | Discord Utils",
  description:
    "Generate Discord bot invite links with custom permissions. Create OAuth URLs for your bot with the exact permissions it needs.",
  keywords: [
    "discord",
    "bot",
    "invite",
    "generator",
    "oauth",
    "permissions",
    "scopes",
  ],
};

export default function BotInviteGeneratorPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Discord Bot Invite Generator</h1>
        <p className="text-muted-foreground">
          Generate Discord bot invite links with custom permissions. Create OAuth
          URLs for your bot with the exact permissions it needs.
        </p>
      </div>
      <BotInviteGenerator />
    </div>
  );
} 
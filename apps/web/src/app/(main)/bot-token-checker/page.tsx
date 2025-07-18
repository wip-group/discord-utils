import type { Metadata } from "next";
import { BotTokenChecker } from "./bot-token-checker";

export const metadata: Metadata = {
  title: "Discord Bot Token Checker | Discord Utils",
  description:
    "Verify your Discord bot token and get bot information. Check if your bot token is valid and view bot details securely.",
  keywords: [
    "discord",
    "bot",
    "token",
    "checker",
    "verify",
    "bot token",
    "discord bot",
    "security",
  ],
};

export default function BotTokenCheckerPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Discord Bot Token Checker</h1>
        <p className="text-muted-foreground">
          Verify your Discord bot token and get bot information.
        </p>
      </div>
      <BotTokenChecker />
    </div>
  );
}

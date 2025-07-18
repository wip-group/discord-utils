import type { Metadata } from "next";
import { WebhookTester } from "./webhook-tester";

export const metadata: Metadata = {
  title: "Discord Webhook Tester | Discord Utils",
  description:
    "Test Discord webhooks with custom payloads. Send test messages, embeds, and analyze webhook responses.",
  keywords: [
    "discord",
    "webhook",
    "tester",
    "api",
    "payload",
    "test",
    "message",
  ],
};

export default function WebhookTesterPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Discord Webhook Tester</h1>
        <p className="text-muted-foreground">
          Test Discord webhooks with custom payloads. Send test messages and
          analyze responses in real-time.
        </p>
      </div>
      <WebhookTester />
    </div>
  );
} 
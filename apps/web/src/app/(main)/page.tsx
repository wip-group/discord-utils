import { DiscordIcon } from "@daveyplate/better-auth-ui";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/env";

const featuredTools = [
  {
    title: "Embed Builder",
    description: "Create rich Discord embeds",
    icon: "🖼️",
    href: "/tools/embed-builder",
  },
  {
    title: "Timestamp Generator",
    description: "Convert real time to Discord time",
    icon: "🌞",
    href: "/tools/timestamp-generator",
  },
  {
    title: "Permission Calculator",
    description: "Calculate permission integers",
    icon: "🔢",
    href: "/tools/permission-calculator",
  },
  {
    title: "Role Color Picker",
    description: "Design Discord role colors",
    icon: "🎨",
    href: "/tools/role-color-picker",
  },
  {
    title: "Snowflake Decoder",
    description: "Decode Discord snowflake IDs",
    icon: "❄️",
    href: "/tools/snowflake-decoder",
  },
  {
    title: "Webhook Tester",
    description: "Test webhook payloads",
    icon: "⚡",
    href: "/tools/webhook-tester",
  },
];

export default async function Home() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <div className="px-8 py-12">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <Image
              src="/logo.png"
              alt="Discord Utils"
              width={64}
              height={64}
              className="rounded-xl"
            />
            <h1 className="font-bold text-4xl tracking-tight">Discord Utils</h1>
          </div>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Community powered Discord utilities for developers, server owners and members.
          </p>
        </div>
      </div>

      {/* Featured Tools Grid */}
      <div className="px-8 pb-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="group hover:-translate-y-1 h-full transition-all hover:shadow-md">
                <CardHeader className="p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-3xl">{tool.icon}</span>
                    <CardTitle className="font-semibold text-lg">
                      {tool.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Discord Button */}
      {/* <div className="fixed right-6 bottom-6">
        <Link href={env.NEXT_PUBLIC_DISCORD_INVITE} target="_blank">
          <DiscordIcon className="size-12" />
        </Link>
      </div> */}
    </div>
  );
}

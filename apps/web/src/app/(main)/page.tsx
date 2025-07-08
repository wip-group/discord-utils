import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const featuredTools = [
  {
    title: "Timestamp Generator",
    description: "Generate Discord timestamps in various formats",
    href: "/timestamp-generator",
    icon: Clock,
    category: "Messages",
  },
  {
    title: "Embed Builder",
<<<<<<< HEAD
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
=======
    description: "Create rich Discord embeds with live preview",
    href: "/embed-builder",
    icon: MessageSquare,
    category: "Messages",
    isNew: true,
  },
  {
    title: "Bot Invite Generator",
    description: "Generate Discord bot invite links",
    href: "/permission-calculator",
    icon: Shield,
    category: "Server Setup",
  },
  {
    title: "Markdown Preview",
    description: "Preview Discord markdown formatting in real-time",
    href: "/markdown-preview",
    icon: Type,
    category: "Messages",
  },
  {
    title: "Webhook Tester",
    description: "Test Discord webhooks with custom payloads",
    href: "/webhook-tester",
    icon: Zap,
    category: "Developer",
  },
  {
    title: "Snowflake Decoder",
    description: "Decode Discord IDs to timestamps",
    href: "/snowflake-decoder",
    icon: Hash,
    category: "Developer",
  },
  {
    title: "Role Color Picker",
    description: "Design and preview Discord role colors",
    href: "/role-color-picker",
    icon: Palette,
    category: "Server Setup",
    comingSoon: true,
  },
  {
    title: "Discord Server Listing",
    description: "Discover and list Discord servers",
    href: "https://discordservers.gg",
    icon: Globe,
    category: "Server Setup",
    external: true,
>>>>>>> 3709fdb59c2671286fd8db06db10345591bcb6d1
  },
];


export default async function Home() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-card/50 to-background px-8 py-20 text-center">
        <div className="mb-8 flex items-center justify-center gap-6">
          <Image
            src="/logo.png"
            alt="Discord Utils"
            width={120}
            height={120}
            className="rounded-2xl shadow-xl"
          />
          <h1 className="font-bold text-6xl tracking-tight">Discord Utils</h1>
        </div>
        <p className="mx-auto max-w-2xl text-muted-foreground text-2xl">
          Community powered Discord utilities for developers, server owners and members.
        </p>
      </div>

      {/* Featured Tools Grid */}
      <div className="px-8 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <Card className="group h-full bg-card/50 transition-all hover:bg-card hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 text-4xl">{tool.icon}</div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Discord Button */}
      <div className="fixed right-6 bottom-6">
        <Button
          size="lg"
          className="rounded-full bg-[#5865F2] text-white shadow-lg hover:bg-[#4752C4]"
          asChild
        >
          <Link href="https://discord.gg/discord-utils" target="_blank">
            <MessageSquare className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

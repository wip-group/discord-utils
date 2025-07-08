import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  BarChart3,
  Clock,
  Code2,
  Hash,
  Link as LinkIcon,
  MessageSquare,
  Palette,
  Shield,
  Sparkles,
  Type,
  Users,
  Zap,
  Globe,
} from "lucide-react";
import Link from "next/link";

const tools = [
  {
    title: "Embed Builder",
    description: "Create rich Discord embeds with live preview",
    href: "/embed-builder",
    icon: MessageSquare,
    category: "Messages",
    isNew: true,
  },
  {
    title: "Timestamp Generator",
    description: "Generate Discord timestamps in various formats",
    href: "/timestamp-generator",
    icon: Clock,
    category: "Messages",
  },
  {
    title: "Markdown Preview",
    description: "Preview Discord markdown formatting in real-time",
    href: "/markdown-preview",
    icon: Type,
    category: "Messages",
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
    title: "Invite Tracker",
    description: "Track and analyze Discord invite links",
    href: "/invite-tracker",
    icon: LinkIcon,
    category: "Analytics",
    comingSoon: true,
  },
  {
    title: "Permission Calculator",
    description: "Calculate Discord permission integers",
    href: "/permission-calculator",
    icon: Shield,
    category: "Server Setup",
    comingSoon: true,
  },
  {
    title: "Snowflake Decoder",
    description: "Decode Discord IDs to timestamps",
    href: "/snowflake-decoder",
    icon: Hash,
    category: "Developer",
  },
  {
    title: "Webhook Tester",
    description: "Test Discord webhooks with custom payloads",
    href: "/webhook-tester",
    icon: Zap,
    category: "Developer",
  },
  {
    title: "Discord Server Listing",
    description: "Discover and list Discord servers",
    href: "https://discordservers.gg",
    icon: Globe,
    category: "Server Setup",
    external: true,
  },
];

const categories = [
  { name: "Messages", icon: MessageSquare, color: "text-blue-500" },
  { name: "Server Setup", icon: Users, color: "text-green-500" },
  { name: "Analytics", icon: BarChart3, color: "text-purple-500" },
  { name: "Developer", icon: Code2, color: "text-orange-500" },
];

export default async function Home() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="font-bold text-4xl md:text-5xl">Discord Utils</h1>
        </div>
        <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
          Essential tools for Discord server owners and developers. Build
          embeds, generate timestamps, and more.
        </p>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2"
          >
            <category.icon className={`h-4 w-4 ${category.color}`} />
            <span className="font-medium text-sm">{category.name}</span>
          </div>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.comingSoon ? "#" : tool.href}
            className={tool.comingSoon ? "cursor-not-allowed" : ""}
            target={tool.external ? "_blank" : undefined}
            rel={tool.external ? "noopener noreferrer" : undefined}
          >
            <Card
              className={`h-full transition-all hover:shadow-lg ${
                tool.comingSoon ? "opacity-60" : "hover:scale-[1.02]"
              }`}
            >
              <CardHeader>
                <div className="mb-2 flex items-start justify-between">
                  <tool.icon className="h-8 w-8 text-primary" />
                  <div className="flex gap-2">
                    {tool.isNew && (
                      <Badge variant="default" className="text-xs">
                        New
                      </Badge>
                    )}
                    {tool.comingSoon && (
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <Badge variant="outline" className="w-fit text-xs">
                  {tool.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription>{tool.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

    </div>
  );
}

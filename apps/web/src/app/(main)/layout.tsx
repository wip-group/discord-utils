"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  MessageSquare,
  Clock,
  FileText,
  Palette,
  Shield,
  Hash,
  Zap,
  LinkIcon,
  Users,
  ImageIcon,
  Type,
  Copy,
  AtSign,
} from "lucide-react";
import { Input } from "@repo/ui/components/input";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { cn } from "@repo/ui/lib/utils";
import { Footer } from "@/components/layout/footer";

const sidebarTools = [
  {
    title: "Embed Builder",
    icon: MessageSquare,
    href: "/tools/embed-builder",
  },
  {
    title: "Timestamp Generator",
    icon: Clock,
    href: "/tools/timestamp-generator",
  },
  {
    title: "Markdown Preview",
    icon: FileText,
    href: "/tools/markdown-preview",
  },
  {
    title: "Role Color Picker",
    icon: Palette,
    href: "/tools/role-color-picker",
  },
  {
    title: "Permission Calculator",
    icon: Shield,
    href: "/tools/permission-calculator",
  },
  {
    title: "Snowflake Decoder",
    icon: Hash,
    href: "/tools/snowflake-decoder",
  },
  {
    title: "Webhook Tester",
    icon: Zap,
    href: "/tools/webhook-tester",
  },
  {
    title: "Invite Tracker",
    icon: LinkIcon,
    href: "/tools/invite-tracker",
  },
  {
    title: "User Lookup",
    icon: Users,
    href: "/tools/user-lookup",
  },
  {
    title: "Avatar Grabber",
    icon: ImageIcon,
    href: "/tools/avatar-grabber",
  },
  {
    title: "Message Formatter",
    icon: Type,
    href: "/tools/message-formatter",
  },
  {
    title: "Channel ID Generator",
    icon: Copy,
    href: "/tools/channel-id-generator",
  },
  {
    title: "Bot Token Checker",
    icon: AtSign,
    href: "/tools/bot-token-checker",
  },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Custom Sidebar */}
      <aside className="w-80 border-r bg-card/50 flex flex-col">
        {/* Header */}
        <div className="border-b px-6 py-6">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Discord Utils"
              width={56}
              height={56}
              className="rounded-xl"
            />
            <h1 className="font-bold text-3xl">Discord Utils</h1>
          </Link>
        </div>

        {/* Search */}
        <div className="px-6 py-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for a utility"
              className="pl-10 h-12 text-base bg-background"
            />
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3">
          <nav className="space-y-1 pb-4">
            {sidebarTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  pathname === tool.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <tool.icon className="h-5 w-5" />
                <span>{tool.title}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
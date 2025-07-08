"use client";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { cn } from "@repo/ui/lib/utils";
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
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredTools = sidebarTools.filter((tool) =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background px-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
        <div className="flex flex-1 items-center justify-center gap-2">
          <Image
            src="/logo.png"
            alt="Discord Utils"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <h1 className="font-semibold text-lg">Discord Utils</h1>
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Custom Sidebar */}
      <aside
        className={cn(
          "fixed top-14 left-0 z-40 flex h-[calc(100vh-3.5rem)] w-64 flex-col border-r bg-card/50 transition-transform lg:sticky lg:top-0 lg:h-screen",
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="border-b px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Discord Utils"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <h1 className="font-bold text-xl">Discord Utils</h1>
          </Link>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for a utility"
              className="h-10 bg-background pl-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3">
          <nav className="space-y-1 pb-4">
            {filteredTools.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                No tools found
              </p>
            ) : (
              filteredTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-sm transition-colors",
                    pathname === tool.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <tool.icon className="h-4 w-4" />
                  <span>{tool.title}</span>
                </Link>
              ))
            )}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

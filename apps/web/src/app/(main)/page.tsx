import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { 
  Image as ImageIcon, 
  Clock, 
  Calculator, 
  Palette, 
  Hash, 
  Zap 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuredTools = [
  {
    title: "Embed Builder",
    description: "Create rich Discord embeds",
    icon: ImageIcon,
    href: "/embed-builder",
  },
  {
    title: "Timestamp Generator",
    description: "Convert real time to Discord time",
    icon: Clock,
    href: "/timestamp-generator",
  },
  {
    title: "Permission Calculator",
    description: "Calculate permission integers",
    icon: Calculator,
    href: "/permission-calculator",
  },
  {
    title: "Role Color Picker",
    description: "Design Discord role colors",
    icon: Palette,
    href: "/role-color-picker",
  },
  {
    title: "Snowflake Decoder",
    description: "Decode Discord snowflake IDs",
    icon: Hash,
    href: "/snowflake-decoder",
  },
  {
    title: "Webhook Tester",
    description: "Test webhook payloads",
    icon: Zap,
    href: "/webhook-tester",
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
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Community powered Discord utilities for developers, server owners
            and members.
          </p>
        </div>
      </div>

      {/* Featured Tools Grid */}
      <div className="px-8 pb-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Link key={tool.href} href={tool.href}>
                <Card className="group relative h-full overflow-hidden border border-border/50 bg-background/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-background/80 hover:shadow-lg">
                  <CardHeader className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <CardTitle className="font-semibold text-lg text-foreground">
                        {tool.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

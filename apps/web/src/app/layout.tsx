import "@repo/ui/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { Footer } from "@/components/layout/footer";
import Providers from "@/components/providers";
import { env } from "@/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discord Utils - Essential Tools for Discord Communities",
  description: "Essential tools for Discord server owners and developers. Build embeds, generate timestamps, preview markdown, and more.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = cookieStore.get(
    `${env.NEXT_PUBLIC_PROJECT_NAME}.session_token`,
  )?.value;

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          defer
          data-domain={"discordutils.com"}
          src="https://plausible.wip.group/js/script.js"
        />
      </head>

      <body
        className={`${geistMono.variable} ${geistSans.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

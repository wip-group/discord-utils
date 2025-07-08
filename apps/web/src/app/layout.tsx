import "@repo/ui/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
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
  title: `${env.NEXT_PUBLIC_PROJECT_NAME} - Short Tagline`,
  description: "Short Description",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          defer
          data-domain={env.NEXT_PUBLIC_HOSTNAME}
          src="https://plausible.wip.group/js/script.js"
        />
      </head>

      <body
        className={`${geistMono.variable} ${geistSans.variable} antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header isAuthenticated={!!session} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

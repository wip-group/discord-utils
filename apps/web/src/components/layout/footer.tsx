import Link from "next/link";
import { env } from "@/env";

export const Footer = () => {
  return (
    <section className="relative z-10 px-4 py-6 text-center">
      <p className="text-sm text-white/30">
        © {new Date().getFullYear()} {env.NEXT_PUBLIC_HOSTNAME}. A <Link href="https://wip.group" className="no-underline hover:underline hover:underline-offset-4" target="_blank">WIP Group, LLC</Link> company.
      </p>
      <div className="mt-2 flex justify-center gap-6 text-white/30">
        <Link
          href="/privacy"
          className="px-2 text-sm text-white/30 underline underline-offset-4 hover:no-underline"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms"
          className="px-2 text-sm underline underline-offset-4 hover:no-underline"
        >
          Terms of Service
        </Link>
        <Link
          href={env.NEXT_PUBLIC_DISCORD_INVITE}
          className="px-2 text-sm underline underline-offset-4 hover:no-underline"
        >
          Join our Discord
        </Link>
      </div>
    </section>
  );
};

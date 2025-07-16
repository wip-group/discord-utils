import type { Metadata } from "next";
import { TimestampGenerator } from "./timestamp-generator";

export const metadata: Metadata = {
  title: "Discord Timestamp Generator | Discord Utils",
  description:
    "Generate Discord timestamps in various formats. Create relative time displays and formatted dates for Discord messages.",
  keywords: [
    "discord",
    "timestamp",
    "generator",
    "time",
    "date",
    "relative time",
  ],
};

export default function TimestampGeneratorPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Discord Timestamp Generator</h1>
        <p className="text-muted-foreground">
          Generate Discord timestamps that display in the user's local timezone.
          Click any format to copy.
        </p>
      </div>
      <TimestampGenerator />
    </div>
  );
}

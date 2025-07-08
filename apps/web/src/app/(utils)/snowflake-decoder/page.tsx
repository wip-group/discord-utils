import type { Metadata } from "next";
import { SnowflakeDecoder } from "./snowflake-decoder";

export const metadata: Metadata = {
  title: "Discord Snowflake Decoder - Discord Utils",
  description:
    "Decode Discord snowflake IDs to timestamps, dates, and other information. Convert Discord IDs to readable timestamps.",
  keywords: [
    "discord",
    "snowflake",
    "decoder",
    "id",
    "timestamp",
    "convert",
    "discord id",
  ],
};

export default function SnowflakeDecoderPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Discord Snowflake Decoder</h1>
        <p className="text-muted-foreground">
          Decode Discord snowflake IDs to extract timestamps, dates, and other
          information. Convert any Discord ID to a readable timestamp.
        </p>
      </div>
      <SnowflakeDecoder />
    </div>
  );
} 
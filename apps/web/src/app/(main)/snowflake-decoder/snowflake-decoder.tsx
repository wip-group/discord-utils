"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Separator } from "@repo/ui/components/separator";

import {
  Calendar,
  Clock,
  Copy,
  Hash,
  Info,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface SnowflakeInfo {
  snowflake: string;
  timestamp: Date;
  unixTimestamp: number;
  workerId: number;
  processId: number;
  increment: number;
  binary: string;
  isValid: boolean;
}

const DISCORD_EPOCH = 1420070400000; // January 1, 2015



export function SnowflakeDecoder() {
  const [input, setInput] = useState("");
  const [decodedInfo, setDecodedInfo] = useState<SnowflakeInfo | null>(null);

  const validateSnowflake = (snowflake: string): boolean => {
    // Check if it's a valid 17-19 digit number
    return /^\d{17,19}$/.test(snowflake);
  };

  const decodeSnowflake = (snowflake: string): SnowflakeInfo | null => {
    if (!validateSnowflake(snowflake)) {
      return null;
    }

    const snowflakeBigInt = BigInt(snowflake);
    const binary = snowflakeBigInt.toString(2).padStart(64, "0");

    // Extract components from binary
    const timestampBits = binary.substring(0, 42);
    const workerIdBits = binary.substring(42, 47);
    const processIdBits = binary.substring(47, 52);
    const incrementBits = binary.substring(52, 64);

    // Convert to decimal values
    const timestamp = Number.parseInt(timestampBits, 2);
    const workerId = Number.parseInt(workerIdBits, 2);
    const processId = Number.parseInt(processIdBits, 2);
    const increment = Number.parseInt(incrementBits, 2);

    // Convert Discord timestamp to Unix timestamp
    const unixTimestamp = timestamp + DISCORD_EPOCH;
    const date = new Date(unixTimestamp);

    return {
      snowflake,
      timestamp: date,
      unixTimestamp,
      workerId,
      processId,
      increment,
      binary,
      isValid: true,
    };
  };

  const handleDecode = () => {
    if (!input.trim()) {
      toast.error("Please enter a snowflake ID");
      return;
    }

    const decoded = decodeSnowflake(input.trim());
    if (decoded) {
      setDecodedInfo(decoded);
      toast.success("Snowflake decoded successfully!");
    } else {
      toast.error("Invalid snowflake ID. Please enter a valid 17-19 digit number.");
    }
  };



  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };



  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (diff < 0) {
      const futureSeconds = Math.abs(seconds);
      const futureMinutes = Math.floor(futureSeconds / 60);
      const futureHours = Math.floor(futureMinutes / 60);
      const futureDays = Math.floor(futureHours / 24);
      const futureMonths = Math.floor(futureDays / 30);
      const futureYears = Math.floor(futureDays / 365);

      if (futureYears > 0) return `in ${futureYears} year${futureYears > 1 ? "s" : ""}`;
      if (futureMonths > 0) return `in ${futureMonths} month${futureMonths > 1 ? "s" : ""}`;
      if (futureDays > 0) return `in ${futureDays} day${futureDays > 1 ? "s" : ""}`;
      if (futureHours > 0) return `in ${futureHours} hour${futureHours > 1 ? "s" : ""}`;
      if (futureMinutes > 0) return `in ${futureMinutes} minute${futureMinutes > 1 ? "s" : ""}`;
      return `in ${futureSeconds} second${futureSeconds > 1 ? "s" : ""}`;
    }

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column - Main Content */}
      <div className="space-y-6 lg:col-span-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Decode Snowflake
            </CardTitle>
            <CardDescription>
              Enter a Discord snowflake ID to decode its information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="snowflake">Snowflake ID</Label>
              <div className="flex gap-2">
                <Input
                  id="snowflake"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="1234567890123456789"
                  className="flex-1"
                />
                <Button onClick={handleDecode}>
                  <Search className="mr-2 h-4 w-4" />
                  Decode
                </Button>
              </div>
            </div>


          </CardContent>
        </Card>

        {/* Results Section */}
        {decodedInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Decoded Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Snowflake ID</Label>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 text-sm">
                      {decodedInfo.snowflake}
                    </code>
                    <Button
                      onClick={() => copyToClipboard(decodedInfo.snowflake)}
                      size="sm"
                      variant="ghost"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Created At</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {decodedInfo.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Time</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">
                      {decodedInfo.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Relative Time</Label>
                  <Badge variant="outline" className="text-xs">
                    {getRelativeTime(decodedInfo.timestamp)}
                  </Badge>
                </div>

                <div>
                  <Label className="text-sm font-medium">Unix Timestamp</Label>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 text-sm">
                      {decodedInfo.unixTimestamp}
                    </code>
                    <Button
                      onClick={() => copyToClipboard(decodedInfo.unixTimestamp.toString())}
                      size="sm"
                      variant="ghost"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Worker ID</Label>
                  <Badge variant="outline" className="text-xs">
                    {decodedInfo.workerId}
                  </Badge>
                </div>

                <div>
                  <Label className="text-sm font-medium">Process ID</Label>
                  <Badge variant="outline" className="text-xs">
                    {decodedInfo.processId}
                  </Badge>
                </div>

                <div>
                  <Label className="text-sm font-medium">Increment</Label>
                  <Badge variant="outline" className="text-xs">
                    {decodedInfo.increment}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium">Binary Representation</Label>
                <div className="mt-2 rounded-lg bg-muted p-3">
                  <div className="font-mono text-xs">
                    <div className="mb-1">
                      <span className="text-blue-500">Timestamp:</span>{" "}
                      {decodedInfo.binary.substring(0, 42)}
                    </div>
                    <div className="mb-1">
                      <span className="text-green-500">Worker ID:</span>{" "}
                      {decodedInfo.binary.substring(42, 47)}
                    </div>
                    <div className="mb-1">
                      <span className="text-yellow-500">Process ID:</span>{" "}
                      {decodedInfo.binary.substring(47, 52)}
                    </div>
                    <div>
                      <span className="text-red-500">Increment:</span>{" "}
                      {decodedInfo.binary.substring(52, 64)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Column - Information Card */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>About Discord Snowflakes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Discord snowflakes are unique 64-bit integers that contain encoded
                information about when and where they were created.
              </p>
              <div className="space-y-2">
                <div>
                  <strong>Timestamp (42 bits):</strong> Milliseconds since Discord epoch
                  (January 1, 2015)
                </div>
                <div>
                  <strong>Worker ID (5 bits):</strong> ID of the Discord server that
                  generated the snowflake
                </div>
                <div>
                  <strong>Process ID (5 bits):</strong> ID of the process that
                  generated the snowflake
                </div>
                <div>
                  <strong>Increment (12 bits):</strong> Counter for snowflakes
                  generated in the same millisecond
                </div>
              </div>
              <p className="text-xs">
                <strong>Note:</strong> All Discord IDs (users, messages, channels,
                servers, etc.) are snowflakes and can be decoded using this tool.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
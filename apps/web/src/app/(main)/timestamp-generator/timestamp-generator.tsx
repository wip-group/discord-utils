"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Calendar, Clock, Copy, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAnalytics } from "@/lib/analytics";

interface TimestampFormat {
  style: string;
  format: string;
  description: string;
  example: string;
}

const timestampFormats: TimestampFormat[] = [
  {
    style: "t",
    format: "Short Time",
    description: "16:20",
    example: "16:20",
  },
  {
    style: "T",
    format: "Long Time",
    description: "16:20:30",
    example: "16:20:30",
  },
  {
    style: "d",
    format: "Short Date",
    description: "20/04/2021",
    example: "20/04/2021",
  },
  {
    style: "D",
    format: "Long Date",
    description: "20 April 2021",
    example: "20 April 2021",
  },
  {
    style: "f",
    format: "Short Date/Time",
    description: "20 April 2021 16:20",
    example: "20 April 2021 16:20",
  },
  {
    style: "F",
    format: "Long Date/Time",
    description: "Tuesday, 20 April 2021 16:20",
    example: "Tuesday, 20 April 2021 16:20",
  },
  {
    style: "R",
    format: "Relative Time",
    description: "2 months ago",
    example: "2 months ago",
  },
];

export function TimestampGenerator() {
  const { trackToolUse } = useAnalytics();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [timestamp, setTimestamp] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const date = new Date(selectedDate);
    const localDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD format
    const localTime = date.toTimeString().slice(0, 5); // HH:MM format
    setDateInput(localDate);
    setTimeInput(localTime);
    setTimestamp(Math.floor(date.getTime() / 1000));
  }, [selectedDate]);

  const handleDateChange = (value: string) => {
    setDateInput(value);
    if (value) {
      const newDate = new Date(`${value}T${timeInput}`);
      if (!Number.isNaN(newDate.getTime())) {
        setSelectedDate(newDate);
      }
    }
  };

  const handleTimeChange = (value: string) => {
    setTimeInput(value);
    if (dateInput && value) {
      const newDate = new Date(`${dateInput}T${value}`);
      if (!Number.isNaN(newDate.getTime())) {
        setSelectedDate(newDate);
      }
    }
  };

  const handleTimestampChange = (value: string) => {
    const ts = Number.parseInt(value);
    if (!Number.isNaN(ts) && ts > 0) {
      setTimestamp(ts);
      setSelectedDate(new Date(ts * 1000));
    }
  };

  const setToNow = () => {
    setSelectedDate(new Date());
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
    trackToolUse("timestamp-generator");
  };

  const getRelativeTime = (date: Date) => {
    const seconds = Math.floor((currentTime.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 0) {
      const futureSeconds = Math.abs(seconds);
      const futureMinutes = Math.floor(futureSeconds / 60);
      const futureHours = Math.floor(futureMinutes / 60);
      const futureDays = Math.floor(futureHours / 24);
      const futureMonths = Math.floor(futureDays / 30);
      const futureYears = Math.floor(futureDays / 365);

      if (futureYears > 0)
        return `in ${futureYears} year${futureYears > 1 ? "s" : ""}`;
      if (futureMonths > 0)
        return `in ${futureMonths} month${futureMonths > 1 ? "s" : ""}`;
      if (futureDays > 0)
        return `in ${futureDays} day${futureDays > 1 ? "s" : ""}`;
      if (futureHours > 0)
        return `in ${futureHours} hour${futureHours > 1 ? "s" : ""}`;
      if (futureMinutes > 0)
        return `in ${futureMinutes} minute${futureMinutes > 1 ? "s" : ""}`;
      return `in ${futureSeconds} second${futureSeconds > 1 ? "s" : ""}`;
    }

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  };

  const getFormattedExample = (format: TimestampFormat) => {
    const date = selectedDate;
    const locale = "en-US";

    switch (format.style) {
      case "t":
        return date.toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
        });
      case "T":
        return date.toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      case "d":
        return date.toLocaleDateString(locale, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      case "D":
        return date.toLocaleDateString(locale, {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      case "f":
        return date.toLocaleDateString(locale, {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      case "F":
        return date.toLocaleDateString(locale, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      case "R":
        return getRelativeTime(date);
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Left Column - Date/Time Input */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Select Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={dateInput}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={timeInput}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  step="1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="timestamp">Unix Timestamp</Label>
              <div className="flex gap-2">
                <Input
                  id="timestamp"
                  type="number"
                  value={timestamp}
                  onChange={(e) => handleTimestampChange(e.target.value)}
                  placeholder="1618934400"
                />
                              <Button onClick={setToNow}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Now
              </Button>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="mb-1 text-muted-foreground text-sm">
                Selected Date/Time:
              </p>
              <p className="font-mono text-[16px]">{selectedDate.toString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">How to use</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-inside list-decimal space-y-1 text-muted-foreground text-sm">
              <li>Select your desired date and time above</li>
              <li>Click on any format to copy the Discord timestamp</li>
              <li>Paste it in your Discord message</li>
              <li>
                Discord will automatically format it based on each user's
                timezone
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Timestamp Formats */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Discord Timestamp Formats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timestampFormats.map((format) => {
                const discordFormat = `<t:${timestamp}:${format.style}>`;
                const preview = getFormattedExample(format);

                return (
                  <Card
                    key={format.style}
                    className="cursor-pointer transition-all hover:scale-[1.01] hover:shadow-md py-0"
                    onClick={() => copyToClipboard(discordFormat)}
                  >
                    <CardContent className="p-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <h3 className="font-semibold text-sm">{format.format}</h3>
                            <Badge variant="outline" className="text-xs">
                              {format.style}
                            </Badge>
                          </div>
                          <p className="mb-1 text-muted-foreground text-xs">
                            {format.description}
                          </p>
                          <div className="flex items-center gap-3">
                            <code className="rounded bg-muted px-2 py-1 text-xs">
                              {discordFormat}
                            </code>
                            <span className="text-muted-foreground text-xs">
                              →
                            </span>
                            <span className="font-medium text-xs">{preview}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

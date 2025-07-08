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
import { Switch } from "@repo/ui/components/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { Textarea } from "@repo/ui/components/textarea";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Copy,
  Loader2,
  Send,
  Settings,
  TestTube,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WebhookResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  timestamp: Date;
  duration: number;
}

interface TestPayload {
  content?: string;
  username?: string;
  avatar_url?: string;
  embeds?: any[];
}

const defaultPayload: TestPayload = {
  content: "Hello from Discord Utils! 🚀",
  username: "Webhook Tester",
  avatar_url: "",
  embeds: [],
};

const examplePayloads = {
  simple: {
    content: "Hello from Discord Utils! 🚀",
    username: "Webhook Tester",
  },
  embed: {
    username: "Embed Test",
    embeds: [
      {
        title: "Test Embed",
        description: "This is a test embed sent via webhook",
        color: 0x5865f2,
        fields: [
          {
            name: "Field 1",
            value: "Value 1",
            inline: true,
          },
          {
            name: "Field 2",
            value: "Value 2",
            inline: true,
          },
        ],
        footer: {
          text: "Sent via Discord Utils",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  },
  rich: {
    content: "Check out this rich message!",
    username: "Rich Webhook",
    embeds: [
      {
        title: "Rich Embed Example",
        description: "This embed demonstrates various Discord embed features",
        url: "https://discord.com",
        color: 0x00ff00,
        author: {
          name: "Discord Utils",
          url: "https://discordutils.com",
          icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
        },
        thumbnail: {
          url: "https://cdn.discordapp.com/embed/avatars/1.png",
        },
        image: {
          url: "https://cdn.discordapp.com/embed/avatars/2.png",
        },
        fields: [
          {
            name: "Inline Field 1",
            value: "This field is inline",
            inline: true,
          },
          {
            name: "Inline Field 2",
            value: "This field is also inline",
            inline: true,
          },
          {
            name: "Full Width Field",
            value: "This field takes the full width of the embed",
            inline: false,
          },
        ],
        footer: {
          text: "Discord Utils • Webhook Tester",
          icon_url: "https://cdn.discordapp.com/embed/avatars/3.png",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  },
};

export function WebhookTester() {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [payload, setPayload] = useState<TestPayload>(defaultPayload);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<WebhookResponse | null>(null);
  const [activeTab, setActiveTab] = useState("simple");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const validateWebhookUrl = (url: string) => {
    const webhookPattern = /^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]+$/;
    return webhookPattern.test(url);
  };

  const loadExample = (example: keyof typeof examplePayloads) => {
    setPayload(examplePayloads[example]);
    toast.success("Example payload loaded!");
  };

  const sendWebhook = async () => {
    if (!webhookUrl.trim()) {
      toast.error("Please enter a webhook URL");
      return;
    }

    if (!validateWebhookUrl(webhookUrl)) {
      toast.error("Please enter a valid Discord webhook URL");
      return;
    }

    if (!payload.content && (!payload.embeds || payload.embeds.length === 0)) {
      toast.error("Please add content or an embed to the payload");
      return;
    }

    setIsLoading(true);
    const startTime = Date.now();

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      const responseBody = await response.text();
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      const webhookResponse: WebhookResponse = {
        status: response.status,
        statusText: response.statusText,
        headers,
        body: responseBody,
        timestamp: new Date(),
        duration,
      };

      setResponse(webhookResponse);

      if (response.ok) {
        toast.success("Webhook sent successfully!");
      } else {
        toast.error(`Webhook failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;

      setResponse({
        status: 0,
        statusText: "Network Error",
        headers: {},
        body: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date(),
        duration,
      });

      toast.error("Failed to send webhook. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    toast.success("Payload copied to clipboard!");
  };

  const clearResponse = () => {
    setResponse(null);
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-500";
    if (status >= 400 && status < 500) return "text-yellow-500";
    if (status >= 500) return "text-red-500";
    return "text-gray-500";
  };

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300) return <CheckCircle className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Webhook Configuration */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Webhook Configuration
            </CardTitle>
            <CardDescription>
              Enter your Discord webhook URL and configure the payload
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://discord.com/api/webhooks/123456789/abcdef..."
                className={webhookUrl && !validateWebhookUrl(webhookUrl) ? "border-red-500" : ""}
              />
              {webhookUrl && !validateWebhookUrl(webhookUrl) && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid Discord webhook URL
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Label>Advanced Options</Label>
              <Switch
                checked={showAdvanced}
                onCheckedChange={setShowAdvanced}
              />
            </div>

            {showAdvanced && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username Override</Label>
                  <Input
                    id="username"
                    value={payload.username || ""}
                    onChange={(e) =>
                      setPayload({ ...payload, username: e.target.value })
                    }
                    placeholder="Leave empty to use webhook default"
                  />
                </div>

                <div>
                  <Label htmlFor="avatarUrl">Avatar URL</Label>
                  <Input
                    id="avatarUrl"
                    type="url"
                    value={payload.avatar_url || ""}
                    onChange={(e) =>
                      setPayload({ ...payload, avatar_url: e.target.value })
                    }
                    placeholder="https://example.com/avatar.png"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payload Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Payload Editor
            </CardTitle>
            <CardDescription>
              Configure the message content and embeds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="simple">Simple</TabsTrigger>
                <TabsTrigger value="embed">Embed</TabsTrigger>
              </TabsList>

              <TabsContent value="simple" className="space-y-4">
                <div>
                  <Label htmlFor="content">Message Content</Label>
                  <Textarea
                    id="content"
                    value={payload.content || ""}
                    onChange={(e) =>
                      setPayload({ ...payload, content: e.target.value })
                    }
                    placeholder="Enter your message content..."
                    rows={4}
                  />
                  <span className="text-muted-foreground text-xs">
                    {payload.content?.length || 0}/2000 characters
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => loadExample("simple")}
                    size="sm"
                    variant="outline"
                  >
                    Load Simple Example
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="embed" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="embedTitle">Title</Label>
                    <Input
                      id="embedTitle"
                      value={payload.embeds?.[0]?.title || ""}
                      onChange={(e) => {
                        const currentEmbed = payload.embeds?.[0] || {};
                        setPayload({
                          ...payload,
                          embeds: [{ ...currentEmbed, title: e.target.value }],
                        });
                      }}
                      placeholder="Embed title"
                      maxLength={256}
                    />
                  </div>

                  <div>
                    <Label htmlFor="embedDescription">Description</Label>
                    <Textarea
                      id="embedDescription"
                      value={payload.embeds?.[0]?.description || ""}
                      onChange={(e) => {
                        const currentEmbed = payload.embeds?.[0] || {};
                        setPayload({
                          ...payload,
                          embeds: [{ ...currentEmbed, description: e.target.value }],
                        });
                      }}
                      placeholder="Embed description"
                      rows={3}
                      maxLength={4096}
                    />
                  </div>

                  <div>
                    <Label htmlFor="embedUrl">URL</Label>
                    <Input
                      id="embedUrl"
                      type="url"
                      value={payload.embeds?.[0]?.url || ""}
                      onChange={(e) => {
                        const currentEmbed = payload.embeds?.[0] || {};
                        setPayload({
                          ...payload,
                          embeds: [{ ...currentEmbed, url: e.target.value }],
                        });
                      }}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="embedColor">Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="embedColor"
                        type="color"
                        value={
                          payload.embeds?.[0]?.color
                            ? `#${payload.embeds[0].color.toString(16).padStart(6, '0')}`
                            : "#5865F2"
                        }
                        onChange={(e) => {
                          const currentEmbed = payload.embeds?.[0] || {};
                          const color = Number.parseInt(e.target.value.replace("#", ""), 16);
                          setPayload({
                            ...payload,
                            embeds: [{ ...currentEmbed, color }],
                          });
                        }}
                        className="h-10 w-20"
                      />
                      <Input
                        value={
                          payload.embeds?.[0]?.color
                            ? `#${payload.embeds[0].color.toString(16).padStart(6, '0')}`
                            : "#5865F2"
                        }
                        onChange={(e) => {
                          const currentEmbed = payload.embeds?.[0] || {};
                          const color = Number.parseInt(e.target.value.replace("#", ""), 16);
                          setPayload({
                            ...payload,
                            embeds: [{ ...currentEmbed, color }],
                          });
                        }}
                        placeholder="#5865F2"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="embedTimestamp">Timestamp</Label>
                    <div className="flex gap-2">
                      <Input
                        id="embedTimestamp"
                        type="datetime-local"
                        value={
                          payload.embeds?.[0]?.timestamp
                            ? new Date(payload.embeds[0].timestamp).toISOString().slice(0, 16)
                            : ""
                        }
                        onChange={(e) => {
                          const currentEmbed = payload.embeds?.[0] || {};
                          const timestamp = e.target.value ? new Date(e.target.value).toISOString() : undefined;
                          setPayload({
                            ...payload,
                            embeds: [{ ...currentEmbed, timestamp }],
                          });
                        }}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => {
                          const currentEmbed = payload.embeds?.[0] || {};
                          setPayload({
                            ...payload,
                            embeds: [{ ...currentEmbed, timestamp: new Date().toISOString() }],
                          });
                        }}
                        size="sm"
                        variant="outline"
                      >
                        Now
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => loadExample("embed")}
                    size="sm"
                    variant="outline"
                  >
                    Load Embed Example
                  </Button>
                  <Button
                    onClick={() => loadExample("rich")}
                    size="sm"
                    variant="outline"
                  >
                    Load Rich Example
                  </Button>
                  <Button onClick={copyPayload} size="sm" variant="outline">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Payload
                  </Button>
                </div>
              </TabsContent>


            </Tabs>

            <Separator className="my-4" />

            <Button
              onClick={sendWebhook}
              disabled={isLoading || !webhookUrl.trim()}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Sending..." : "Send Webhook"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Response Viewer */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Response
            </CardTitle>
            <CardDescription>
              View the webhook response and timing information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!response ? (
              <div className="py-8 text-center text-muted-foreground">
                <Clock className="mx-auto mb-2 h-8 w-8" />
                <p>Send a webhook to see the response here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <span className={getStatusColor(response.status)}>
                      {getStatusIcon(response.status)}
                    </span>
                    <span className="font-medium">
                      {response.status} {response.statusText}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {response.duration}ms
                    </Badge>
                    <Button
                      onClick={clearResponse}
                      size="sm"
                      variant="ghost"
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                {/* Headers */}
                <div>
                  <Label className="text-sm font-medium">Response Headers</Label>
                  <div className="mt-2 max-h-32 overflow-y-auto rounded-lg bg-muted p-3">
                    <pre className="text-xs">
                      {Object.entries(response.headers)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join("\n")}
                    </pre>
                  </div>
                </div>

                {/* Body */}
                <div>
                  <Label className="text-sm font-medium">Response Body</Label>
                  <div className="mt-2 max-h-64 overflow-y-auto rounded-lg bg-muted p-3">
                    <pre className="text-xs">
                      {response.body || "No response body"}
                    </pre>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="text-muted-foreground text-xs">
                  Sent at: {response.timestamp.toLocaleString()}
                </div>
              </div>
            )}
          </CardContent>
        </Card>


      </div>
    </div>
  );
} 
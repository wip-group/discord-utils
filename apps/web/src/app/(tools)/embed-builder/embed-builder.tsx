"use client";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
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
import { Code, Copy, Download, Eye, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EmbedField {
  name: string;
  value: string;
  inline: boolean;
}

interface DiscordEmbedJSON {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  timestamp?: string;
  author?: {
    name: string;
    url?: string;
    icon_url?: string;
  };
  thumbnail?: {
    url: string;
  };
  image?: {
    url: string;
  };
  footer?: {
    text: string;
    icon_url?: string;
  };
  fields?: EmbedField[];
}

interface EmbedData {
  title: string;
  description: string;
  url: string;
  color: string;
  timestamp: boolean;
  author: {
    name: string;
    url: string;
    iconUrl: string;
  };
  thumbnail: {
    url: string;
  };
  image: {
    url: string;
  };
  footer: {
    text: string;
    iconUrl: string;
  };
  fields: EmbedField[];
}

const defaultEmbed: EmbedData = {
  title: "",
  description: "",
  url: "",
  color: "#5865F2",
  timestamp: false,
  author: {
    name: "",
    url: "",
    iconUrl: "",
  },
  thumbnail: {
    url: "",
  },
  image: {
    url: "",
  },
  footer: {
    text: "",
    iconUrl: "",
  },
  fields: [],
};

export function EmbedBuilder() {
  const [embed, setEmbed] = useState<EmbedData>(defaultEmbed);
  const [activeTab, setActiveTab] = useState("general");

  const updateEmbed = (updates: Partial<EmbedData>) => {
    setEmbed((prev) => ({ ...prev, ...updates }));
  };

  const addField = () => {
    if (embed.fields.length >= 25) {
      toast.error("Maximum 25 fields allowed");
      return;
    }
    updateEmbed({
      fields: [...embed.fields, { name: "", value: "", inline: false }],
    });
  };

  const updateField = (index: number, field: Partial<EmbedField>) => {
    const newFields = [...embed.fields];
    newFields[index] = { ...newFields[index], ...field };
    updateEmbed({ fields: newFields });
  };

  const removeField = (index: number) => {
    updateEmbed({ fields: embed.fields.filter((_, i) => i !== index) });
  };

  const generateCode = () => {
    const embedObj: DiscordEmbedJSON = {};

    if (embed.title) embedObj.title = embed.title;
    if (embed.description) embedObj.description = embed.description;
    if (embed.url) embedObj.url = embed.url;
    if (embed.color)
      embedObj.color = Number.parseInt(embed.color.replace("#", ""), 16);
    if (embed.timestamp) embedObj.timestamp = new Date().toISOString();

    if (embed.author.name) {
      embedObj.author = { name: embed.author.name };
      if (embed.author.url) embedObj.author.url = embed.author.url;
      if (embed.author.iconUrl) embedObj.author.icon_url = embed.author.iconUrl;
    }

    if (embed.thumbnail.url) {
      embedObj.thumbnail = { url: embed.thumbnail.url };
    }

    if (embed.image.url) {
      embedObj.image = { url: embed.image.url };
    }

    if (embed.footer.text) {
      embedObj.footer = { text: embed.footer.text };
      if (embed.footer.iconUrl) embedObj.footer.icon_url = embed.footer.iconUrl;
    }

    if (embed.fields.length > 0) {
      embedObj.fields = embed.fields
        .filter((field) => field.name && field.value)
        .map((field) => ({
          name: field.name,
          value: field.value,
          inline: field.inline,
        }));
    }

    return JSON.stringify({ embeds: [embedObj] }, null, 2);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateCode());
    toast.success("Code copied to clipboard!");
  };

  const downloadCode = () => {
    const blob = new Blob([generateCode()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "discord-embed.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Code downloaded!");
  };

  const hasContent =
    embed.title ||
    embed.description ||
    embed.author.name ||
    embed.footer.text ||
    embed.fields.some((f) => f.name || f.value);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Embed Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="author">Author</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="fields">Fields</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={embed.title}
                  onChange={(e) => updateEmbed({ title: e.target.value })}
                  placeholder="Embed title"
                  maxLength={256}
                />
                <span className="text-muted-foreground text-xs">
                  {embed.title.length}/256
                </span>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={embed.description}
                  onChange={(e) => updateEmbed({ description: e.target.value })}
                  placeholder="Embed description"
                  rows={4}
                  maxLength={4096}
                />
                <span className="text-muted-foreground text-xs">
                  {embed.description.length}/4096
                </span>
              </div>

              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={embed.url}
                  onChange={(e) => updateEmbed({ url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="color">Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={embed.color}
                    onChange={(e) => updateEmbed({ color: e.target.value })}
                    className="h-10 w-20"
                  />
                  <Input
                    value={embed.color}
                    onChange={(e) => updateEmbed({ color: e.target.value })}
                    placeholder="#5865F2"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="timestamp">Timestamp</Label>
                <Switch
                  id="timestamp"
                  checked={embed.timestamp}
                  onCheckedChange={(checked) =>
                    updateEmbed({ timestamp: checked })
                  }
                />
              </div>

              <div>
                <Label htmlFor="footer">Footer Text</Label>
                <Input
                  id="footer"
                  value={embed.footer.text}
                  onChange={(e) =>
                    updateEmbed({
                      footer: { ...embed.footer, text: e.target.value },
                    })
                  }
                  placeholder="Footer text"
                  maxLength={2048}
                />
                <span className="text-muted-foreground text-xs">
                  {embed.footer.text.length}/2048
                </span>
              </div>

              <div>
                <Label htmlFor="footerIcon">Footer Icon URL</Label>
                <Input
                  id="footerIcon"
                  type="url"
                  value={embed.footer.iconUrl}
                  onChange={(e) =>
                    updateEmbed({
                      footer: { ...embed.footer, iconUrl: e.target.value },
                    })
                  }
                  placeholder="https://example.com/icon.png"
                />
              </div>
            </TabsContent>

            <TabsContent value="author" className="space-y-4">
              <div>
                <Label htmlFor="authorName">Author Name</Label>
                <Input
                  id="authorName"
                  value={embed.author.name}
                  onChange={(e) =>
                    updateEmbed({
                      author: { ...embed.author, name: e.target.value },
                    })
                  }
                  placeholder="Author name"
                  maxLength={256}
                />
              </div>

              <div>
                <Label htmlFor="authorUrl">Author URL</Label>
                <Input
                  id="authorUrl"
                  type="url"
                  value={embed.author.url}
                  onChange={(e) =>
                    updateEmbed({
                      author: { ...embed.author, url: e.target.value },
                    })
                  }
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="authorIcon">Author Icon URL</Label>
                <Input
                  id="authorIcon"
                  type="url"
                  value={embed.author.iconUrl}
                  onChange={(e) =>
                    updateEmbed({
                      author: { ...embed.author, iconUrl: e.target.value },
                    })
                  }
                  placeholder="https://example.com/avatar.png"
                />
              </div>
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <div>
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  type="url"
                  value={embed.thumbnail.url}
                  onChange={(e) =>
                    updateEmbed({
                      thumbnail: { url: e.target.value },
                    })
                  }
                  placeholder="https://example.com/thumbnail.png"
                />
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  value={embed.image.url}
                  onChange={(e) =>
                    updateEmbed({
                      image: { url: e.target.value },
                    })
                  }
                  placeholder="https://example.com/image.png"
                />
              </div>
            </TabsContent>

            <TabsContent value="fields" className="space-y-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-muted-foreground text-sm">
                  {embed.fields.length}/25 fields
                </p>
                <Button onClick={addField} size="sm" variant="outline">
                  <Plus className="mr-1 h-4 w-4" />
                  Add Field
                </Button>
              </div>

              {embed.fields.map((field, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Field {index + 1}</Label>
                      <Button
                        onClick={() => removeField(index)}
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      value={field.name}
                      onChange={(e) =>
                        updateField(index, { name: e.target.value })
                      }
                      placeholder="Field name"
                      maxLength={256}
                    />
                    <Textarea
                      value={field.value}
                      onChange={(e) =>
                        updateField(index, { value: e.target.value })
                      }
                      placeholder="Field value"
                      rows={2}
                      maxLength={1024}
                    />
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.inline}
                        onCheckedChange={(checked) =>
                          updateField(index, { inline: checked })
                        }
                      />
                      <Label>Inline</Label>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex gap-2">
            <Button onClick={copyCode} className="flex-1">
              <Copy className="mr-2 h-4 w-4" />
              Copy Code
            </Button>
            <Button onClick={downloadCode} variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-[#36393f] p-4">
            {!hasContent ? (
              <p className="py-8 text-center text-gray-400">
                Your embed preview will appear here
              </p>
            ) : (
              <div className="max-w-[516px]">
                <div
                  className="rounded-l border-l-4 bg-[#2f3136] p-4"
                  style={{ borderColor: embed.color }}
                >
                  {embed.author.name && (
                    <div className="mb-2 flex items-center gap-2">
                      {embed.author.iconUrl && (
                        <img
                          src={embed.author.iconUrl}
                          alt=""
                          className="h-6 w-6 rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      )}
                      {embed.author.url ? (
                        <a
                          href={embed.author.url}
                          className="font-medium text-sm text-white hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {embed.author.name}
                        </a>
                      ) : (
                        <span className="font-medium text-sm text-white">
                          {embed.author.name}
                        </span>
                      )}
                    </div>
                  )}

                  {embed.title && (
                    <div className="mb-2">
                      {embed.url ? (
                        <a
                          href={embed.url}
                          className="font-semibold text-[#00b0f4] hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {embed.title}
                        </a>
                      ) : (
                        <h3 className="font-semibold text-white">
                          {embed.title}
                        </h3>
                      )}
                    </div>
                  )}

                  {embed.description && (
                    <p className="mb-3 whitespace-pre-wrap text-[#dcddde] text-sm">
                      {embed.description}
                    </p>
                  )}

                  {embed.fields.length > 0 && (
                    <div className="mb-3 grid grid-cols-1 gap-2">
                      <div
                        className={`grid gap-2 ${
                          embed.fields.some((f) => f.inline)
                            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                            : "grid-cols-1"
                        }`}
                      >
                        {embed.fields
                          .filter((field) => field.name && field.value)
                          .map((field, index) => (
                            <div
                              key={index}
                              className={field.inline ? "" : "col-span-full"}
                            >
                              <div className="mb-1 font-semibold text-[#8e9297] text-xs">
                                {field.name}
                              </div>
                              <div className="whitespace-pre-wrap text-[#dcddde] text-sm">
                                {field.value}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {embed.thumbnail.url && (
                      <img
                        src={embed.thumbnail.url}
                        alt=""
                        className="h-20 w-20 rounded object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}
                  </div>

                  {embed.image.url && (
                    <img
                      src={embed.image.url}
                      alt=""
                      className="mt-3 w-full rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}

                  {(embed.footer.text || embed.timestamp) && (
                    <div className="mt-3 flex items-center gap-2 text-[#72767d] text-xs">
                      {embed.footer.iconUrl && (
                        <img
                          src={embed.footer.iconUrl}
                          alt=""
                          className="h-5 w-5 rounded-full"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      )}
                      {embed.footer.text && <span>{embed.footer.text}</span>}
                      {embed.footer.text && embed.timestamp && <span>•</span>}
                      {embed.timestamp && (
                        <span>
                          {new Date().toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="mb-2 font-semibold">Generated Code</h3>
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
              <code>{generateCode()}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

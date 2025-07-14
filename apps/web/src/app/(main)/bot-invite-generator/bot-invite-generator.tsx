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
import { Checkbox } from "@repo/ui/components/checkbox";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Separator } from "@repo/ui/components/separator";

import {
  Calculator,
  Copy,
  ExternalLink,
  Info,
  Link as LinkIcon,
  Shield,
  Users,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Permission {
  name: string;
  value: bigint;
  description: string;
  requires2FA?: boolean;
}

const permissions: Record<string, Permission[]> = {
  general: [
    {
      name: "View Channels",
      value: BigInt(1) << BigInt(10),
      description: "View channels by default",
    },
    {
      name: "Manage Channels",
      value: BigInt(1) << BigInt(4),
      description: "Create, edit, and delete channels",
      requires2FA: true,
    },
    {
      name: "Manage Roles",
      value: BigInt(1) << BigInt(28),
      description: "Create, edit, and delete roles",
      requires2FA: true,
    },
    {
      name: "Manage Emojis and Stickers",
      value: BigInt(1) << BigInt(30),
      description: "Create, edit, and delete emojis and stickers",
      requires2FA: true,
    },
    {
      name: "View Audit Log",
      value: BigInt(1) << BigInt(7),
      description: "View server audit log",
    },
    {
      name: "View Server Insights",
      value: BigInt(1) << BigInt(19),
      description: "View server insights",
    },
    {
      name: "Manage Webhooks",
      value: BigInt(1) << BigInt(29),
      description: "Create, edit, and delete webhooks",
      requires2FA: true,
    },
    {
      name: "Manage Server",
      value: BigInt(1) << BigInt(5),
      description: "Manage server settings",
      requires2FA: true,
    },
    {
      name: "Create Invite",
      value: BigInt(1) << BigInt(0),
      description: "Create instant invites",
    },
    {
      name: "Change Nickname",
      value: BigInt(1) << BigInt(26),
      description: "Change own nickname",
    },
    {
      name: "Manage Nicknames",
      value: BigInt(1) << BigInt(27),
      description: "Manage other users' nicknames",
    },
    {
      name: "Kick Members",
      value: BigInt(1) << BigInt(1),
      description: "Kick members from the server",
      requires2FA: true,
    },
    {
      name: "Ban Members",
      value: BigInt(1) << BigInt(2),
      description: "Ban members from the server",
      requires2FA: true,
    },
    {
      name: "Manage Events",
      value: BigInt(1) << BigInt(33),
      description: "Create, edit, and delete events",
      requires2FA: true,
    },
    {
      name: "Administrator",
      value: BigInt(1) << BigInt(3),
      description: "All permissions (bypasses channel overrides)",
      requires2FA: true,
    },
  ],
  text: [
    {
      name: "Send Messages",
      value: BigInt(1) << BigInt(11),
      description: "Send messages in text channels",
    },
    {
      name: "Send Messages in Threads",
      value: BigInt(1) << BigInt(34),
      description: "Send messages in threads",
    },
    {
      name: "Create Public Threads",
      value: BigInt(1) << BigInt(35),
      description: "Create public threads",
    },
    {
      name: "Create Private Threads",
      value: BigInt(1) << BigInt(36),
      description: "Create private threads",
    },
    {
      name: "Embed Links",
      value: BigInt(1) << BigInt(14),
      description: "Include embeds when sending messages",
    },
    {
      name: "Attach Files",
      value: BigInt(1) << BigInt(15),
      description: "Attach files to messages",
    },
    {
      name: "Add Reactions",
      value: BigInt(1) << BigInt(6),
      description: "Add reactions to messages",
    },
    {
      name: "Use External Emoji",
      value: BigInt(1) << BigInt(18),
      description: "Use emojis from other servers",
    },
    {
      name: "Use External Stickers",
      value: BigInt(1) << BigInt(37),
      description: "Use stickers from other servers",
    },
    {
      name: "Mention @everyone, @here, and All Roles",
      value: BigInt(1) << BigInt(17),
      description: "Mention everyone, here, and all roles",
    },
    {
      name: "Manage Messages",
      value: BigInt(1) << BigInt(13),
      description: "Delete and pin messages",
      requires2FA: true,
    },
    {
      name: "Manage Threads",
      value: BigInt(1) << BigInt(34),
      description: "Manage threads",
      requires2FA: true,
    },
    {
      name: "Read Message History",
      value: BigInt(1) << BigInt(16),
      description: "Read message history",
    },
    {
      name: "Send Text-to-Speech Messages",
      value: BigInt(1) << BigInt(12),
      description: "Send text-to-speech messages",
    },
    {
      name: "Use Application Commands",
      value: BigInt(1) << BigInt(31),
      description: "Use slash commands",
    },
  ],
  voice: [
    {
      name: "Connect",
      value: BigInt(1) << BigInt(20),
      description: "Connect to voice channels",
    },
    {
      name: "Speak",
      value: BigInt(1) << BigInt(21),
      description: "Speak in voice channels",
    },
    {
      name: "Video",
      value: BigInt(1) << BigInt(22),
      description: "Use video in voice channels",
    },
    {
      name: "Start Activities",
      value: BigInt(1) << BigInt(39),
      description: "Start activities in voice channels",
    },
    {
      name: "Use Voice Activity",
      value: BigInt(1) << BigInt(25),
      description: "Use voice activity detection",
    },
    {
      name: "Priority Speaker",
      value: BigInt(1) << BigInt(8),
      description: "Priority speaker in voice channels",
    },
    {
      name: "Mute Members",
      value: BigInt(1) << BigInt(23),
      description: "Mute members in voice channels",
    },
    {
      name: "Deafen Members",
      value: BigInt(1) << BigInt(24),
      description: "Deafen members in voice channels",
    },
    {
      name: "Move Members",
      value: BigInt(1) << BigInt(9),
      description: "Move members between voice channels",
    },
    {
      name: "Request to Speak",
      value: BigInt(1) << BigInt(32),
      description: "Request to speak in stage channels",
    },
  ],
};

const scopes = [
  { id: "bot", name: "Bot", description: "Add bot to server" },
  { id: "applications.commands", name: "Applications Commands", description: "Use slash commands" },
];

export function BotInviteGenerator() {
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set());
  const [clientId, setClientId] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<Set<string>>(new Set(["bot"]));
  const [redirectUri, setRedirectUri] = useState("");
  const [requireCodeGrant, setRequireCodeGrant] = useState(false);

  const calculatePermissions = (): bigint => {
    let total = BigInt(0);
    for (const permissionName of selectedPermissions) {
      for (const category of Object.values(permissions)) {
        const permission = category.find(p => p.name === permissionName);
        if (permission) {
          total |= permission.value;
          break;
        }
      }
    }
    return total;
  };

  const togglePermission = (permissionName: string) => {
    const newSelected = new Set(selectedPermissions);
    if (newSelected.has(permissionName)) {
      newSelected.delete(permissionName);
    } else {
      newSelected.add(permissionName);
    }
    setSelectedPermissions(newSelected);
  };

  const toggleScope = (scopeId: string) => {
    const newSelected = new Set(selectedScopes);
    if (newSelected.has(scopeId)) {
      newSelected.delete(scopeId);
    } else {
      newSelected.add(scopeId);
    }
    setSelectedScopes(newSelected);
  };

  const generateOAuthUrl = (): string => {
    const permissions = calculatePermissions();
    const scopes = Array.from(selectedScopes).join("%20");
    const clientIdParam = clientId || "INSERT_CLIENT_ID_HERE";
    
    let url = `https://discord.com/oauth2/authorize?client_id=${clientIdParam}&scope=${scopes}&permissions=${permissions}`;
    
    if (redirectUri) {
      url += `&redirect_uri=${encodeURIComponent(redirectUri)}`;
    }
    
    if (requireCodeGrant) {
      url += "&response_type=code";
    }
    
    return url;
  };

  const copyOAuthUrl = () => {
    const url = generateOAuthUrl();
    navigator.clipboard.writeText(url);
    toast.success("OAuth URL copied to clipboard!");
  };

  const copyPermissions = () => {
    const permissions = calculatePermissions();
    navigator.clipboard.writeText(permissions.toString());
    toast.success("Permission integer copied to clipboard!");
  };

  const getRequires2FAPermissions = (): string[] => {
    const requires2FA: string[] = [];
    for (const permissionName of selectedPermissions) {
      for (const category of Object.values(permissions)) {
        const permission = category.find(p => p.name === permissionName);
        if (permission?.requires2FA) {
          requires2FA.push(permissionName);
        }
      }
    }
    return requires2FA;
  };

  const permissionsValue = calculatePermissions();
  const requires2FA = getRequires2FAPermissions();

    return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column - Permissions */}
      <div className="space-y-6 lg:col-span-2">
        {/* Bot Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Bot Configuration
            </CardTitle>
            <CardDescription>
              Select the permissions your bot needs
            </CardDescription>
          </CardHeader>
          <CardContent>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* General Permissions */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">General Permissions</h3>
                {permissions.general.map((permission) => (
                  <div key={permission.name} className="flex items-start space-x-3">
                    <Checkbox
                      id={permission.name}
                      checked={selectedPermissions.has(permission.name)}
                      onCheckedChange={() => togglePermission(permission.name)}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={permission.name}
                        className={`flex items-center gap-2 text-sm font-medium ${
                          permission.name === "Administrator" ? "text-red-600" : ""
                        }`}
                      >
                        {permission.name}
                        {permission.requires2FA && (
                          <Badge variant="outline" className="text-xs">
                            2FA
                          </Badge>
                        )}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Text Permissions */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Text Permissions</h3>
                {permissions.text.map((permission) => (
                  <div key={permission.name} className="flex items-start space-x-3">
                    <Checkbox
                      id={permission.name}
                      checked={selectedPermissions.has(permission.name)}
                      onCheckedChange={() => togglePermission(permission.name)}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={permission.name}
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        {permission.name}
                        {permission.requires2FA && (
                          <Badge variant="outline" className="text-xs">
                            2FA
                          </Badge>
                        )}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voice Permissions */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Voice Permissions</h3>
                {permissions.voice.map((permission) => (
                  <div key={permission.name} className="flex items-start space-x-3">
                    <Checkbox
                      id={permission.name}
                      checked={selectedPermissions.has(permission.name)}
                      onCheckedChange={() => togglePermission(permission.name)}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={permission.name}
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        {permission.name}
                        {permission.requires2FA && (
                          <Badge variant="outline" className="text-xs">
                            2FA
                          </Badge>
                        )}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {requires2FA.length > 0 && (
              <div className="mt-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-3">
                <p className="text-sm text-yellow-600">
                  <strong>Note:</strong> The following permissions require the bot owner to have 2-Factor Authentication enabled if the server requires 2FA:
                </p>
                <ul className="mt-2 text-sm text-yellow-600">
                  {requires2FA.map((permission) => (
                    <li key={permission}>• {permission}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>


      </div>

      {/* Right Column - URL Generator */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              URL Generator
            </CardTitle>
            <CardDescription>
              Generate invite URL for your bot
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                id="clientId"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Insert Client ID here"
              />
            </div>

            <div>
              <Label>Scope</Label>
              <div className="mt-2 space-y-2">
                {scopes.map((scope) => (
                  <div key={scope.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={scope.id}
                      checked={selectedScopes.has(scope.id)}
                      onCheckedChange={() => toggleScope(scope.id)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={scope.id} className="text-sm font-medium">
                        {scope.name}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {scope.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="redirectUri">Redirect URI (optional)</Label>
              <Input
                id="redirectUri"
                value={redirectUri}
                onChange={(e) => setRedirectUri(e.target.value)}
                placeholder="https://your-domain.com/callback"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="requireCodeGrant"
                checked={requireCodeGrant}
                onCheckedChange={(checked) => setRequireCodeGrant(checked as boolean)}
              />
              <Label htmlFor="requireCodeGrant" className="text-sm">
                Require Code Grant
              </Label>
            </div>

            <Separator />

            <div>
              <Label className="text-sm font-medium">Generated URL</Label>
              <div className="mt-2 space-y-2">
                <Input
                  value={generateOAuthUrl()}
                  readOnly
                  className="font-mono text-xs"
                />
                <div className="flex gap-2">
                  <Button onClick={copyOAuthUrl} size="sm" variant="outline" className="flex-1">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button
                    onClick={() => window.open(generateOAuthUrl(), "_blank")}
                    size="sm"
                    variant="outline"
                    className="flex-1"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
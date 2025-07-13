"use client";

import React, { useState } from "react";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Card } from "@repo/ui/components/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { Bot, Shield, AlertTriangle } from "lucide-react";

export default function BotTokenChecker() {
  const [botToken, setBotToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [botInfo, setBotInfo] = useState<any>(null);

  const handleCheck = async () => {
    if (!botToken.trim()) {
      toast.error("Please enter a bot token");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch("https://discord.com/api/v10/users/@me", {
        headers: {
          Authorization: `Bot ${botToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBotInfo(data);
      } else {
        setBotInfo(null);
        toast.error("Invalid bot token");
      }
    } catch (error) {
      setBotInfo(null);
      toast.error("Error checking bot token");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(botToken);
    toast.success("Token copied to clipboard!");
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold">Discord Bot Token Checker</h1>
        <p className="text-lg text-muted-foreground">
          Verify your Discord bot token and get bot information.
        </p>
      </div>

      <Card className="mb-8 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Security Notice</h2>
              <p className="text-sm text-muted-foreground">
                Your bot token will not be stored, shared, or saved anywhere. 

              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Bot Token</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Discord bot token to verify it and get bot information.
              You can find your bot token in the Discord Developer Portal.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Input
              type="password"
              placeholder="Enter your bot token..."
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              className="max-w-md"
            />
            <Button onClick={handleCheck} disabled={isLoading}>
              {isLoading ? "Checking..." : "Check Token"}
            </Button>
          </div>
        </div>
      </Card>

      {isLoading && (
        <Card className="p-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Verifying bot token...
          </div>
        </Card>
      )}

      {botInfo && (
        <Card className="overflow-hidden">
          <div className="border-b p-6">
            <div className="flex items-start gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-12 w-12 text-primary" />
              </div>
              <div className="space-y-2">
                <div>
                  <h2 className="text-2xl font-bold">{botInfo.username}</h2>
                  <p className="text-muted-foreground">Bot ID: {botInfo.id}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyToken}>
                    Copy Token
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="info" className="p-6">
            <TabsList>
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Bot ID:</span>
                  <span className="font-mono">{botInfo.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Username:</span>
                  <span>{botInfo.username}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Discriminator:</span>
                  <span>{botInfo.discriminator}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Verified:</span>
                  <span>{botInfo.verified ? "Yes" : "No"}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Bot:</span>
                  <span>{botInfo.bot ? "Yes" : "No"}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Important Security Information</h4>
                    <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                      <li>• Your bot token is never stored on our servers</li>
                      <li>• The token is only used temporarily to verify with Discord's API</li>
                      <li>• We do not log, save, or share your bot token</li>
                      <li>• Keep your bot token secure and never share it publicly</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Token Format</h4>
                  <code className="block w-full overflow-x-auto rounded bg-muted p-2 text-sm">
                    {botToken.substring(0, 10)}...{botToken.substring(botToken.length - 10)}
                  </code>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
}

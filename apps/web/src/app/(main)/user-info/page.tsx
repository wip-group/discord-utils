"use client";

import React, { useState } from "react";
import { useUserInfo } from "../_hooks/use-bot";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Avatar, AvatarImage, AvatarFallback } from "@repo/ui/components/avatar";
import { Card } from "@repo/ui/components/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";

export default function PfpGrabber() {
  const [userId, setUserId] = useState<string>("");
  const [searchId, setSearchId] = useState<string>("");
  const { data: userInfo, isLoading, error } = useUserInfo(searchId);

  const handleSearch = () => {
    if (!userId.trim()) {
      toast.error("Please enter a user ID");
      return;
    }
    setSearchId(userId.trim());
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied to clipboard!");
  };

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold">Discord PFP Grabber</h1>
        <p className="text-lg text-muted-foreground">
          Get the profile picture of any Discord user using their ID.
        </p>
      </div>

      <Card className="mb-8 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">User ID</h2>
            <p className="text-sm text-muted-foreground">
              Enter the ID of the Discord user you want to get the profile picture of.
              To get a user ID, enable developer mode on Discord,
              right-click on a user and select "Copy ID".
            </p>
          </div>
          <div className="flex gap-3">
            <Input
              placeholder="Enter the Discord user ID..."
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="max-w-md"
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </Card>

      {isLoading && searchId && (
        <Card className="p-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Searching...
          </div>
        </Card>
      )}

      {error && (
        <Card className="p-6 border-destructive">
          <div className="flex items-center gap-3 text-destructive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Are you sure the user ID is correct? Please check and try again.
          </div>
        </Card>
      )}

      {userInfo && !error && (
        <Card className="overflow-hidden">
          <div className="border-b p-6">
            <div className="flex items-start gap-6">
              <Avatar className="size-32 rounded-lg">
                <AvatarImage src={userInfo.avatarUrl} alt={userInfo.username} className="object-cover" />
                <AvatarFallback className="text-2xl">{userInfo.username[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div>
                  <h2 className="text-2xl font-bold">{userInfo.globalName}</h2>
                  <p className="text-muted-foreground">@{userInfo.username}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleCopyUrl(userInfo.avatarUrl)}>
                    Copy Avatar URL
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={userInfo.avatarUrl} target="_blank" rel="noopener noreferrer">
                      Open in New Tab
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="info" className="p-6">
            <TabsList>
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="urls">URLs</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">User ID:</span>
                  <span className="font-mono">{userInfo.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Avatar Type:</span>
                  <span>{userInfo.isAnimated ? "Animated (GIF)" : "Static (PNG)"}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Custom Avatar:</span>
                  <span>{userInfo.hasCustomAvatar ? "Yes" : "No (Default Avatar)"}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="urls" className="space-y-4 pt-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">URL Avatar (1024px)</span>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyUrl(userInfo.avatarUrl)}>
                      Copy
                    </Button>
                  </div>
                  <code className="block w-full overflow-x-auto rounded bg-muted p-2 text-sm">
                    {userInfo.avatarUrl}
                  </code>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">URL Avatar (128px)</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleCopyUrl(userInfo.avatarUrl.replace("size=1024", "size=128"))}
                    >
                      Copy
                    </Button>
                  </div>
                  <code className="block w-full overflow-x-auto rounded bg-muted p-2 text-sm">
                    {userInfo.avatarUrl.replace("size=1024", "size=128")}
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
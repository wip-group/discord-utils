"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Button } from "@repo/ui/components/button";
import { Copy, Palette } from "lucide-react";

// Discord color palette - all available colors
const discordColors = [
  { name: "Default", hex: "#99AAB5", rgb: "153, 170, 181" },
  { name: "Red", hex: "#FF0000", rgb: "255, 0, 0" },
  { name: "Dark Red", hex: "#7F0000", rgb: "127, 0, 0" },
  { name: "Orange", hex: "#FF7F00", rgb: "255, 127, 0" },
  { name: "Yellow", hex: "#FFFF00", rgb: "255, 255, 0" },
  { name: "Green", hex: "#00FF00", rgb: "0, 255, 0" },
  { name: "Dark Green", hex: "#007F00", rgb: "0, 127, 0" },
  { name: "Blue", hex: "#0000FF", rgb: "0, 0, 255" },
  { name: "Dark Blue", hex: "#00007F", rgb: "0, 0, 127" },
  { name: "Purple", hex: "#7F00FF", rgb: "127, 0, 255" },
  { name: "Dark Purple", hex: "#3F007F", rgb: "63, 0, 127" },
  { name: "Pink", hex: "#FF00FF", rgb: "255, 0, 255" },
  { name: "Dark Pink", hex: "#7F007F", rgb: "127, 0, 127" },
  { name: "Brown", hex: "#7F3F00", rgb: "127, 63, 0" },
  { name: "Dark Brown", hex: "#3F1F00", rgb: "63, 31, 0" },
  { name: "Gray", hex: "#7F7F7F", rgb: "127, 127, 127" },
  { name: "Dark Gray", hex: "#3F3F3F", rgb: "63, 63, 63" },
  { name: "Light Gray", hex: "#BFBFBF", rgb: "191, 191, 191" },
  { name: "White", hex: "#FFFFFF", rgb: "255, 255, 255" },
  { name: "Black", hex: "#000000", rgb: "0, 0, 0" },
  { name: "Teal", hex: "#00FFFF", rgb: "0, 255, 255" },
  { name: "Dark Teal", hex: "#007F7F", rgb: "0, 127, 127" },
  { name: "Lime", hex: "#7FFF00", rgb: "127, 255, 0" },
  { name: "Dark Lime", hex: "#3F7F00", rgb: "63, 127, 0" },
  { name: "Cyan", hex: "#00FF7F", rgb: "0, 255, 127" },
  { name: "Dark Cyan", hex: "#007F3F", rgb: "0, 127, 63" },
  { name: "Magenta", hex: "#FF007F", rgb: "255, 0, 127" },
  { name: "Dark Magenta", hex: "#7F003F", rgb: "127, 0, 63" },
  { name: "Gold", hex: "#FFD700", rgb: "255, 215, 0" },
  { name: "Dark Gold", hex: "#7F6B00", rgb: "127, 107, 0" },
  { name: "Silver", hex: "#C0C0C0", rgb: "192, 192, 192" },
  { name: "Dark Silver", hex: "#606060", rgb: "96, 96, 96" },
];

export function RoleColorPicker() {
  const [roleName, setRoleName] = useState("");
  const [selectedColor, setSelectedColor] = useState(discordColors[0]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Role Configuration
          </CardTitle>
          <CardDescription>
            Enter your role name and select a color to preview how it will look in Discord.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role-name">Role Name</Label>
            <Input
              id="role-name"
              placeholder="Enter role name..."
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Selected Color</Label>
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900">
              <div 
                className="w-8 h-8 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div>
                <div className="font-medium">{selectedColor.name}</div>
                <div className="text-sm text-muted-foreground">
                  {selectedColor.hex} • RGB({selectedColor.rgb})
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={() => copyToClipboard(selectedColor.hex)}
              size="sm"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy HEX
            </Button>
            <Button 
              onClick={() => copyToClipboard(selectedColor.rgb)}
              size="sm"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy RGB
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Role Preview</CardTitle>
          <CardDescription>
            See how your role will appear in Discord.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Discord-like role preview */}
            <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="font-medium">
                  {roleName || "Role Name"}
                </span>
              </div>
            </div>

            {/* Color palette grid */}
            <div className="space-y-3">
              <Label>Available Discord Colors</Label>
              <div className="grid grid-cols-6 gap-2">
                {discordColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`relative p-2 rounded-lg transition-all hover:scale-105 ${
                      selectedColor.hex === color.hex 
                        ? "border-blue-500 ring-2 ring-blue-200" 
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                    }`}
                    title={`${color.name} - ${color.hex}`}
                  >
                    <div 
                      className="w-full h-8 rounded"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="text-xs mt-1 font-medium truncate">
                      {color.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
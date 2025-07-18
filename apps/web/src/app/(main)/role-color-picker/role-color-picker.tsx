"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Button } from "@repo/ui/components/button";
import { Copy, Palette, Paintbrush2 } from "lucide-react";
import { toast } from "sonner";
import { useAnalytics } from "@/lib/analytics";

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
  const { trackToolUse } = useAnalytics();
  const [roleName, setRoleName] = useState("");
  const [selectedColor, setSelectedColor] = useState(discordColors[0]);
  const [customColor, setCustomColor] = useState("#FF5733");
  const [useCustom, setUseCustom] = useState(false);
  const [useGradient, setUseGradient] = useState(false);
  const [gradientColor1, setGradientColor1] = useState("#FF5733");
  const [gradientColor2, setGradientColor2] = useState("#33B5FF");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
    trackToolUse("role-color-picker");
  };

  const getCurrentColor = () => {
    if (useGradient) {
      return `linear-gradient(135deg, ${gradientColor1}, ${gradientColor2})`;
    }
    return useCustom ? customColor : selectedColor.hex;
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "";
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
      {/* Configuration Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Role Configuration
            </CardTitle>
            <CardDescription>
              Configure your Discord role name and select a color to preview how it will appear.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input
                id="role-name"
                placeholder="Enter role name..."
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </div>
            
            <div className="space-y-3">
              <Label>Color Type</Label>
              <div className="flex gap-2">
                <Button 
                  variant={!useCustom && !useGradient ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setUseCustom(false);
                    setUseGradient(false);
                  }}
                >
                  Discord Palette
                </Button>
                <Button 
                  variant={useCustom && !useGradient ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setUseCustom(true);
                    setUseGradient(false);
                  }}
                >
                  Custom Color
                </Button>
                <Button 
                  variant={useGradient ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setUseCustom(false);
                    setUseGradient(true);
                  }}
                >
                  Gradient
                </Button>
              </div>
            </div>

            {useCustom && !useGradient && (
              <div className="space-y-2">
                <Label htmlFor="custom-color">Custom Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="custom-color"
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-16 h-10 p-1 rounded-lg"
                  />
                  <Input
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    placeholder="#FF5733"
                    className="flex-1"
                  />
                </div>
              </div>
            )}

            {useGradient && (
              <div className="space-y-3">
                <Label>Gradient Colors</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-sm">Start Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={gradientColor1}
                        onChange={(e) => setGradientColor1(e.target.value)}
                        className="w-12 h-8 p-0 rounded"
                      />
                      <Input
                        value={gradientColor1}
                        onChange={(e) => setGradientColor1(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">End Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={gradientColor2}
                        onChange={(e) => setGradientColor2(e.target.value)}
                        className="w-12 h-8 p-0 rounded"
                      />
                      <Input
                        value={gradientColor2}
                        onChange={(e) => setGradientColor2(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Discord Colors Palette */}
        {!useCustom && !useGradient && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paintbrush2 className="h-5 w-5" />
                Discord Color Palette
              </CardTitle>
              <CardDescription>
                Choose from Discord's available role colors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {discordColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                      selectedColor.hex === color.hex 
                        ? "ring-2 ring-primary shadow-lg scale-105" 
                        : "hover:shadow-md"
                    }`}
                    title={`${color.name} - ${color.hex}`}
                  >
                    <div 
                      className="w-full h-10 rounded-md shadow-sm border border-border"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="text-xs mt-1.5 font-medium truncate text-center">
                      {color.name}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Preview Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Color Information</CardTitle>
            <CardDescription>
              Current color details and copy options.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
              <div 
                className="w-16 h-16 rounded-lg shadow-lg border border-border"
                style={{ 
                  background: getCurrentColor(),
                }}
              />
              <div className="flex-1">
                <div className="font-semibold text-lg">
                  {useGradient ? "Custom Gradient" : useCustom ? "Custom Color" : selectedColor.name}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {useGradient 
                    ? `${gradientColor1} → ${gradientColor2}`
                    : useCustom 
                      ? `${customColor} • RGB(${hexToRgb(customColor)})`
                      : `${selectedColor.hex} • RGB(${selectedColor.rgb})`
                  }
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => copyToClipboard(useGradient ? `${gradientColor1},${gradientColor2}` : useCustom ? customColor : selectedColor.hex)}
                size="sm"
                className="w-full"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Hex
              </Button>
              {!useGradient && (
                <Button 
                  onClick={() => copyToClipboard(useCustom ? hexToRgb(customColor) : selectedColor.rgb)}
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy RGB
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Discord Preview</CardTitle>
            <CardDescription>
              See how your role will appear in Discord's member list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label>Member List Preview</Label>
              <div className="bg-[#2f3136] rounded-lg p-4 space-y-3">
                <div className="text-xs text-[#b9bbbe] uppercase font-semibold tracking-wide">
                  {useGradient ? "Custom Gradient" : useCustom ? "Custom Color" : selectedColor.name} — 1
                </div>
                <div className="flex items-center gap-3 hover:bg-[#36393f] p-2 rounded transition-colors">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span 
                    className="font-medium text-white"
                    style={{ 
                      background: useGradient ? getCurrentColor() : 'transparent',
                      color: useGradient ? 'transparent' : getCurrentColor(),
                      backgroundClip: useGradient ? 'text' : 'unset',
                      WebkitBackgroundClip: useGradient ? 'text' : 'unset'
                    }}
                  >
                    {roleName || "Example Role"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
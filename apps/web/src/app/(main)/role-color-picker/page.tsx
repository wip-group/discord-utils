import type { Metadata } from "next";
import { RoleColorPicker } from "./role-color-picker";

export const metadata: Metadata = {
  title: "Discord Role Color Picker | Discord Utils",
  description:
    "Design Discord role colors with custom palettes, custom colors, and gradients. See how your role will look in real-time with authentic Discord previews.",
  keywords: [
    "discord",
    "role",
    "color",
    "picker",
    "design",
    "palette",
    "gradient",
    "discord role",
  ],
};

export default function RoleColorPickerPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Discord Role Color Picker</h1>
        <p className="text-muted-foreground">
          Design Discord role colors with custom palettes, custom colors, and gradients. 
          See how your role will look in real-time with authentic Discord previews.
        </p>
      </div>
      <RoleColorPicker />
    </div>
  );
}

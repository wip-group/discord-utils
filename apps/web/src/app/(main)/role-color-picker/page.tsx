import type { Metadata } from "next";
import { RoleColorPicker } from "./role-color-picker";

export const metadata: Metadata = {
  title: "Discord Role Color Picker | Discord Utils",
  description:
    "Design Discord role colors with custom palettes and preview. Choose from all available Discord colors and preview your role design.",
  keywords: [
    "discord",
    "role",
    "color",
    "picker",
    "design",
    "palette",
    "discord role",
  ],
};

export default function RoleColorPickerPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Discord Role Color Picker</h1>
        <p className="text-muted-foreground">
          Design Discord role colors with custom palettes and preview. Choose from all available Discord colors and see how your role will look.
        </p>
      </div>
      <RoleColorPicker />
    </div>
  );
}

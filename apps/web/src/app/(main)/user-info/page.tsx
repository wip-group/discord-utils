import type { Metadata } from "next";
import { UserInfo } from "./user-info";

export const metadata: Metadata = {
  title: "Discord User Info | Discord Utils",
  description:
    "Get Discord user information and avatar URLs by user ID. View user details, copy avatar links, and access different avatar sizes.",
  keywords: [
    "discord",
    "user",
    "info",
    "avatar",
    "profile",
    "user id",
    "discord user",
  ],
};

export default function UserInfoPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-3xl">Discord User Info</h1>
        <p className="text-muted-foreground">
          Get the information of any Discord user using their ID.
        </p>
      </div>
      <UserInfo />
    </div>
  );
}
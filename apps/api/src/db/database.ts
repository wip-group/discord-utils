import { extendZod } from "@zodyac/zod-mongoose";
import { env } from "bun";
import mongoose from "mongoose";
import { z } from "zod";

let extended = false;
function addZodExtension() {
  if (extended) return;
  extended = true;
  extendZod(z);
}

mongoose.connect(env.DATABASE_URL!, {
  dbName: env.NEXT_PUBLIC_PROJECT_NAME!,
});

addZodExtension();

export const database = mongoose.connection;

database.once("open", () => {
  console.log("[MongoDB]: Successfully connected");
});

database.on("error", (error) => console.error(`[MongoDB] Error: ${error}`));

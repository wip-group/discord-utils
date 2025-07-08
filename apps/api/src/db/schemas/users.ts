import { zId, zodSchema } from "@zodyac/zod-mongoose";
import { z } from "zod";
import { database } from "@/db/database";

// Quick Note: Ctrl + R (Find and Replace) Helps with setting this file up with a new schema :D

// This is the main object
export const ZodUser = z.object({
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
});

// This includes additional data added by mongo, remove the timestamps if you don't want them or if you specify them as false below.
// You will primarily use this type for runtime validation on endpoints with `const object: Type = (this)#parse(json)`
export const ZodMongoUser = ZodUser.extend({
  _id: zId(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Here you can change settings about how mongo handles the collection & schema.
const UserSchema = zodSchema(ZodUser, {
  timestamps: true,
  versionKey: false,
  collection: "users",
});

/* These are the main types you will use:
  - XType      (input/ raw type) and
  - MongoXType (output/ includes all fields from XType + mongo fields like _id, createdAt...)
*/
export type UserType = z.infer<typeof ZodUser>;
export type MongoUserType = z.infer<typeof ZodMongoUser>;

// This is the model you will use to interact with the database.
export const UserModel = database.model("user", UserSchema);

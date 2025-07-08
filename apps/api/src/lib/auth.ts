import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { database } from "@/db/database";
import { env } from "@/env";
import { sendResetPasswordEmail, sendVerificationEmail } from "./email";

const db = database.getClient().db()

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, token }) => {
      const resetUrl = `${Bun.env.NEXT_PUBLIC_WEBSITE_URL}/auth/reset-password?token=${token}`;
      const result = await sendResetPasswordEmail({
        email: user.email,
        verificationUrl: resetUrl,
      });

      if (result.error) return console.log("sendResetPasswordEmail Error: ", result.error);
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60 * 1, // 1 HOUR
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => {
      const verificationUrl = `${Bun.env.NEXT_PUBLIC_WEBSITE_URL}/?email=${token}`;
      try {
        await sendVerificationEmail({
          email: user.email,
          verificationUrl: verificationUrl,
        });
      } catch (error) {
        console.log("sendVerificationEmail Error: ", error);
      }
    },
  },

  trustedOrigins: [env.NEXT_PUBLIC_WEBSITE_URL],

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },

  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain:
        env.NEXT_PUBLIC_NODE_ENV === "development"
          ? "localhost"
          : `.${env.NEXT_PUBLIC_HOSTNAME}`,
    },
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: "none", // Allows CORS-based cookie sharing across subdomains
      partitioned: true, // New browser standards will mandate this for foreign cookies
    },

    cookiePrefix: env.NEXT_PUBLIC_PROJECT_NAME,
  },

  // Preconfigured social providers, remove if not needed
  socialProviders: {
    // discord: {
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    //   mapProfileToUser: async (profile) => {
    //     const sanitizedUsername = sanitizeUsername(profile.username);
    //     const uniqueUsername = await getNextBestUsername(sanitizedUsername);
    //     return {
    //       username: uniqueUsername.toLowerCase(),
    //       displayUsername: uniqueUsername,
    //     };
    //   },
    // },
    // github: {
    //   clientId: env.GITHUB_CLIENT_ID,
    //   clientSecret: env.GITHUB_CLIENT_SECRET,
    //   mapProfileToUser: async (profile) => {
    //     const sanitizedUsername = sanitizeUsername(profile.name);
    //     const uniqueUsername = await getNextBestUsername(sanitizedUsername);
    //     return {
    //       username: uniqueUsername.toLowerCase(),
    //       displayUsername: uniqueUsername,
    //     };
    //   },
    // },
    // google: {
    //   clientId: env.GOOGLE_CLIENT_ID,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET,
    //   mapProfileToUser: async (profile) => {
    //     const sanitizedUsername = sanitizeUsername(
    //       profile.email.split("@")[0] ?? "",
    //     );
    //     const uniqueUsername = await getNextBestUsername(sanitizedUsername);
    //     return {
    //       username: uniqueUsername.toLowerCase(),
    //       displayUsername: uniqueUsername,
    //     };
    //   },
    // },
  },

  user: {
    additionalFields: {},
  },

  rateLimit: {
    window: 30, // time window in seconds
    max: 100, // max requests in the window
  },
});

export function sanitizeUsername(username: string) {
  return username.replace(/[^a-zA-Z0-9_.]/g, "").substring(0, 20);
}

async function _getNextBestUsername(username: string) {
  // Check if username exists
  const exists = await db
    .collection("user")
    .findOne({ username: username.toLowerCase() });

  if (!exists) return username;

  // Try adding numbers
  for (let i = 1; i <= 99; i++) {
    const suggestion = `${username}${i}`;
    const taken = await db
      .collection("user")
      .findOne({ username: suggestion.toLowerCase() });
    if (!taken) {
      return suggestion;
    }
  }

  // If still not available, add random suffix
  const final = `${username}_${Math.random().toString(36).substring(2, 5)}`;

  return final;
}

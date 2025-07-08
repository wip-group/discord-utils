import { EmailClient } from "@azure/communication-email";

// Initialize Azure Communication Services Email client
export const emailClient = new EmailClient(
  Bun.env.AZURE_COMMUNICATION_CONNECTION_STRING!,
);

export const sendVerificationEmail = async ({
  email,
  verificationUrl,
}: {
  email: string;
  verificationUrl: string;
}) => {
  const senderAddress = Bun.env.EMAIL_FROM;
  if (!senderAddress) {
    throw new Error("EMAIL_FROM environment variable is not set");
  }

  const emailMessage = {
    senderAddress,
    content: {
      subject: "Verify your email address",
      plainText: `Thanks for joining ${Bun.env.NEXT_PUBLIC_PROJECT_DISPLAY_NAME}!

To complete registration, please verify your email address:
${verificationUrl}`,
    },
    recipients: {
      to: [
        {
          address: email,
        },
      ],
    },
  };

  // Fire and forget - don't wait for the email to complete
  emailClient.beginSend(emailMessage).catch((error) => {
    console.error("Failed to send verification email:", error);
  });
};

export const sendResetPasswordEmail = async ({
  email,
  verificationUrl,
}: {
  email: string;
  verificationUrl: string;
}): Promise<{ error?: string }> => {
  const senderAddress = Bun.env.EMAIL_FROM;
  if (!senderAddress) {
    return { error: "EMAIL_FROM environment variable is not set" };
  }

  const emailMessage = {
    senderAddress,
    content: {
      subject: "Reset your password",
      plainText: `You requested a password reset for your ${Bun.env.NEXT_PUBLIC_PROJECT_DISPLAY_NAME} account.

To reset your password, click the link below:
${verificationUrl}

If you didn't request this reset, you can safely ignore this email.`,
    },
    recipients: {
      to: [
        {
          address: email,
        },
      ],
    },
  };

  // Fire and forget - don't wait for the email to complete
  emailClient.beginSend(emailMessage).catch((error) => {
    console.error("Failed to send reset password email:", error);
  });

  return {}; // Return empty object on success
};

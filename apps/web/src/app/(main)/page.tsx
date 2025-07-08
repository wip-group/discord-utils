import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { serverTrpc } from "@/lib/trpc-server";
import { EmailVerificationHandler } from "./email-verification-handler";

export default async function Home() {
  // This will run on the server, using the user's auth
  const healthCheck = await serverTrpc.healthCheck.query();

  return (
    <div className="container mx-auto pt-16">
      <EmailVerificationHandler />
      <Card>
        <CardHeader>
          <CardTitle>Hello, {healthCheck.user?.name ?? "Guest"}</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-muted-foreground text-sm">
            {JSON.stringify(healthCheck, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

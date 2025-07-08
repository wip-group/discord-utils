import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

export default async function XPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="container mx-auto pt-16">
      <Card>
        <CardHeader>
          <CardTitle>This is a test page for the slug: {slug}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            The route was automaticaly rewritten using the middleware.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

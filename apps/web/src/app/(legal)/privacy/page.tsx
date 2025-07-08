import { env } from "@/env";

export default function Privacy() {
  return (
    <div className="prose dark:prose-invert container mx-auto max-w-3xl px-4 py-12">
      <h1>{env.NEXT_PUBLIC_PROJECT_NAME} – Alpha Privacy Policy</h1>
      <p>
        <strong>Effective Date: 25th May 2025</strong>
      </p>

      <p>
        At {env.NEXT_PUBLIC_PROJECT_NAME}, we take your privacy seriously — even
        in alpha. This policy outlines how we handle your data.
      </p>

      <h2>1. What We Collect</h2>
      <p>During alpha, we may collect:</p>
      <ul>
        <li>Email addresses (for login or updates)</li>
        <li>Server IDs and names</li>
        <li>Usage data (to help us improve the product)</li>
      </ul>

      <h2>2. How We Use It</h2>
      <p>We only use your data to:</p>
      <ul>
        <li>Provide and improve {env.NEXT_PUBLIC_PROJECT_NAME}</li>
        <li>Analyze usage to identify bugs and missing features</li>
        <li>Contact you with important updates or feedback requests</li>
      </ul>

      <h2>3. Who We Share It With</h2>
      <p>
        We don’t sell your data. We may use third-party services (e.g.,
        analytics, hosting) that process data on our behalf under secure
        agreements.
      </p>

      <h2>4. Data Storage</h2>
      <p>
        We store your data securely and limit access to authorized team members.
        If you want your data deleted, just reach out — we’ll handle it quickly.
      </p>

      <h2>5. Changes to This Policy</h2>
      <p>
        As we grow, this policy may evolve. We’ll notify you of any significant
        changes.
      </p>
    </div>
  );
}

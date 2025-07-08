import { env } from "@/env";

export default function Terms() {
  return (
    <div className="prose dark:prose-invert container mx-auto max-w-3xl px-4 py-12">
      <h1>{env.NEXT_PUBLIC_PROJECT_NAME} – Alpha Terms of Service</h1>
      <p>
        <strong>Effective Date: 25th May 2025</strong>
      </p>

      <p>
        Welcome to the alpha version of{" "}
        <strong>{env.NEXT_PUBLIC_PROJECT_NAME}</strong>. By accessing or using
        this early version of the platform, you agree to the following terms:
      </p>

      <h2>1. Alpha Use Disclaimer</h2>
      <p>
        This is a <strong>work in progress</strong>. Features may be incomplete,
        change without notice, or not function as expected. By participating in
        the alpha, you understand that:
      </p>
      <ul>
        <li>You may encounter bugs or downtime.</li>
        <li>Content may be changed or removed during development.</li>
        <li>Access may be revoked at any time.</li>
      </ul>

      <h2>2. Ownership and Content</h2>
      <p>
        All platform code, design, and features are owned by the creators of
        {env.NEXT_PUBLIC_PROJECT_NAME}.
        <br />
        You retain ownership of any content you create or upload, but you grant
        us a license to use it internally to improve the platform.
      </p>

      <h2>3. Feedback</h2>
      <p>
        We love your feedback! If you provide suggestions or bug reports, you
        agree we can use them freely to improve {env.NEXT_PUBLIC_PROJECT_NAME}{" "}
        without compensation or obligation.
      </p>

      <h2>4. Use at Your Own Risk</h2>
      <p>
        {env.NEXT_PUBLIC_PROJECT_NAME} is provided "as is" during the alpha
        phase. We're not liable for any loss, damage, or issues arising from
        your use of the platform.
      </p>

      <h2>5. Changes</h2>
      <p>
        These terms may be updated at any time. We'll do our best to notify you,
        but it's your responsibility to stay informed.
      </p>
    </div>
  );
}

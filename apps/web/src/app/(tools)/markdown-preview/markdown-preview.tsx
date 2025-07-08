"use client";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { Textarea } from "@repo/ui/components/textarea";
import { Copy, FileText, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const exampleTexts = {
  basic: `**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
__Underline__

> This is a blockquote
> It can span multiple lines

||This is a spoiler||`,
  lists: `**Unordered List:**
- First item
- Second item
  - Nested item
  - Another nested
- Third item

**Ordered List:**
1. First step
2. Second step
3. Third step`,
  code: `\`Inline code\` in a sentence

\`\`\`js
// Code block with syntax highlighting
function hello() {
  console.log("Hello, Discord!");
}
\`\`\`

\`\`\`python
# Python example
def greet(name):
    return f"Hello, {name}!"
\`\`\``,
  links: `[Click here for Discord](https://discord.com)
<https://discord.com> - Auto link
[Masked link](<https://discord.com>)

**Mentions:**
@username (user mention)
@everyone (everyone mention)
#channel (channel mention)
@role (role mention)`,
  advanced: `# Heading 1
## Heading 2
### Heading 3

**Timestamps:**
<t:1234567890> - Default
<t:1234567890:R> - Relative

**Custom Emojis:**
:emoji_name: - Custom emoji
<:custom:123456789> - Custom emoji with ID
<a:animated:123456789> - Animated emoji`,
};

export function MarkdownPreview() {
  const [text, setText] = useState(exampleTexts.basic);
  const [activeTab, setActiveTab] = useState("preview");

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard!");
  };

  const loadExample = (example: keyof typeof exampleTexts) => {
    setText(exampleTexts[example]);
    toast.success("Example loaded!");
  };

  const renderMarkdown = (content: string) => {
    // Basic HTML escaping for security
    let html = content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    // Headers
    html = html.replace(
      /^### (.+)$/gm,
      '<h3 class="text-lg font-semibold mb-2">$1</h3>',
    );
    html = html.replace(
      /^## (.+)$/gm,
      '<h2 class="text-xl font-semibold mb-2">$1</h2>',
    );
    html = html.replace(
      /^# (.+)$/gm,
      '<h1 class="text-2xl font-bold mb-3">$1</h1>',
    );

    // Bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/__(.+?)__/g, "<u>$1</u>");
    html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");

    // Spoilers
    html = html.replace(
      /\|\|(.+?)\|\|/g,
      '<span class="bg-gray-800 text-gray-800 hover:text-gray-200 transition-colors cursor-pointer px-1 rounded">$1</span>',
    );

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]+?)```/g, (_match, _lang, code) => {
      return `<pre class="bg-gray-900 p-3 rounded-md overflow-x-auto my-2"><code class="text-sm">${code.trim()}</code></pre>`;
    });

    // Inline code
    html = html.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>',
    );

    // Blockquotes
    html = html.replace(
      /^> (.+)$/gm,
      '<blockquote class="border-l-4 border-gray-600 pl-3 my-2 text-gray-300">$1</blockquote>',
    );

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-400 hover:underline" target="_blank">$1</a>',
    );
    html = html.replace(
      /&lt;(https?:\/\/[^\s&]+)&gt;/g,
      '<a href="$1" class="text-blue-400 hover:underline" target="_blank">$1</a>',
    );

    // Mentions
    html = html.replace(
      /@(\w+)/g,
      '<span class="text-blue-400 bg-blue-400/20 px-1 rounded cursor-pointer hover:bg-blue-400/30">@$1</span>',
    );
    html = html.replace(
      /#(\w+)/g,
      '<span class="text-blue-400 bg-blue-400/20 px-1 rounded cursor-pointer hover:bg-blue-400/30">#$1</span>',
    );

    // Lists
    html = html.replace(/^- (.+)$/gm, '<li class="ml-4">• $1</li>');
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4">$1</li>');
    html = html.replace(/^ {2}- (.+)$/gm, '<li class="ml-8">◦ $1</li>');

    // Line breaks
    html = html.replace(/\n/g, "<br>");

    return html;
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Markdown Editor
          </CardTitle>
          <CardDescription>
            Type or paste your Discord markdown text here
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => loadExample("basic")}
              size="sm"
              variant="outline"
            >
              Basic
            </Button>
            <Button
              onClick={() => loadExample("lists")}
              size="sm"
              variant="outline"
            >
              Lists
            </Button>
            <Button
              onClick={() => loadExample("code")}
              size="sm"
              variant="outline"
            >
              Code
            </Button>
            <Button
              onClick={() => loadExample("links")}
              size="sm"
              variant="outline"
            >
              Links
            </Button>
            <Button
              onClick={() => loadExample("advanced")}
              size="sm"
              variant="outline"
            >
              Advanced
            </Button>
          </div>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your Discord message here..."
            className="min-h-[400px] font-mono text-sm"
          />

          <Button onClick={copyText} className="w-full">
            <Copy className="mr-2 h-4 w-4" />
            Copy Text
          </Button>
        </CardContent>
      </Card>

      {/* Preview & Reference */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              This is how your text will appear in Discord
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-[#36393f] p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-500" />
                <div className="flex-1">
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="font-medium text-white">Username</span>
                    <span className="text-[#72767d] text-xs">
                      Today at{" "}
                      {new Date().toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                  <div
                    className="text-[#dcddde]"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for markdown preview functionality with proper escaping
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Markdown Reference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Quick Reference</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-4 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <code className="text-muted-foreground">**text**</code>
                    <span className="font-bold">Bold</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-muted-foreground">*text*</code>
                    <span className="italic">Italic</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-muted-foreground">~~text~~</code>
                    <span className="line-through">Strikethrough</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-muted-foreground">__text__</code>
                    <span className="underline">Underline</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-muted-foreground">||text||</code>
                    <span>Spoiler</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-muted-foreground">`code`</code>
                    <code className="rounded bg-muted px-1">code</code>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-muted-foreground">&gt; quote</code>
                    <span>Blockquote</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="mt-4 space-y-3">
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="mb-1 font-medium">Code Blocks</p>
                    <code className="block rounded bg-muted p-2 text-xs">
                      {`\`\`\`js
console.log("Hello");
\`\`\``}
                    </code>
                  </div>
                  <div>
                    <p className="mb-1 font-medium">Links</p>
                    <code className="text-muted-foreground text-xs">
                      [text](https://url.com)
                    </code>
                  </div>
                  <div>
                    <p className="mb-1 font-medium">Headers</p>
                    <code className="text-muted-foreground text-xs">
                      # H1, ## H2, ### H3
                    </code>
                  </div>
                  <div>
                    <p className="mb-1 font-medium">Lists</p>
                    <code className="text-muted-foreground text-xs">
                      - Item or 1. Item
                    </code>
                  </div>
                  <div>
                    <p className="mb-1 font-medium">Mentions</p>
                    <code className="text-muted-foreground text-xs">
                      @user #channel @role
                    </code>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

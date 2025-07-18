import { useEffect } from "react";
import { useAnalytics } from "@/lib/analytics";

export function useToolTracking(toolName: string) {
  const { trackToolUse } = useAnalytics();

  const trackUsage = () => {
    trackToolUse(toolName);
  };

  // Track page view as well when component mounts
  useEffect(() => {
    // Optional: track tool page view
    // This could be useful to see which tools users visit vs actually use
  }, [toolName]);

  return { trackUsage };
}
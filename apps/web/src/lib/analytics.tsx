"use client";

import Plausible from "plausible-tracker";
import { createContext, useContext, useEffect, useState } from "react";

interface PlausibleTracker {
  trackEvent: (eventName: string, props?: Record<string, string | number | boolean>) => void;
  trackToolUse: (toolName: string) => void;
}

const AnalyticsContext = createContext<PlausibleTracker | null>(null);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [plausible, setPlausible] = useState<ReturnType<typeof Plausible> | null>(null);

  useEffect(() => {
    const tracker = Plausible({
      domain: "discordutils.com",
      apiHost: "https://plausible.wip.group",
    });

    tracker.enableAutoPageviews();
    setPlausible(tracker);
  }, []);

  const trackEvent = (eventName: string, props?: Record<string, string | number | boolean>) => {
    if (plausible) {
      plausible.trackEvent(eventName, { props });
    }
  };

  const trackToolUse = (toolName: string) => {
    if (plausible) {
      // Track as a custom event with the tool name as a property
      // This allows Plausible to show which tools are used and how many times
      plausible.trackEvent("tool_used", { 
        props: { 
          tool: toolName 
        } 
      });
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent, trackToolUse }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}
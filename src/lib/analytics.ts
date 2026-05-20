"use client";

import { sendGAEvent } from "@next/third-parties/google";
import posthog from "posthog-js";

function getPostHog() {
  if (!posthog.__loaded) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "always",
      capture_pageview: true,
    });
  }
  return posthog;
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  sendGAEvent("event", eventName, params ?? {});
  getPostHog().capture(eventName, params);
}

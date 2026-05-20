"use client";

import { sendGAEvent } from "@next/third-parties/google";
import posthog from "posthog-js";

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  sendGAEvent("event", eventName, params ?? {});
  posthog.capture(eventName, params);
}

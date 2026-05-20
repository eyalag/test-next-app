import { trace, SpanStatusCode } from "@opentelemetry/api";
import { getPostHogServer } from "./posthog-server";

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID ?? "G-ZPSVR0RFS6";
const GA_API_SECRET = process.env.GA_API_SECRET ?? "";

const tracer = trace.getTracer("analytics-server");

export async function trackServerEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  return tracer.startActiveSpan(`analytics.track ${eventName}`, async (span) => {
    span.setAttribute("analytics.event_name", eventName);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        span.setAttribute(`analytics.param.${key}`, value);
      }
    }
    try {
      const gaPromise = trackGA(eventName, params);
      const phPromise = trackPostHog(eventName, params);
      await Promise.all([gaPromise, phPromise]);
    } catch (err) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: String(err) });
      throw err;
    } finally {
      span.end();
    }
  });
}

async function trackGA(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  return tracer.startActiveSpan("analytics.ga", async (span) => {
    if (!GA_API_SECRET) {
      span.setAttribute("analytics.skipped", true);
      span.end();
      return;
    }

    try {
      const res = await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: "server",
            events: [{ name: eventName, params }],
          }),
        },
      );
      span.setAttribute("http.status_code", res.status);
      if (!res.ok) {
        span.setStatus({ code: SpanStatusCode.ERROR, message: `${res.status} ${res.statusText}` });
      }
    } catch (err) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: String(err) });
    } finally {
      span.end();
    }
  });
}

async function trackPostHog(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  return tracer.startActiveSpan("analytics.posthog", async (span) => {
    try {
      const posthog = getPostHogServer();
      posthog.capture({ distinctId: "server", event: eventName, properties: params });
      await posthog.shutdown();
    } catch (err) {
      span.setStatus({ code: SpanStatusCode.ERROR, message: String(err) });
    } finally {
      span.end();
    }
  });
}

import { registerOTel } from "@vercel/otel";
import { BatchLogRecordProcessor, LoggerProvider } from "@opentelemetry/sdk-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { logs } from "@opentelemetry/api-logs";
import { resourceFromAttributes } from "@opentelemetry/resources";

export const loggerProvider = new LoggerProvider({
  resource: resourceFromAttributes({ "service.name": "test-next-app" }),
  processors: [
    new BatchLogRecordProcessor(
      new OTLPLogExporter({
        url: "https://us.i.posthog.com/i/v1/logs",
        headers: {
          Authorization: `Bearer ${process.env.POSTHOG_KEY}`,
          "Content-Type": "application/json",
        },
      }),
    ),
  ],
});

export function register() {
  registerOTel({
    serviceName: "test-next-app",
  });

  if (process.env.NEXT_RUNTIME === "nodejs") {
    logs.setGlobalLoggerProvider(loggerProvider);
  }
}

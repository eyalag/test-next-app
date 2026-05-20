"use server";

import { SeverityNumber } from "@opentelemetry/api-logs";
import { after } from "next/server";
import { loggerProvider } from "@/instrumentation";
import { getLogTag } from "@/lib/log-tag";
import { trackServerEvent } from "@/lib/analytics-server";

const logger = loggerProvider.getLogger("test-next-app");

export async function logOnServer() {
  console.log(123123);
  const tag = getLogTag();

  logger.emit({
    body: `111225 Server action triggered`,
    severityNumber: SeverityNumber.INFO,
    attributes: {
      tag,
      action: "logOnServer",
    },
  });

  console.log(`[console][server][${tag}] Server action triggered`);
  await trackServerEvent("server_log_222", { tag });

  after(async () => {
    await loggerProvider.forceFlush();
  });

  return tag;
}

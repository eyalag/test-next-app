"use server";

import { getLogTag } from "@/lib/log-tag";
import { trackServerEvent } from "@/lib/analytics-server";

export async function logOnServer() {
  const tag = getLogTag();
  console.log(`[console][server][${tag}] Server action triggered`);
  await trackServerEvent("server_log_22", { tag });
  return tag;
}

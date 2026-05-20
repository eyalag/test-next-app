"use server";

import { getLogTag } from "@/lib/log-tag";

export async function logOnServer() {
  const tag = getLogTag();
  console.log(`[console][server][${tag}] Server action triggered`);
  return tag;
}

"use server";

export async function logOnServer() {
  const rand = Math.floor(Math.random() * 900 + 100);
  console.log(`[console][server][${rand}] Server action triggered`);
}

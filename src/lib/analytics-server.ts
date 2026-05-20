const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID ?? "G-ZPSVR0RFS6";
const GA_API_SECRET = process.env.GA_API_SECRET ?? "";

export async function trackServerEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (!GA_API_SECRET) {
    console.warn("[analytics] GA_API_SECRET not set, skipping server event");
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
    if (!res.ok) {
      console.error(`[analytics] GA server event failed: ${res.status} ${res.statusText}`);
    }
  } catch (err) {
    console.error("[analytics] GA server event error:", err);
  }
}

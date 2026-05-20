const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID ?? "G-ZPSVR0RFS6";
const GA_API_SECRET = process.env.GA_API_SECRET ?? "G-ZPSVR0RFS6";

export async function trackServerEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (!GA_API_SECRET) {
    console.warn("[analytics] GA_API_SECRET not set, skipping server event");
    return;
  }

  await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: "server",
        events: [{ name: eventName, params }],
      }),
    },
  );
}

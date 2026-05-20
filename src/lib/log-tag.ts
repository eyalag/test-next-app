export function getLogTag(): string {
  const now = new Date();
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const ms = String(now.getMilliseconds()).padStart(3, "0").slice(0, 2);
  return `${mm}-${ss}-${ms}`;
}

export function safeParse(json, fallback = null) {
  try {
    if (!json || json === "undefined") return fallback;
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}
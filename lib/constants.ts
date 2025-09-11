export const BASE_URL = 
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_BASE_URL) ||
  "https://voice-be.subhadeep.xyz";

export const WEBSOCKET_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_WEBSOCKET_URL) ||
  "wss://websocket-hub.onrender.com";

export const CALL_AGENT_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_CALL_AGENT_URL) ||
  "https://54.91.122.177";

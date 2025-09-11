"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WEBSOCKET_URL } from "@/lib/constants";

export type ConversationTurn = {
  role: "user" | "assistant";
  content: string;
};

export type CallResultMessage = {
  id: string;
  status: string;
  conversation?: ConversationTurn[];
  customer_interested?: boolean;
};

type OutgoingMessage =
  | { action: "make-call"; payload: { phone_number: string; custom_instructions?: string } }
  | { action: "get-status"; payload: { id: string } }
  | { action: "delete-call"; payload: { id: string } };

type UseWebSocketReturn = {
  isConnected: boolean;
  lastMessage?: CallResultMessage;
  liveStatus?: string;
  transcript: ConversationTurn[];
  send: (msg: OutgoingMessage) => void;
  resetTranscript: () => void;
};

export function useWebSocket(): UseWebSocketReturn {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<CallResultMessage | undefined>();
  const [liveStatus, setLiveStatus] = useState<string | undefined>();
  const [transcript, setTranscript] = useState<ConversationTurn[]>([]);

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(WEBSOCKET_URL);
      socketRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string) as CallResultMessage | { id?: string; status?: string; conversation?: ConversationTurn[] };
          if (data && typeof (data as any).status === "string") {
            setLiveStatus((data as any).status);
          }
          if ((data as CallResultMessage)?.conversation) {
            setTranscript((data as CallResultMessage).conversation || []);
          }
          setLastMessage(data as CallResultMessage);
        } catch {
          // ignore malformed payloads
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        const attempt = reconnectAttemptsRef.current++;
        const backoffMs = Math.min(1000 * 2 ** attempt, 10000);
        setTimeout(() => {
          connect();
        }, backoffMs);
      };

      ws.onerror = () => {
        // allow onclose to trigger reconnect
      };
    } catch {
      // swallow connect exceptions; will retry on next tick
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      const ws = socketRef.current;
      if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
        try {
          ws.close();
        } catch {}
      }
      socketRef.current = null;
    };
  }, [connect]);

  const send = useCallback((msg: OutgoingMessage) => {
    const ws = socketRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify(msg));
      } catch {}
    }
  }, []);

  const resetTranscript = useCallback(() => setTranscript([]), []);

  return { isConnected, lastMessage, liveStatus, transcript, send, resetTranscript };
}



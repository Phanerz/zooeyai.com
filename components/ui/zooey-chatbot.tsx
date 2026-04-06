"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ZooeyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey! I'm Zooey 👾 I live on your screen and help you get stuff done. What can I help you with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Add empty assistant message to stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Hmm, something went wrong. Try again?",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 right-4 z-50 flex w-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl md:bottom-36 md:right-16"
            style={{
              background: "rgba(7, 11, 7, 0.92)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(74,222,128,0.12), 0 0 40px rgba(74,222,128,0.06)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-green-400/20 bg-green-400/10">
                <Image src="/zooey-icon.png" alt="Zooey" width={28} height={28} className="h-auto w-full object-contain" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Zooey</p>
                <p className="text-[11px] text-green-400/70">Always on. Always ready.</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ maxHeight: "320px" }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-green-400/20 text-white rounded-br-sm"
                        : "bg-white/[0.07] text-white/85 rounded-bl-sm"
                    }`}
                  >
                    {msg.content || (
                      <span className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/[0.07] px-3 py-3">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Zooey anything…"
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2 text-sm text-white placeholder-white/30 outline-none transition focus:border-green-400/40 focus:bg-white/[0.09] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-green-400/20 text-green-300 transition hover:bg-green-400/30 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating icon button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-20 cursor-pointer transition-transform hover:scale-105 active:scale-95 md:bottom-0 md:right-16 md:w-32"
        aria-label="Open Zooey chat"
      >
        <Image
          src="/zooey-icon.png"
          alt="Zooey"
          width={144}
          height={144}
          className="h-auto w-full animate-float object-contain drop-shadow-[0_0_22px_rgba(74,222,128,0.35)]"
        />
      </button>
    </>
  );
}

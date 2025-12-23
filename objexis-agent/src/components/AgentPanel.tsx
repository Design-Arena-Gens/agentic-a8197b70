'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./AgentPanel.module.css";
import { Loader2, Sparkles, SendHorizontal, MessageCircle } from "lucide-react";

type Role = "user" | "assistant";

type Source = {
  title: string;
  excerpt: string;
};

type Message = {
  id: string;
  role: Role;
  content: string;
  sources?: Source[];
  createdAt: number;
};

type AgentResponse = {
  reply: string;
  sources?: Source[];
};

const starterPrompts = [
  "Propose a limited-run hypercar for our NovaLux collection.",
  "Outline a 3D-print ready chassis and wheel system brief.",
  "Build a narrative for the Luminae street racing universe.",
];

const initialWelcome: Message = {
  id: "intro",
  role: "assistant",
  content:
    "I'm the Objexis design intelligence. Ask me to craft new vehicles, outline 3D print strategies, or expand our future automotive universe.",
  createdAt: Date.now(),
};

export function AgentPanel() {
  const [messages, setMessages] = useState<Message[]>([initialWelcome]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (value?: string) => {
    const submission = (value ?? input).trim();
    if (!submission || status === "sending") {
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: submission,
      createdAt: Date.now(),
    };

    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput("");
    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: submission,
          history: conversation.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Agent is unavailable. Please retry in a few moments.");
      }

      const data: AgentResponse = await response.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        sources: data.sources,
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className={styles.panel} id="agent">
      <div className={styles.header}>
        <div className={styles.badge}>
          <Sparkles width={16} height={16} />
          <span>Objexis AI Studio Agent</span>
        </div>
        <h3>Design intelligence for original, future-forward toy vehicles.</h3>
        <p>
          Generate collectible concepts, futurist narratives, structural briefs, or print strategies.
          The agent blends our design philosophy with your prompts to create precise, buildable ideas.
        </p>
        <div className={styles.promptList}>
          {starterPrompts.map((prompt) => (
            <button
              key={prompt}
              className={styles.prompt}
              onClick={() => sendMessage(prompt)}
              type="button"
            >
              <MessageCircle width={16} height={16} />
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div ref={logRef} className={styles.log} aria-live="polite">
        {messages.map((message) => (
          <div key={message.id} className={styles.message} data-role={message.role}>
            <div className={styles.avatar} data-role={message.role}>
              {message.role === "assistant" ? <Sparkles width={16} height={16} /> : "You"}
            </div>
            <div className={styles.bubble}>
              <p>{message.content}</p>
              {message.sources && (
                <div className={styles.sources}>
                  <span>Referencing</span>
                  <ul>
                    {message.sources.map((source, index) => (
                      <li key={`${message.id}-source-${index}`}>
                        <strong>{source.title}</strong>
                        <span>{source.excerpt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form
        className={styles.composer}
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <div className={styles.inputShell}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Describe a vehicle vision, collection theme, or engineering challenge..."
            maxLength={600}
            aria-label="Send a message to the Objexis design agent"
          />
          <button
            type="submit"
            className={styles.send}
            disabled={status === "sending" || input.trim().length === 0}
          >
            {status === "sending" ? <Loader2 className={styles.loader} /> : <SendHorizontal />}
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

export default AgentPanel;

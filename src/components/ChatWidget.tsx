import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ChevronDown, MessageCircle, Send, X } from "lucide-react";
import favicon from "../assets/fav-icon-update.png";
import { requestAssistantReply } from "../lib/chatAssistant";
import type { ChatMessage } from "../lib/chatKnowledge";
import styles from "./ChatWidget.module.css";

type UiMsg = {
  id: string;
  role: "bot" | "user";
  text: string;
};

function toApiMessages(msgs: UiMsg[]): ChatMessage[] {
  return msgs.map((m) => ({
    role: m.role === "bot" ? "assistant" : "user",
    content: m.text,
  }));
}

function renderText(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {line}
    </span>
  ));
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<UiMsg[]>([
    { id: "welcome", role: "bot", text: "Hi! How can I help you?" },
  ]);
  const [showTip, setShowTip] = useState(false);
  const [showJump, setShowJump] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setShowTip(true), 2200);
    const hide = window.setTimeout(() => setShowTip(false), 8000);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    focusInput();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open || busy) return;
    focusInput();
  }, [open, busy]);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open, busy]);

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowJump(distance > 72);
  };

  const jumpToLatest = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    setShowJump(false);
  };

  const handleSend = async (e?: FormEvent) => {
    e?.preventDefault();
    const text = message.trim();
    if (!text || busy) return;

    const userMsg: UiMsg = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
    };
    const next = [...messages, userMsg];
    setMessages(next);
    setMessage("");
    setBusy(true);
    focusInput();

    try {
      const reply = await requestAssistantReply(toApiMessages(next));
      setMessages((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, role: "bot", text: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: "bot",
          text: "I hit a snag answering that. Please try again, or reach us via the Contact page.",
        },
      ]);
    } finally {
      setBusy(false);
      focusInput();
    }
  };

  return (
    <div className={styles.root}>
      {open && (
        <div
          className={styles.panel}
          role="dialog"
          aria-label="Chat with QUORIXA"
        >
          <div className={styles.header}>
            <div className={styles.brand}>
              <span className={styles.logoMark} aria-hidden>
                <img src={favicon} alt="" className={styles.brandIcon} />
              </span>
              <div>
                <strong>QUORIXA Assistant</strong>
                <span className={styles.status}>Typically replies instantly</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className={styles.close}
            >
              <X size={18} />
            </button>
          </div>

          <div className={styles.bodyWrap}>
            <div className={styles.body} ref={listRef} onScroll={onScroll}>
              {messages.map((msg) =>
                msg.role === "bot" ? (
                  <div key={msg.id} className={styles.botRow}>
                    <span className={styles.avatar} aria-hidden>
                      <img src={favicon} alt="" className={styles.brandIcon} />
                    </span>
                    <div className={styles.bubble}>{renderText(msg.text)}</div>
                  </div>
                ) : (
                  <div key={msg.id} className={styles.bubbleUser}>
                    {renderText(msg.text)}
                  </div>
                ),
              )}
              {busy && (
                <div className={styles.botRow}>
                  <span className={styles.avatar} aria-hidden>
                    <img src={favicon} alt="" className={styles.brandIcon} />
                  </span>
                  <div className={`${styles.bubble} ${styles.typing}`}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {showJump && (
              <button
                type="button"
                className={styles.jump}
                onClick={jumpToLatest}
                aria-label="Scroll to latest message"
              >
                <ChevronDown size={18} />
              </button>
            )}
          </div>

          <form className={styles.form} onSubmit={handleSend}>
            <div className={styles.inputRow}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-label="Message"
                readOnly={busy}
                autoComplete="off"
              />
              <button
                type="submit"
                className={styles.send}
                disabled={!message.trim() || busy}
                aria-label="Send message"
              >
                <Send size={16} strokeWidth={2.2} />
              </button>
            </div>
            <p className={styles.hint}>Press enter to send</p>
          </form>
        </div>
      )}

      {!open && showTip && (
        <div className={styles.tooltip} role="status">
          Hi! How can I help you?
        </div>
      )}

      <button
        type="button"
        className={styles.fab}
        onClick={() => {
          setOpen((v) => !v);
          setShowTip(false);
        }}
        onMouseEnter={() => !open && setShowTip(true)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}

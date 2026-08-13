import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import styles from "./ChatWidget.module.css";

type Msg = { role: "bot" | "user"; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi! How can I help you?" },
  ]);
  const [showTip, setShowTip] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      {
        role: "bot",
        text: "Thanks — a QUORIXA specialist will follow up shortly. You can also book a consultation on our Contact page.",
      },
    ]);
    setMessage("");
  };

  return (
    <div className={styles.root}>
      {open && (
        <div className={styles.panel} role="dialog" aria-label="Chat with QUORIXA">
          <div className={styles.header}>
            <div className={styles.brand}>
              <span className={styles.logoMark}>Q</span>
              <div>
                <strong>QUORIXA</strong>
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

          <div className={styles.body} ref={listRef}>
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={msg.role === "bot" ? styles.bubble : styles.bubbleUser}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form className={styles.form} onSubmit={handleSend}>
            <textarea
              placeholder="Type here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Message"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />
            <button
              type="submit"
              className={styles.send}
              disabled={!message.trim()}
            >
              Send
            </button>
          </form>
          <p className={styles.powered}>Chat with QUORIXA</p>
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

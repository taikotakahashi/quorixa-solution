import type { ClientLogo } from "../data/content";

type Props = {
  id: string;
  className?: string;
};

/** Monochrome brand mark approximations for the client marquee */
export function ClientBrandIcon({ id, className }: Props) {
  switch (id) {
    case "shutterstock":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 16V8h2.2c1.7 0 2.8.9 2.8 2.3 0 1-.5 1.8-1.4 2.1L14.8 16h-2.4l-2.4-3.4H10V16H8zm2-5.3h.9c.7 0 1.1-.3 1.1-.9s-.4-.9-1.1-.9H10v1.8z"
            fill="currentColor"
          />
        </svg>
      );
    case "asana":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="7.2" r="3.1" fill="currentColor" />
          <circle cx="7.1" cy="15.8" r="3.1" fill="currentColor" />
          <circle cx="16.9" cy="15.8" r="3.1" fill="currentColor" />
        </svg>
      );
    case "delivery-hero":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M4 14.5c4.2-1.2 6.8-4.2 8.2-8.8.4 3.4 1.8 6 4.4 8.1-3.1.1-5.5 1.1-7.2 3.7-.4-1.4-1.4-2.4-3-3.1-1.1-.4-1.9-.1-2.4.1z"
            fill="currentColor"
          />
          <path
            d="M14.2 6.2c.6 1.9 1.8 3.4 3.6 4.5-.2-2.1.2-3.8 1.7-5.5-2 .2-3.6.4-5.3 1z"
            fill="currentColor"
          />
        </svg>
      );
    case "netapp":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            d="M5 5h8.5v4.2H9.8V19H5V5zm14 0v14h-4.2V9.2H19V5z"
            fill="currentColor"
          />
        </svg>
      );
    case "instacart":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3.2" fill="currentColor" />
        </svg>
      );
    case "bloomberg":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <rect x="4" y="5" width="4.2" height="14" rx="0.6" fill="currentColor" />
          <rect x="10" y="9" width="4.2" height="10" rx="0.6" fill="currentColor" />
          <rect x="16" y="12" width="4.2" height="7" rx="0.6" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export function getLogoClass(client: ClientLogo) {
  if (client.style === "uppercase") return "uppercase";
  if (client.style === "italic") return "italic";
  return "normal";
}

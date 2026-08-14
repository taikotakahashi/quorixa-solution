/** Brand mark SVGs for the AI Studio tech stack grid. */

type IconProps = { className?: string; title?: string };

const base = {
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
};

export function LogoOpenAI({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="22" height="22" viewBox="0 0 24 24">
        <path
          fill="#0D0D0D"
          d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.774-4.28 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.098zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L3.54 13.76a4.504 4.504 0 0 1-1.2-5.863zM18.74 11.35l-5.834-3.37 2.018-1.167a.076.076 0 0 1 .072 0l4.782 2.758a4.5 4.5 0 0 1-.678 8.1v-5.586a.743.743 0 0 0-.36-.636zm.826-3.03l-.142-.085-4.782-2.762a.776.776 0 0 0-.785 0L8.012 8.812V6.48a.066.066 0 0 1 .028-.061l4.83-2.786a4.5 4.5 0 0 1 6.696 4.687zM8.697 13.683l-2.02-1.163a.08.08 0 0 1-.038-.056V6.875a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.697 6.26a.782.782 0 0 0-.392.681zm1.097-2.365L12 9.94l2.207 1.275v2.553L12 14.97l-2.207-1.275z"
        />
      </svg>
      <span>OpenAI</span>
    </span>
  );
}

export function LogoMistral({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="28" height="22" viewBox="0 0 32 24">
        <path fill="#F7D046" d="M2 20h4V4H2z" />
        <path fill="#F2A73B" d="M8 20h4v-8H8z" />
        <path fill="#EE792F" d="M14 20h4V8h-4z" />
        <path fill="#EB5829" d="M20 20h4v-8h-4z" />
        <path fill="#EA3326" d="M26 20h4V4h-4z" />
      </svg>
    </span>
  );
}

export function LogoTensorFlow({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="24" height="24" viewBox="0 0 24 24">
        <path fill="#FF6F00" d="M1.5 7.5 12 2l10.5 5.5v3L12 5.5 1.5 10.5z" />
        <path fill="#FFA800" d="M12 5.5v16l-3.5-2V10L12 8z" />
        <path fill="#FF6F00" d="M12 8v13.5l3.5-2V13L20 15.5v-3.5L15.5 10 12 8z" />
      </svg>
    </span>
  );
}

export function LogoBigQuery({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M12 2 3.5 6.5v11L12 22l8.5-4.5v-11L12 2zm0 2.3 6.2 3.3v1.8L12 13.1 5.8 9.4V7.6L12 4.3zM5.8 11.2l5.2 3.1v5.2l-5.2-2.8v-5.5zm7.2 8.3v-5.2l5.2-3.1v5.5l-5.2 2.8z"
        />
        <circle cx="12" cy="9.2" r="1.6" fill="#fff" />
      </svg>
    </span>
  );
}

export function LogoMeta({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="28" height="20" viewBox="0 0 36 24">
        <path
          fill="#0866FF"
          d="M7.2 6.5c1.9-2.6 4-4 6-4 3.2 0 4.6 2.2 6.4 5.6 1.4 2.6 2.4 4.8 3.4 4.8s2.4-1.4 3.8-3.6C29.2 5.5 30.8 3 33.6 3c1.6 0 3.2 1.1 4.4 3.2L35.4 8c-.8-1.3-1.5-2-2.2-2-1.4 0-2.4 1.5-3.6 3.6-1.6 2.8-3.2 5.6-6.2 5.6-3 0-4.4-2.2-6.2-5.6C15.6 6.4 14.4 4.5 12.8 4.5c-1.3 0-2.6 1.2-4 3.2C7.2 10.4 5.4 14 2.8 14 1.5 14 .4 13.1 0 11.5l2.2-.7c.2.7.5 1.1 1 1.1 1.1 0 2.5-2.2 4-5.4z"
        />
      </svg>
      <span>Meta</span>
    </span>
  );
}

export function LogoGoogleCloud({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="28" height="22" viewBox="0 0 32 24">
        <path fill="#4285F4" d="M24.5 18.5a6 6 0 0 0-1.2-11.8A7.5 7.5 0 0 0 9.2 8.2 5.5 5.5 0 0 0 8 19h16.2a.3.3 0 0 0 .3-.5z" />
        <path fill="#EA4335" d="M8 19a5.5 5.5 0 0 1 1.2-10.8" />
        <path fill="#FBBC04" d="M14.5 6.5a7.5 7.5 0 0 1 6.5 3.6" />
        <path fill="#34A853" d="M23.3 6.7a6 6 0 0 1 1.2 11.8" />
      </svg>
    </span>
  );
}

export function LogoLangChain({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="72" height="24" viewBox="0 0 72 24">
        <rect width="72" height="24" rx="12" fill="#1C3C3C" />
        <circle cx="14" cy="12" r="6" fill="#fff" />
        <circle cx="12" cy="10.5" r="1.2" fill="#1C3C3C" />
        <circle cx="16" cy="10.5" r="1.2" fill="#1C3C3C" />
        <path
          d="M11.5 13.5c.8 1.2 2.2 1.2 3 0"
          stroke="#1C3C3C"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M42 8.5h3.2c1.8 0 3 1 3 2.6 0 1.1-.6 2-1.6 2.4l2 3.5h-2.4l-1.7-3.1H44V17h-2V8.5zm2 4.2h1.1c.7 0 1.2-.3 1.2-1s-.5-1-1.2-1H44v2zM52.2 17l-3.4-8.5h2.3l2.2 5.8 2.2-5.8h2.2L54.4 17h-2.2zM60 8.5h5.8v1.8H62v1.6h3.3v1.7H62V17h-2V8.5z"
          fill="#fff"
        />
        <path
          d="M28 9.2h2.2l1.4 4.2 1.4-4.2H35l-2.4 7.8h-2.3L28 9.2z"
          fill="#fff"
        />
      </svg>
    </span>
  );
}

export function LogoDatabricks({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="26" height="22" viewBox="0 0 28 24">
        <path fill="#FF3621" d="M14 2 4 8v4l10-6 10 6V8L14 2z" />
        <path fill="#FF3621" d="M14 10 4 16v4l10-6 10 6v-4l-10-6z" />
        <path fill="#FF9E8A" d="M14 10v4l10 6v-4l-10-6z" />
      </svg>
    </span>
  );
}

export function LogoAzure({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="24" height="24" viewBox="0 0 24 24">
        <path fill="#0089D6" d="M13.05 4.15 6.5 19.85h5.1l1.9-4.55h6.55L13.05 4.15zm1.35 8.55-1.95-4.7-3.55 8.5h3.05l2.45-3.8z" />
      </svg>
    </span>
  );
}

export function LogoXGBoost({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="70" height="24" viewBox="0 0 70 24">
        <text
          x="0"
          y="8"
          fill="#333"
          fontSize="7"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          dmlc
        </text>
        <text
          x="0"
          y="20"
          fill="#1a73e8"
          fontSize="13"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
          fontStyle="italic"
        >
          XGBoost
        </text>
      </svg>
    </span>
  );
}

export function LogoKeras({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="24" height="24" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#D00000" />
        <text
          x="12"
          y="17"
          textAnchor="middle"
          fill="#fff"
          fontSize="14"
          fontFamily="Montserrat, sans-serif"
          fontWeight="800"
        >
          K
        </text>
      </svg>
    </span>
  );
}

export function LogoSklearn({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="88" height="28" viewBox="0 0 88 28">
        <ellipse cx="18" cy="14" rx="12" ry="10" fill="#F89939" />
        <ellipse cx="10" cy="12" rx="8" ry="8" fill="#3499CD" />
        <text
          x="32"
          y="18"
          fill="#333"
          fontSize="12"
          fontFamily="Georgia, serif"
          fontStyle="italic"
        >
          scikit-learn
        </text>
      </svg>
    </span>
  );
}

export function LogoCohere({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="26" height="26" viewBox="0 0 28 28">
        <path
          d="M14 3c6 0 11 5 11 11s-5 11-11 11S3 20 3 14 8 3 14 3z"
          stroke="#39594D"
          strokeWidth="1.6"
        />
        <path
          d="M9 16c1.5 2.5 4 3.5 5 3.5s3.5-1 5-3.5M10 11.5h.01M18 11.5h.01"
          stroke="#39594D"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="9" cy="9" r="1.2" fill="#39594D" />
        <circle cx="19" cy="9" r="1.2" fill="#39594D" />
        <circle cx="14" cy="7" r="1" fill="#39594D" />
        <circle cx="7" cy="14" r="1" fill="#39594D" />
        <circle cx="21" cy="14" r="1" fill="#39594D" />
      </svg>
    </span>
  );
}

export function LogoGemini({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="72" height="24" viewBox="0 0 72 24">
        <defs>
          <linearGradient id="gem" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1A73E8" />
            <stop offset="100%" stopColor="#A142F4" />
          </linearGradient>
        </defs>
        <path
          fill="url(#gem)"
          d="M14 4l1.2 3.2L18.5 8.5l-3.3 1.3L14 13l-1.2-3.2L9.5 8.5l3.3-1.3L14 4z"
        />
        <text
          x="22"
          y="16"
          fill="url(#gem)"
          fontSize="14"
          fontFamily="Google Sans, Inter, sans-serif"
          fontWeight="600"
        >
          Gemini
        </text>
      </svg>
    </span>
  );
}

export function LogoPyTorch({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="90" height="24" viewBox="0 0 90 24">
        <path
          fill="#EE4C2C"
          d="M12 3.5c-4.5 0-8 3.6-8 8.2 0 4.4 3.4 8 7.6 8.2 3.8.2 7-2.4 7.8-5.9.2-.8-.5-1.4-1.2-1.1-1.2.5-2.5.7-3.8.4-2.6-.6-4.5-3-4.4-5.7.1-1.1.5-2.1 1.2-2.9.5-.6.2-1.5-.5-1.6-.9-.2-1.9-.1-2.9.4z"
        />
        <circle cx="15.5" cy="7.2" r="1.3" fill="#fff" />
        <text
          x="24"
          y="16"
          fill="#262626"
          fontSize="13"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          PyTorch
        </text>
      </svg>
    </span>
  );
}

export function LogoAWS({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="48" height="28" viewBox="0 0 48 28">
        <text
          x="24"
          y="14"
          textAnchor="middle"
          fill="#232F3E"
          fontSize="16"
          fontFamily="Amazon Ember, Inter, sans-serif"
          fontWeight="700"
        >
          aws
        </text>
        <path
          d="M8 18c8 6 24 6 32 0"
          stroke="#FF9900"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M38 16.5l3 1.5-3 1.5" fill="#FF9900" />
      </svg>
    </span>
  );
}

export function LogoPython({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="#3776AB"
          d="M12 2C7.5 2 7.8 4 7.8 4v2.2h4.3v.7H5.5S2 6.7 2 11.5 5.2 16 5.2 16h2.3v-2.3s-.1-2.7 2.7-2.7h4.6s2.6.1 2.6-2.5V4.8S18 2 12 2zm-2.3 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
        <path
          fill="#FFD43B"
          d="M12 22c4.5 0 4.2-2 4.2-2v-2.2h-4.3v-.7h6.6S22 17.3 22 12.5 18.8 8 18.8 8h-2.3v2.3s.1 2.7-2.7 2.7H9.2S6.6 13 6.6 15.5v3.7S6 22 12 22zm2.3-1.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        />
      </svg>
    </span>
  );
}

export function LogoHuggingFace({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="110" height="24" viewBox="0 0 110 24">
        <circle cx="12" cy="12" r="10" fill="#FFD21F" />
        <circle cx="8.5" cy="10" r="1.3" fill="#333" />
        <circle cx="15.5" cy="10" r="1.3" fill="#333" />
        <path
          d="M7.5 14.5c1.5 2.2 5.5 2.2 7 0"
          stroke="#333"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <text
          x="26"
          y="16"
          fill="#0D0D0D"
          fontSize="12"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          Hugging Face
        </text>
      </svg>
    </span>
  );
}

export function LogoDeepSeek({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="100" height="24" viewBox="0 0 100 24">
        <path
          fill="#4D6BFE"
          d="M4 12c0-5 3.5-9 8.5-9 3 0 5.5 1.2 7 3.2L17 9c-1-1.2-2.5-2-4.3-2C9.2 7 7 9.2 7 12s2.2 5 5.7 5c1.8 0 3.3-.8 4.3-2l2.5 2.8c-1.5 2-4 3.2-7 3.2C7.5 21 4 17 4 12z"
        />
        <circle cx="11.2" cy="11.2" r="1.4" fill="#fff" />
        <text
          x="24"
          y="16"
          fill="#4D6BFE"
          fontSize="13"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          deepseek
        </text>
      </svg>
    </span>
  );
}

export function LogoSageMaker({ className }: IconProps) {
  return (
    <span className={className}>
      <svg {...base} width="120" height="28" viewBox="0 0 120 28">
        <rect
          x="1"
          y="1"
          width="118"
          height="26"
          rx="4"
          stroke="#7B2FF0"
          strokeWidth="1.5"
        />
        <path
          fill="#7B2FF0"
          d="M14 7c-3 0-5 2.2-5 5.2S11 17.5 14 17.5c1.4 0 2.6-.5 3.5-1.3l-1.3-1.3c-.5.5-1.3.8-2.2.8-1.7 0-2.9-1.3-2.9-3.5S12.3 9 14 9c.9 0 1.7.3 2.2.9l1.3-1.3C16.6 7.5 15.4 7 14 7z"
        />
        <circle cx="18.5" cy="9" r="1.2" fill="#7B2FF0" />
        <text
          x="28"
          y="12"
          fill="#232F3E"
          fontSize="8"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          Amazon
        </text>
        <text
          x="28"
          y="21"
          fill="#232F3E"
          fontSize="9"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
        >
          SageMaker
        </text>
      </svg>
    </span>
  );
}

export const techStackLogos = [
  { id: "openai", Logo: LogoOpenAI },
  { id: "mistral", Logo: LogoMistral },
  { id: "tensorflow", Logo: LogoTensorFlow },
  { id: "bigquery", Logo: LogoBigQuery },
  { id: "meta", Logo: LogoMeta },
  { id: "google-cloud", Logo: LogoGoogleCloud },
  { id: "langchain", Logo: LogoLangChain },
  { id: "databricks", Logo: LogoDatabricks },
  { id: "azure", Logo: LogoAzure },
  { id: "xgboost", Logo: LogoXGBoost },
  { id: "keras", Logo: LogoKeras },
  { id: "sklearn", Logo: LogoSklearn },
  { id: "cohere", Logo: LogoCohere },
  { id: "gemini", Logo: LogoGemini },
  { id: "pytorch", Logo: LogoPyTorch },
  { id: "aws", Logo: LogoAWS },
  { id: "python", Logo: LogoPython },
  { id: "huggingface", Logo: LogoHuggingFace },
  { id: "deepseek", Logo: LogoDeepSeek },
  { id: "sagemaker", Logo: LogoSageMaker },
] as const;

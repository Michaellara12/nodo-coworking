type IconProps = {
  className?: string;
};

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}

export function Globe({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.4 3.8 5.5 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.5-3.8-9S9.5 5.4 12 3Z" />
    </svg>
  );
}

export function Bolt({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 2 4.8 14h5.7l-1 8 8.7-12h-5.7l1-8Z" />
    </svg>
  );
}

export function Diamond({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 3.2 20.8 12 12 20.8 3.2 12 12 3.2Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14.5 8.2h2.6V5h-2.6a4.2 4.2 0 0 0-4.2 4.2v1.9H8v3.2h2.3V21h3.2v-6.7h2.4l.7-3.2h-3.1V9.2a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className={className} aria-hidden>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 2.8V7M16 2.8V7" />
    </svg>
  );
}

export function CardIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className={className} aria-hidden>
      <rect x="2.5" y="5.5" width="19" height="13.5" rx="3" />
      <path d="M2.5 10h19M6.5 15h4" />
    </svg>
  );
}

export function BankIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M5 10v7M9.7 10v7M14.3 10v7M19 10v7" />
      <path d="M3.5 20.5h17" />
    </svg>
  );
}

export function CashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className={className} aria-hidden>
      <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
      <circle cx="12" cy="12" r="2.8" />
      <path d="M6 9.5v.01M18 14.5v.01" />
    </svg>
  );
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M14 4h4.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H14" />
      <path d="M10 8l-4 4 4 4M6 12h10" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.4 8.9v11.3H3.1V8.9h3.3ZM4.8 3.5a1.9 1.9 0 1 1 0 3.9 1.9 1.9 0 0 1 0-3.9ZM20.9 13.6v6.6h-3.3v-6.2c0-1.5-.6-2.5-2-2.5-1.1 0-1.7.7-2 1.4-.1.2-.1.6-.1.9v6.4H10s.1-10.4 0-11.3h3.4v1.6c.4-.7 1.2-1.8 3-1.8 2.2 0 4.5 1.4 4.5 4.9Z" />
    </svg>
  );
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.5a9.4 9.4 0 0 0-8.1 14.2L2.5 21.5l4.9-1.3A9.4 9.4 0 1 0 12 2.5Zm0 17a7.5 7.5 0 0 1-3.8-1l-.3-.2-2.9.8.8-2.8-.2-.3A7.6 7.6 0 1 1 12 19.5Zm4.2-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1a6.2 6.2 0 0 1-3.1-2.7c-.2-.4 0-.5.1-.7l.5-.6c.1-.2 0-.4 0-.5l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.7.3-.2.2-.8.8-.8 2s.9 2.3 1 2.5c.1.2 1.7 2.6 4.1 3.7 1.4.6 2 .7 2.7.6.4-.1 1.4-.6 1.5-1.1.2-.6.2-1 .1-1.1 0-.1-.2-.2-.4-.2Z" />
    </svg>
  );
}

export function TiktokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.6 3c.4 1.9 1.7 3.3 3.9 3.6v3c-1.6 0-3-.5-3.9-1.2v6.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .7 0 1 .1v3a2.6 2.6 0 1 0 1.6 2.5V3h3Z" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={className} aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={className} aria-hidden>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

/* ——— iconos de features (escritorio típico) ——— */

export function IconChair({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M7 3h7v8H7z" />
      <path d="M7 11h10v4H7z" />
      <path d="M12 15v4M8 21h8M12 19h0" />
    </svg>
  );
}

export function IconMonitor({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="4.5" width="18" height="12" rx="2" />
      <path d="M9 20h6M12 16.5V20" />
    </svg>
  );
}

export function IconUsers({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M15.5 14.6a4.4 4.4 0 0 1 5.5 4.2" />
    </svg>
  );
}

export function IconBooth({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M9 3v18" />
      <path d="M15.5 11.2a3 3 0 0 1 0 1.6M17.6 9.6a5.4 5.4 0 0 1 0 4.8" />
    </svg>
  );
}

export function IconTv({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="m9 3 3 3 3-3" />
    </svg>
  );
}

export function IconSnow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 3v18M5 6.5l14 11M19 6.5l-14 11" />
      <path d="M12 3l-2 2M12 3l2 2M12 21l-2-2M12 21l2-2" />
    </svg>
  );
}

export function IconWifi({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4 9.5a12 12 0 0 1 16 0" />
      <path d="M7 13a8 8 0 0 1 10 0" />
      <path d="M9.8 16.2a4 4 0 0 1 4.4 0" />
      <circle cx="12" cy="19" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconSun({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19" />
    </svg>
  );
}

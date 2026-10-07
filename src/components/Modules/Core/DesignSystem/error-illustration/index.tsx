export function ErrorIllustration() {
  return (
    <svg viewBox="0 0 120 88" fill="none" aria-hidden="true" className="h-20 w-auto">
      <rect x="18" y="16" width="84" height="60" rx="8" className="fill-muted stroke-border" strokeWidth="1.5" />
      <rect x="18" y="16" width="84" height="14" rx="8" className="fill-border/60" />
      <circle cx="28" cy="23" r="2.5" className="fill-destructive/70" />
      <circle cx="36" cy="23" r="2.5" className="fill-warning/70" />
      <circle cx="44" cy="23" r="2.5" className="fill-success/70" />
      <path
        d="M60 40l-12 22h24L60 40z"
        className="fill-destructive-soft stroke-destructive/70"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M60 48v7" className="stroke-destructive" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="60" cy="58.5" r="1.5" className="fill-destructive" />
    </svg>
  );
}

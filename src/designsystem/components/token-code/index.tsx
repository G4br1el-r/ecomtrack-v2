export function TokenCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="w-fit rounded-md border bg-muted/60 px-1.5 py-0.5 font-mono text-xs text-foreground">
      {children}
    </code>
  );
}

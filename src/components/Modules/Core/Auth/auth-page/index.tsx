import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/constants/Modules/Core/Shell/navigation";

export function AuthPage({
  title,
  description,
  children,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-muted/40">
      <header className="flex h-16 shrink-0 items-center px-6 lg:px-10">
        <span className="font-bold text-primary text-xl">{APP_NAME}</span>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        {title ? (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-xl">
                <h1>{title}</h1>
              </CardTitle>
              {description ? <CardDescription>{description}</CardDescription> : null}
            </CardHeader>
            <CardContent>{children}</CardContent>
          </Card>
        ) : (
          children
        )}
      </main>
    </div>
  );
}

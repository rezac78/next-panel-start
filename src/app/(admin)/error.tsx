"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="bg-background flex grow flex-col items-center justify-center overflow-hidden p-4">
      <div className="flex justify-center">
        <Button onClick={reset} size="lg" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      </div>
      <div className="flex w-full grow flex-col space-y-6 overflow-hidden">
        <div className="text-center">
          <h1 className="text-foreground text-4xl font-bold tracking-tight">
            Something went wrong!
          </h1>
        </div>

        {/* Development: Full error details */}
        {process.env.NODE_ENV === "development" ? (
          <Alert variant="destructive" className="grow overflow-y-auto">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">
              {error.name}: {error.message}
            </AlertTitle>
            <AlertDescription className="mt-4">
              <pre className="bg-muted text-destructive rounded-md p-4 font-mono text-sm whitespace-break-spaces">
                {error.stack}
              </pre>
              {error.digest && (
                <p className="mt-4 text-sm opacity-80">
                  <strong>Error ID (digest):</strong>{" "}
                  <code className="bg-muted rounded px-2 py-1 font-mono">{error.digest}</code>
                </p>
              )}
            </AlertDescription>
          </Alert>
        ) : (
          /* Production: Friendly message */
          <Alert className="grow overflow-y-auto">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Oops! An unexpected error occurred</AlertTitle>
            <AlertDescription className="mt-2">
              We&apos;re sorry for the inconvenience. Please try again or contact support if the
              problem persists.
              {error.digest && (
                <p className="mt-4 text-sm">
                  Error ID:{" "}
                  <code className="bg-muted text-muted-foreground rounded px-2 py-1 font-mono">
                    {error.digest}
                  </code>{" "}
                  (share this with support)
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

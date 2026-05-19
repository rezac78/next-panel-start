import { LoaderIcon } from "lucide-react";

export default function LoadingFallback() {
  return (
    <div className="flex min-h-96 w-full flex-col items-center justify-center gap-4">
      <LoaderIcon className="animate-spin text-4xl" />
      <span className="text-muted-foreground">Loading the informations...</span>
    </div>
  );
}

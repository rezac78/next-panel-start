import { LoaderIcon } from "lucide-react";
import { NextPage } from "next";

type PageProps = {
  searchParams: Promise<Record<string, string | string[]>>;
};

const Page: NextPage<PageProps> = async () => {
  return <div className="relative flex grow flex-col overflow-y-auto max-md:p-3">Dashboard</div>;
};

function LoadingFallback() {
  return (
    <div className="flex min-h-96 w-full flex-col items-center justify-center gap-4">
      <LoaderIcon className="animate-spin text-4xl" />
      <span className="text-muted-foreground">Loading the informations...</span>
    </div>
  );
}

export default Page;

"use client";
import { FlagIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function AdminNotFound() {
  return (
    <div className="mx-auto grid h-screen place-items-center px-8 text-center">
      <div>
        <FlagIcon className="mx-auto h-20 w-20" />
        <h1 color="blue-gray" className="mt-10 !text-3xl !leading-snug md:!text-4xl">
          Error 404 <br /> It looks like something went wrong.
        </h1>
        <p className="mx-auto mt-8 mb-14 text-[18px] font-normal opacity-50 md:max-w-sm">
          Don&apos;t worry, our team is already on it.Please try refreshing the page or come back
          later.
        </p>
        <Link
          href={"/admin"}
          className={cn("w-full px-4 md:w-[8rem]", buttonVariants({ variant: "default" }))}
        >
          back home
        </Link>
      </div>
    </div>
  );
}

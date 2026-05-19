"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

import { ArrowRightIcon, Link2, XIcon } from "lucide-react";
import { ProjectRowViewState } from "@/store/project-row-view.store";
import Image from "next/image";
import Link from "next/link";
import { useLangStore } from "@/store/useLangStore";
import translations from "@/lib/i18n";
import { Tool } from "@/types/tools";

const CustomersViewModal = () => {
  const { activeRow, setActiveRow } = ProjectRowViewState();
  const { lang } = useLangStore();
  const t = translations[lang as "fa" | "en"];
  console.log(activeRow);

  return (
    <div>
      <Drawer open={true} direction="right" onOpenChange={() => setActiveRow(null)}>
        <DrawerContent
          overlayClass="bg-black/5"
          className="px-6 shadow-[-18px_0px_20px_10px_rgba(0,0,0,0.1)] w-full! max-w-[100%]! md:max-w-[55%]!"
        >
          <DrawerHeader className="hidden">
            <DrawerTitle>{/*User Info*/}</DrawerTitle>
            <DrawerDescription>{/*This action cannot be undone.*/}</DrawerDescription>
          </DrawerHeader>

          <DrawerClose className="rounded-l-16 absolute top-0 right-0 md:-left-10 overflow-hidden shadow-[-27px_0px_10px_-10px_rgba(0,0,0,0.09)]">
            <div
              // variant='outline'
              className={cn(
                "rounded-l-16 size-10 md:size-20 md:min-h-20 border-none py-4 shadow-[-4px_0px_10px_0px_rgba(0,0,0,0.1)]",
                buttonVariants({ variant: "outline" })
              )}
            >
              <ArrowRightIcon className="size-10" />
            </div>
          </DrawerClose>
          <div className="flex grow flex-col overflow-y-auto p-2 md:p-10">
            <h1 className="text-2xl font-bold">{activeRow.title}</h1>
            <p className="mb-6 flex flex-col gap-2 border-b border-dashed border-neutral-600 pt-2 pb-6 text-neutral-600 dark:text-neutral-400">
              {activeRow.shortDescription}
            </p>
            <div className="space-y-8">
              <div className="flex flex-col items-start justify-between gap-5 sm:flex-row lg:flex-row lg:items-center">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[15px] text-neutral-700 dark:text-neutral-300">
                    {t.TechStack}:
                  </span>
                  {activeRow.tools.map((e: Tool, i: number) => (
                    <div key={i} className="flex flex-wrap items-center">
                      <Image
                        unoptimized
                        src={e?.image ?? ""}
                        className="h-5 w-5"
                        width={96}
                        height={96}
                        alt={e.name}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  {activeRow.links.map((e: any, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <Link2 size={20} />
                      <Link href={e.url} target="_blank">
                        {e.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="[&_blockquote]:border-s-4 [&_blockquote]:ps-4 [&_blockquote]:opacity-80 [&_li]:my-1 [&_ol]:list-decimal [&_ol]:ps-6 [&_ul]:list-disc [&_ul]:ps-6"
                dangerouslySetInnerHTML={{ __html: activeRow.longDescription }}
              />
            </div>
          </div>
          <DrawerFooter className="hidden">{/*<Button>Submit</Button>*/}</DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/*<Dialog open={true} onOpenChange={() => setActiveRow(null)}>*/}
      {/*    /!*<DialogTrigger>Open</DialogTrigger>*!/*/}
      {/*    <DialogContent dir='rtl' className='sm:!max-w-full'>*/}
      {/*        <DialogHeader>*/}
      {/*            <DialogTitle>User Info</DialogTitle>*/}
      {/*            <DialogDescription>*/}

      {/*            </DialogDescription>*/}
      {/*        </DialogHeader>*/}
      {/*        asdasd*/}
      {/*        {data?.id && <CustomersViewContent token={token} Data={data} />}*/}
      {/*    </DialogContent>*/}

      {/*</Dialog>*/}
    </div>
  );
};

export default CustomersViewModal;


import { cn } from "@/lib/utils";

const HeadingTitle = ({ title, className = "" }: { title: string; className?: string }) => {
  return <h2 className={cn("text-[26px] font-bold", className)}>{title}</h2>;
};

export default HeadingTitle;

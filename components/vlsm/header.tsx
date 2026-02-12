import { Network } from "lucide-react";
import { Badge } from "../ui/badge";
import { ThemeToggle } from "../theme/theme-toggle";
import { DEFAULT_PAGE_WIDTH } from "@/lib/constants";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Header");
  return (
    <header className="fixed right-0 left-0 top-0 border-b-2 backdrop-blur-md flex justify-center">
      <div
        className={`gap-y-2 flex flex-col sm:flex-row justify-between items-center w-full p-3`}
        style={{ maxWidth: DEFAULT_PAGE_WIDTH }}
      >
        <div className="flex gap-3 items-center self-start">
          <Network size={40} />
          <div className="flex flex-col">
            <span className="text-2xl font-bold h-[28px]">VLSM Calculator</span>
            <span className="text-foreground">
              <u>V</u>ariable <u>L</u>ength <u>S</u>ubnet <u>M</u>ask
            </span>
          </div>
        </div>
        <div className="flex gap-2 self-end items-center h-full">
          <Badge className="text-sm h-8" variant={"secondary"}>
            {t("badge")}
          </Badge>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

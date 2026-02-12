"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/navigation";
import { GB, FR } from "country-flag-icons/react/3x2";
import { useLocale } from "next-intl";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="hover:cursor-pointer">
          {locale === "en" ? (
            <div className="flex gap-2 justify-center items-center">
              <GB /> English
            </div>
          ) : (
            <div className="flex gap-2 justify-center items-center">
              <FR /> Français
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push("/", { locale: "en" })}>
          <GB />
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/", { locale: "fr" })}>
          <FR />
          Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

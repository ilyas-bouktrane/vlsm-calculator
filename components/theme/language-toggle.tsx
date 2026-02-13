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
import { useVlsmContext } from "../vlsm/vlsm-provider";
import { useEffect } from "react";
import { PrevDataType } from "@/lib/types";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();

  const {
    calculationSummary,
    desiredSubnetworks,
    miniCardsInfos,
    rootNetwork,
    setCalculationSummary,
    setDesiredSubnetworks,
    setMiniCardsInfos,
    setRootNetwork,
  } = useVlsmContext();

  const languages = [
    { locale: "fr", label: "Français", Icon: FR },
    { locale: "en", label: "English", Icon: GB },
  ];

  const currentLanguage = languages.find((l) => l.locale === locale);

  const handleLanguageChange = (locale: string) => {
    sessionStorage.setItem(
      "prevData",
      JSON.stringify({
        calculationSummary,
        desiredSubnetworks,
        miniCardsInfos,
        rootNetwork,
        scrollPosY: window.scrollY,
      }),
    );

    router.push("/", { locale, scroll: false });
  };

  useEffect(() => {
    const prevData = sessionStorage.getItem("prevData");
    if (!prevData) return;

    const {
      calculationSummary,
      desiredSubnetworks,
      miniCardsInfos,
      rootNetwork,
      scrollPosY,
    }: PrevDataType = JSON.parse(prevData);

    setCalculationSummary(calculationSummary);
    setDesiredSubnetworks(desiredSubnetworks);
    setMiniCardsInfos(miniCardsInfos);
    setRootNetwork(rootNetwork);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPosY,
        behavior: "instant",
      });
    });
    sessionStorage.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="hover:cursor-pointer">
          {currentLanguage && (
            <div className="flex gap-2 justify-center items-center">
              <currentLanguage.Icon /> {currentLanguage.label}
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((l) => (
          <DropdownMenuItem
            key={l.locale}
            className="flex p-2 justify-start items-center"
            onClick={() => handleLanguageChange(l.locale)}
          >
            <l.Icon />
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

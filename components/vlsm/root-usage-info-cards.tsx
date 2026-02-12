"use client";

import { useTranslations } from "next-intl";
import { MiniCard } from "./mini-card";
import { useVlsmContext } from "./vlsm-provider";

export default function RootUsageInfoCards() {
  const t = useTranslations("RootUsageInfoCards");
  const { calculationSummary, miniCardsInfos } = useVlsmContext();
  if (calculationSummary.length === 0 || !miniCardsInfos) return;

  return (
    <div className="flex gap-3 flex-col md:flex-row">
      <MiniCard label={t("subnets")} info={String(miniCardsInfos.subnets)} />{" "}
      <MiniCard
        label={t("totalRootCapacity")}
        info={String(miniCardsInfos.totalRootNetCapacity)}
      />
      <MiniCard
        label={t("usedRootAddresses")}
        info={String(miniCardsInfos.rootNetAddrUsed)}
      />
      <MiniCard
        label={t("remainingRootAddresses")}
        info={String(miniCardsInfos.remainingRootAddr)}
      />
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { MiniCard } from "./mini-card";
import { useVlsmContext } from "./vlsm-provider";

export default function SubnetInfoCards() {
  const t = useTranslations("SubnetInfoCards");
  const { calculationSummary, miniCardsInfos } = useVlsmContext();
  if (calculationSummary.length === 0 || !miniCardsInfos) return;

  return (
    <div className="flex gap-3 flex-col md:flex-row">
      <MiniCard label={t("rootNetwork")} info={miniCardsInfos.rootNetwork} />
      <MiniCard
        label={t("totalSubnetCapacity")}
        info={String(miniCardsInfos.totalSubnetCapacity)}
      />
      <MiniCard
        label={t("allocatedHosts")}
        info={String(miniCardsInfos.allocatedHosts)}
      />
      <MiniCard
        label={t("remainingUsableAddresses")}
        info={String(miniCardsInfos.remainingUsableAddr)}
      />
    </div>
  );
}

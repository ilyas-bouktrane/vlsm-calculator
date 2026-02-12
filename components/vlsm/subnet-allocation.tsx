"use client";

import { ChartBarBig } from "lucide-react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import HorizontalStackedBar from "./horizontal-stacked-bar";
import { useVlsmContext } from "./vlsm-provider";
import { useTranslations } from "next-intl";

export default function SubnetAllocation() {
  const t = useTranslations("SubnetAllocation");
  const { calculationSummary, miniCardsInfos } = useVlsmContext();
  if (!miniCardsInfos || calculationSummary.length === 0) return;

  return (
    <Card className="p-5 flex flex-col gap-3">
      <div>
        <CardTitle className="text-xl flex gap-2 items-center">
          <ChartBarBig /> {t("title")}
        </CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </div>
      <HorizontalStackedBar
        allocations={calculationSummary.map((c) => ({
          label: c.name,
          percentage: c.hosts / miniCardsInfos.totalSubnetCapacity,
          cidr: c.cidr,
        }))}
      />
    </Card>
  );
}

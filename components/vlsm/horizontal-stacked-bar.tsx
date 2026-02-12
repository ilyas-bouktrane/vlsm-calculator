"use client";

import { useMemo } from "react";
import { Badge } from "../ui/badge";
import { DEFAULT_BAR_DYNAMIC_COLORS } from "@/lib/constants";
import { AllocationBarItemType } from "@/lib/types";
import { useTranslations } from "next-intl";

export default function HorizontalStackedBar({
  allocations,
}: {
  allocations: AllocationBarItemType[];
}) {
  const t = useTranslations("StackedBar")
  const unallocatedPercentage = useMemo(
    () =>
      1 -
      allocations
        .map((allocation) => allocation.percentage)
        .reduce((prev, curr) => prev + curr, 0),
    [allocations],
  );

  return (
    <div id="container" className="flex flex-col gap-3 w-full">
      <div
        id="bar"
        className="h-14 w-full bg-gray-400 rounded-xl flex flex-row overflow-hidden"
      >
        {allocations.map(({ percentage, label }, index) => (
          <div
            key={index}
            className={"h-full flex items-center justify-center p-0 w-full"}
            style={{
              maxWidth: `${percentage * 100}%`,
              backgroundColor: DEFAULT_BAR_DYNAMIC_COLORS(index),
            }}
          >
            {percentage >= 0.1 ? (
              <span className="truncate text-white">{label}</span>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {allocations.map(({ percentage, label, cidr }, index) => (
          <Badge
            variant={"outline"}
            key={index}
            className="flex gap-2 justify-center items-center"
          >
            <div
              className="h-3.5 w-3.5 rounded-2xl"
              style={{
                backgroundColor: DEFAULT_BAR_DYNAMIC_COLORS(index),
              }}
            />
            <span className="text-sm">
              {label}/{cidr} ({Math.round(percentage * 10 ** 4) / 100}%)
            </span>
          </Badge>
        ))}
        <Badge
          variant={"outline"}
          className="flex gap-2 justify-center items-center"
        >
          <div className="h-3.5 w-3.5 rounded-2xl bg-gray-400" />
          <span className="text-sm">
            {t("unallocated")} ({Math.round(unallocatedPercentage * 100)}%)
          </span>
        </Badge>
      </div>
    </div>
  );
}

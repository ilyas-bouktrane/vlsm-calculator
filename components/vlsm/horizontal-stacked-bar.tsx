"use client";

import { useMemo } from "react";
import { Badge } from "../ui/badge";

const DEFAULT_COLOR_FUNCTION = (index: number) =>
  `hsl(${180 + index * 15}, 60%, 40%)`;

type AllocationBarItem = {
  percentage: number;
  label: string;
  cidr: string;
};

export default function HorizontalStackedBar({
  allocations,
}: {
  allocations: AllocationBarItem[];
}) {
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
            className={"h-full flex items-center justify-center px-5 w-full"}
            style={{
              maxWidth: `${percentage * 100}%`,
              backgroundColor: DEFAULT_COLOR_FUNCTION(index),
            }}
          >
            {percentage >= 0.1 ? (
              <span className="truncate">{label}</span>
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
                backgroundColor: DEFAULT_COLOR_FUNCTION(index),
              }}
            />
            <span className="text-sm">
              {label + cidr} ({Math.round(percentage * 100)}%)
            </span>
          </Badge>
        ))}
        <Badge
          variant={"outline"}
          className="flex gap-2 justify-center items-center"
        >
          <div className="h-3.5 w-3.5 rounded-2xl bg-gray-400" />
          <span className="text-sm">
            Unallocated ({Math.round(unallocatedPercentage * 100)}%)
          </span>
        </Badge>
      </div>
    </div>
  );
}

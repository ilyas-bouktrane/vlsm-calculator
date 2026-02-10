import { ChartBarBig } from "lucide-react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import HorizontalStackedBar from "./horizontal-stacked-bar";
import { useVlsmContext } from "./vlsm-provider";
import { getSubnetMinSizeFromHosts } from "@/lib/utils";

export default function RootUsageAllocation() {
  const { calculationSummary, miniCardsInfos } = useVlsmContext();
  if (!miniCardsInfos || calculationSummary.length === 0) return;

  return (
    <Card className="p-5 flex flex-col gap-3">
      <div>
        <CardTitle className="text-xl flex gap-2 items-center">
          <ChartBarBig /> ROOT NETWORK RANGE USAGE
        </CardTitle>
        <CardDescription>
          Overall Root Network Address Space Utilization
        </CardDescription>
      </div>
      <HorizontalStackedBar
        allocations={calculationSummary.map((c) => ({
          label: c.name,
          percentage:
            getSubnetMinSizeFromHosts(c.hosts) /
            miniCardsInfos.totalRootNetCapacity,
          cidr: c.cidr,
        }))}
      />
    </Card>
  );
}

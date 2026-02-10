import { ChartBarBig } from "lucide-react";
import { Card, CardTitle } from "../ui/card";
import HorizontalStackedBar from "./horizontal-stacked-bar";
import { useVlsmContext } from "./vlsm-provider";

export default function AllocationBar() {
  const { calculationSummary } = useVlsmContext();

  return calculationSummary.length !== 0 ? (
    <Card className="p-5 flex flex-col gap-3">
      <CardTitle className="text-xl flex gap-2 items-center">
        <ChartBarBig /> ALLOCATION VISUALIZATION
      </CardTitle>
      <HorizontalStackedBar
        allocations={[
          { label: "LAN-HR", percentage: 0.2, cidr: "/24" },
          { label: "LAN-HR", percentage: 0.2, cidr: "/24" },
          { label: "LAN-HR", percentage: 0.2, cidr: "/24" },
          { label: "LAN-HR", percentage: 0.2, cidr: "/24" },
          { label: "LAN-HR", percentage: 0.12, cidr: "/24" },
        ]}
      />
    </Card>
  ) : (
    <></>
  );
}

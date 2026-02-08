import { ChartBarBig } from "lucide-react";
import { Card, CardTitle } from "../ui/card";
import HorizontalStackedBar from "./horizontal-stacked-bar";

export default function AllocationBar() {
  return (
    <Card className="p-5 flex flex-col gap-3">
      <CardTitle className="text-xl flex gap-2 items-center">
        <ChartBarBig /> ALLOCATION VISUALIZATION
      </CardTitle>
      <HorizontalStackedBar allocations={[]} />
    </Card>
  );
}

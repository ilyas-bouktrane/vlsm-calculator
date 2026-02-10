import { MiniCard } from "./mini-card";
import { useVlsmContext } from "./vlsm-provider";

export default function RootUsageInfoCards() {
  const { calculationSummary, miniCardsInfos } = useVlsmContext();
  if (calculationSummary.length === 0 || !miniCardsInfos) return;

  return (
    <div className="flex gap-3 flex-col md:flex-row">
      <MiniCard label="Subnets" info={String(miniCardsInfos.subnets)} />{" "}
      <MiniCard
        label="Total Root Network Capacity"
        info={String(miniCardsInfos.totalRootNetCapacity)}
      />
      <MiniCard
        label="Root Network Addresses Used"
        info={String(miniCardsInfos.rootNetAddrUsed)}
      />
      <MiniCard
        label="Remaining Root Addresses"
        info={String(miniCardsInfos.remainingRootAddr)}
      />
    </div>
  );
}

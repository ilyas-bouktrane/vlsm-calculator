import { MiniCard } from "./mini-card";
import { useVlsmContext } from "./vlsm-provider";

export default function SubnetInfoCards() {
  const { calculationSummary, miniCardsInfos } = useVlsmContext();
  if (calculationSummary.length === 0 || !miniCardsInfos) return;

  return (
    <div className="flex gap-3 flex-col md:flex-row">
      <MiniCard label="Root Network" info={miniCardsInfos.rootNetwork} />
      <MiniCard
        label="Total Subnet Capacity"
        info={String(miniCardsInfos.totalSubnetCapacity)}
      />
      <MiniCard
        label="Allocated Hosts"
        info={String(miniCardsInfos.allocatedHosts)}
      />
      <MiniCard
        label="Remaining Usable Addresses"
        info={String(miniCardsInfos.remainingUsableAddr)}
      />
    </div>
  );
}

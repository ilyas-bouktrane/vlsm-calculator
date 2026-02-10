import { Calculator, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useVlsmContext } from "./vlsm-provider";
import { calculateVlsm, getSubnetMinSizeFromHosts } from "@/lib/utils";

export default function CalcResetButtons() {
  const {
    readyToCalculate,
    setCalculationSummary,
    setDesiredSubnetworks,
    desiredSubnetworks,
    rootNetwork,
    setMiniCardsInfos,
    setRootNetwork,
  } = useVlsmContext();

  const handleCalculation = () => {
    const {
      allocatedHosts,
      remainingUsableAddr,
      totalSubnetCapacity,
      rootNetAddrUsed,
    } = desiredSubnetworks.reduce(
      (prev, curr) => ({
        allocatedHosts: prev.allocatedHosts + curr.hosts,
        remainingUsableAddr:
          prev.remainingUsableAddr +
          getSubnetMinSizeFromHosts(curr.hosts) -
          curr.hosts -
          2,
        totalSubnetCapacity:
          prev.totalSubnetCapacity + getSubnetMinSizeFromHosts(curr.hosts) - 2,
        rootNetAddrUsed:
          prev.rootNetAddrUsed + getSubnetMinSizeFromHosts(curr.hosts),
      }),
      {
        allocatedHosts: 0,
        remainingUsableAddr: 0,
        totalSubnetCapacity: 0,
        rootNetAddrUsed: 0,
      },
    );

    const totalRootNetCapacity = Math.pow(
      2,
      32 - Number(rootNetwork.split("/")[1]),
    );

    setCalculationSummary(calculateVlsm(rootNetwork, desiredSubnetworks));
    setMiniCardsInfos({
      rootNetwork,
      totalSubnetCapacity,
      subnets: desiredSubnetworks.length,
      allocatedHosts,
      remainingUsableAddr,
      totalRootNetCapacity,
      rootNetAddrUsed,
      remainingRootAddr: totalRootNetCapacity - rootNetAddrUsed,
    });
  };

  const handleReset = () => {
    setCalculationSummary([]);
    setDesiredSubnetworks([]);
    setRootNetwork("");
  };

  return (
    <Card className="p-4 flex flex-row gap-3">
      <Button
        onClick={() => handleCalculation()}
        disabled={!readyToCalculate}
        className="flex-1"
      >
        <Calculator /> Calculate
      </Button>
      <Button
        className="flex-1"
        variant={"destructive"}
        onClick={() => handleReset()}
      >
        <RotateCcw /> Reset
      </Button>
    </Card>
  );
}

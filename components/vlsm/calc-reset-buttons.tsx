import { Calculator, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useVlsmContext } from "./vlsm-provider";
import { calculateVlsm, validateRootNetMaskForSubnets } from "@/lib/utils";

export default function CalcResetButtons() {
  const {
    readyToCalculate,
    setCalculationSummary,
    setDesiredSubnetworks,
    desiredSubnetworks,
    rootNetwork,
  } = useVlsmContext();

  const handleCalculation = () => {
    setCalculationSummary(calculateVlsm(rootNetwork, desiredSubnetworks));
  };

  const handleReset = () => {
    setCalculationSummary([]);
    setDesiredSubnetworks([]);
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

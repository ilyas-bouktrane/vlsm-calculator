import { Calculator, RotateCcw } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useVlsmContext } from "./vlsm-provider";

export default function CalcResetButtons() {
  const { readyToCalculate,  } = useVlsmContext();

  const handleCalculation = () => {
    
  }

  return (
    <Card className="p-4 flex flex-row gap-3">
      <Button onClick={() => handleCalculation()} disabled={!readyToCalculate} className="flex-1">
        <Calculator /> Calculate
      </Button>
      <Button className="flex-1" variant={"destructive"}>
        <RotateCcw /> Reset
      </Button>
    </Card>
  );
}

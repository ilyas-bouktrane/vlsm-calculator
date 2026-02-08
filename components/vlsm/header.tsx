import { Network } from "lucide-react";
import { Badge } from "../ui/badge";
import { ThemeToggle } from "../theme/theme-toggle";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-full max-w-[1200px] p-3 border-b-2">
      <div className="flex gap-3 items-center">
        <Network size={40} />
        <div className="flex flex-col">
          <span className="text-2xl font-bold h-[28px]">VLSM Calculator</span>
          <span className="text-foreground">
            Variable Length Subnet Mask Calculator
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Badge className="text-sm" variant={"outline"}>
          IPv4 Supported
        </Badge>
        <ThemeToggle />
      </div>
    </header>
  );
}

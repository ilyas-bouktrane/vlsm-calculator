import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useVlsmContext } from "./vlsm-provider";

export const MiniCard = ({ label, info }: { label: string; info: string }) => (
  <Card className="flex-1">
    <CardHeader className="gap-1">
      <CardDescription>{label}</CardDescription>
      <CardTitle className="truncate">{info}</CardTitle>
    </CardHeader>
  </Card>
);

export default function InfoCards() {
  const { calculationSummary } = useVlsmContext();

  return calculationSummary.length !== 0 ? (
    <div className="flex gap-3 flex-col md:flex-row">
      <MiniCard label="Root Network" info="192.168.1.0/24" />
      <MiniCard label="Initial Addresses" info="256" />
      <MiniCard label="Subnets" info="10" />
      <MiniCard label="Allocated Hosts" info="112" />
      <MiniCard label="Remaining Addresses" info="48" />
    </div>
  ) : (
    <></>
  );
}

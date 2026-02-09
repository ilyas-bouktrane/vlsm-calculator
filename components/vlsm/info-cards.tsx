import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const MiniCard = ({ label, info }: { label: string; info: string }) => (
  <Card className="flex-1">
    <CardHeader className="gap-1">
      <CardDescription>{label}</CardDescription>
      <CardTitle className="truncate">{info}</CardTitle>
    </CardHeader>
  </Card>
);

export default function InfoCards() {
  return (
    <div className="flex gap-3 flex-col md:flex-row">
      <MiniCard label="Root Network" info="192.168.1.0/24" />
      <MiniCard label="Initial Addresses" info="256" />
      <MiniCard label="Subnets" info="10" />
      <MiniCard label="Allocated Hosts" info="112" />
      <MiniCard label="Remaining Addresses" info="48" />
    </div>
  );
}

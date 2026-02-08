import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function MiniCard({
  label,
  info,
}: {
  label: string;
  info: string;
}) {
  return (
    <Card className="flex-1">
      <CardHeader className="gap-1">
        <CardDescription>{label}</CardDescription>
        <CardTitle>{info}</CardTitle>
      </CardHeader>
    </Card>
  );
}

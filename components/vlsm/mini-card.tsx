import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const MiniCard = ({
  label,
  info,
  className,
}: {
  label: string;
  info: string;
  className?: string;
}) => (
  <Card className={`flex-1 ${className}`}>
    <CardHeader className="gap-1">
      <CardDescription>{label}</CardDescription>
      <CardTitle className="truncate">{info}</CardTitle>
    </CardHeader>
  </Card>
);

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { TableProperties } from "lucide-react";
import { useVlsmContext } from "./vlsm-provider";
import { getSubnetMinSizeFromHosts } from "@/lib/utils";

export default function SubnetTable() {
  const { calculationSummary } = useVlsmContext();

  return calculationSummary.length !== 0 ? (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <TableProperties />
          CALCULATION SUMMARY
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Subnet</TableHead>
              <TableHead className="text-muted-foreground">Hosts</TableHead>
              <TableHead className="text-muted-foreground">
                Network Address
              </TableHead>
              <TableHead className="text-muted-foreground">Mask</TableHead>
              <TableHead className="text-muted-foreground">Range</TableHead>
              <TableHead className="text-muted-foreground">Broadcast</TableHead>
              <TableHead className="text-muted-foreground text-right">
                CIDR
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calculationSummary.map((c, index) => (
              <TableRow key={`row-${index}`}>
                <TableCell key={`name-${index}`}>{c.name}</TableCell>
                <TableCell key={`hosts-${index}`}>
                  {c.hosts} / {getSubnetMinSizeFromHosts(c.hosts) - 2} usable
                </TableCell>
                <TableCell key={`network-${index}`}>
                  {c.address}/{c.cidr}
                </TableCell>
                <TableCell key={`mask-${index}`}>{c.mask}</TableCell>
                <TableCell key={`range-${index}`}>
                  {c.range[0]} - {c.range[1]}
                </TableCell>
                <TableCell key={`broadcast-${index}`}>{c.broadcast}</TableCell>
                <TableCell key={`cidr-${index}`} className="text-right">
                  <Badge>/{c.cidr}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ) : (
    <></>
  );
}

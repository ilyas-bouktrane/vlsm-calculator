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
import { useTranslations } from "next-intl";

export default function CalculationSummary() {
  const t = useTranslations("CalculationSummary");
  const { calculationSummary } = useVlsmContext();

  return calculationSummary.length !== 0 ? (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <TableProperties />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">
                {t("subnet")}
              </TableHead>
              <TableHead className="text-muted-foreground">
                {t("hosts")}
              </TableHead>
              <TableHead className="text-muted-foreground">
                {t("capacity")}
              </TableHead>
              <TableHead className="text-muted-foreground">
                {t("networkAddress")}
              </TableHead>
              <TableHead className="text-muted-foreground">
                {t("mask")}
              </TableHead>
              <TableHead className="text-muted-foreground">
                {t("range")}
              </TableHead>
              <TableHead className="text-muted-foreground">
                {t("broadcast")}
              </TableHead>
              <TableHead className="text-muted-foreground text-right">
                CIDR
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calculationSummary.map((c, index) => {
              const subnetCapacity = getSubnetMinSizeFromHosts(c.hosts) - 2;
              const hostsPercentage = Math.round(
                (c.hosts / subnetCapacity) * 100,
              );

              return (
                <TableRow key={`row-${index}`}>
                  <TableCell key={`name-${index}`}>{c.name}</TableCell>
                  <TableCell key={`hosts-${index}`}>
                    {c.hosts} / {subnetCapacity} {t("usable")}
                  </TableCell>
                  <TableCell key={`capacity-${index}`}>
                    {hostsPercentage}%
                  </TableCell>
                  <TableCell key={`network-${index}`}>
                    {c.address}/{c.cidr}
                  </TableCell>
                  <TableCell key={`mask-${index}`}>{c.mask}</TableCell>
                  <TableCell key={`range-${index}`}>
                    {c.range[0]} - {c.range[1]}
                  </TableCell>
                  <TableCell key={`broadcast-${index}`}>
                    {c.broadcast}
                  </TableCell>
                  <TableCell key={`cidr-${index}`} className="text-right">
                    <Badge>/{c.cidr}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ) : (
    <></>
  );
}

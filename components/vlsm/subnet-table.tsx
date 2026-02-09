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

export default function SubnetTable() {
  return (
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
            
            <TableRow>
              <TableCell>LAN-HR</TableCell>
              <TableCell>50/62 available</TableCell>
              <TableCell>192.168.1.0/27</TableCell>
              <TableCell>255.255.255.192</TableCell>
              <TableCell>192.168.1.1 - 192.168.1.62</TableCell>
              <TableCell>192.168.1.63</TableCell>
              <TableCell className="text-right">
                <Badge>/27</Badge>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>LAN-HR</TableCell>
              <TableCell>50/62 available</TableCell>
              <TableCell>192.168.1.0/27</TableCell>
              <TableCell>255.255.255.192</TableCell>
              <TableCell>192.168.1.1 - 192.168.1.62</TableCell>
              <TableCell>192.168.1.63</TableCell>
              <TableCell className="text-right">
                <Badge>/27</Badge>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>LAN-HR</TableCell>
              <TableCell>50/62 available</TableCell>
              <TableCell>192.168.1.0/27</TableCell>
              <TableCell>255.255.255.192</TableCell>
              <TableCell>192.168.1.1 - 192.168.1.62</TableCell>
              <TableCell>192.168.1.63</TableCell>
              <TableCell className="text-right">
                <Badge>/27</Badge>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

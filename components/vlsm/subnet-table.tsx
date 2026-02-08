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
    <Card className="mb-10 gap-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <TableProperties />
          VLSM RESULTS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subnet</TableHead>
              <TableHead>Hosts</TableHead>
              <TableHead>Network Address</TableHead>
              <TableHead>Mask</TableHead>
              <TableHead>Range</TableHead>
              <TableHead>Broadcast</TableHead>
              <TableHead>CIDR</TableHead>
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
              <TableCell>
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
              <TableCell>
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
              <TableCell>
                <Badge>/27</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

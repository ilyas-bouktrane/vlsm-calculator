"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  Calculator,
  ChartBarBig,
  Globe,
  Layers,
  Network,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AllocationBar from "@/components/vlsm/allocation-bar";
import MiniCard from "@/components/vlsm/mini-card";

export default function Index() {
  return (
    <>
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
      <main className="p-3 flex flex-col gap-4">
        <div>
          <span className="text-foreground">
            A tool that helps network engineers efficiently divide an IP network
            into subnets of varying sizes using Variable Length Subnet Masking
            (VLSM). It calculates subnet addresses, broadcast addresses, and
            host ranges for optimized IP allocation.
          </span>
        </div>
        <div className="grid grid-cols-[1fr_2fr] gap-3">
          <Card>
            <CardHeader className="gap-0">
              <CardTitle className="text-xl flex gap-2 items-center">
                <Globe size={20} />
                MAIN NETWORK
              </CardTitle>
              <CardDescription>
                Specify the root network address
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-1.5 flex-col">
              <Label>Address/CIDR</Label>
              <Input
                placeholder="e.g., 192.168.0.0/24, 10.0.0.0/8..."
                type="text"
                className=" placeholder:opacity-75"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="gap-0">
              <CardTitle className="text-xl flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Layers size={20} />
                  DESIRED SUBNETWORKS
                </div>
                <Badge className="text-sm" variant={"secondary"}>
                  1
                </Badge>
              </CardTitle>
              <CardDescription>
                List the required subnets by specifying the number of hosts
                needed for each segment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-[3fr_1fr_40px] gap-x-4 gap-y-3">
                <Label>Network ID/Name</Label>
                <Label>Number of hosts</Label>
                <span>{/* DELETE COL */}</span>
                <Input
                  type="text"
                  placeholder="Subnet #1"
                  className=" placeholder:opacity-75"
                />
                <Input
                  type="number"
                  placeholder="0"
                  className=" placeholder:opacity-75"
                />
                <Button
                  variant={"outline"}
                  className="flex justify-center items-center h-full w-full hover:text-red-600"
                >
                  <Trash2 />
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center items-center gap-2">
              <Button className="w-full" variant={"secondary"}>
                <Plus />
                ADD
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Card className="p-4 flex flex-row gap-3">
          <Button className="flex-1">
            <Calculator /> Calculate
          </Button>
          <Button className="flex-1" variant={"destructive"}>
            <RotateCcw /> Reset
          </Button>
        </Card>
        <Card className="p-5 flex flex-col gap-3">
          <CardTitle className="text-xl flex gap-2 items-center">
            <ChartBarBig /> ALLOCATION VISUALIZATION
          </CardTitle>
          <AllocationBar
            allocations={[
              { percentage: 0.5, label: "LAN-HR", cidr: "/27" },
              { percentage: 0.3566666, label: "LAN-TI", cidr: "/28" },
            ]}
          />
        </Card>
        <div className="flex gap-3">
          <MiniCard label="Network" info="192.168.1.0/24" />
          <MiniCard label="Subnets" info="10" />
          <MiniCard label="Allocated Hosts" info="112" />
          <MiniCard label="Remaining Addresses" info="48" />
        </div>
      </main>
    </>
  );
}

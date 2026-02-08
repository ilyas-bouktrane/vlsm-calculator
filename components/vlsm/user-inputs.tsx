import { Globe, Layers, Trash2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

export default function UserInputs() {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-3">
      <Card>
        <CardHeader className="gap-0">
          <CardTitle className="text-xl flex gap-2 items-center">
            <Globe size={20} />
            MAIN NETWORK
          </CardTitle>
          <CardDescription>Specify the root network address</CardDescription>
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
            List the required subnets by specifying the number of hosts needed
            for each segment.
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
  );
}

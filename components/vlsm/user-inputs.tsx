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
import { useVlsmContext } from "./vlsm-provider";
import {
  validateIpv4NetworkAddressFormat,
  validateIpv4SubnetAddress,
} from "@/lib/utils";

export default function UserInputs() {
  const {
    rootNetwork,
    setRootNetwork,
    desiredSubnetworks,
    setDesiredSubnetworks,
  } = useVlsmContext();

  const rootAddrFormatIsValid = validateIpv4NetworkAddressFormat(rootNetwork);
  const rootAddrSubnet = validateIpv4SubnetAddress(rootNetwork);

  const rootAddrIsValid = rootAddrFormatIsValid && rootAddrSubnet.isValid;
  const rootAddrValidationMsg = !rootAddrFormatIsValid ? (
    <span className="text-sm text-red-500 text-right">
      *Invalid network address format
    </span>
  ) : !rootAddrSubnet.isValid ? (
    <span className="text-sm text-red-500 text-right">
      *Invalid network subnet, do you mean{" "}
      {rootAddrSubnet.closestValidSubnet.join(".")}/{rootNetwork.split("/")[1]}?
    </span>
  ) : (
    <span className="text-sm text-green-500 text-right">Valid Address</span>
  );

  const updateDesiredSubnetField = (
    index: number,
    field: "hosts" | "id",
    value: string | number,
  ) => {
    setDesiredSubnetworks((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    );
  };

  const deleteDesiredSubnetField = (index: number) => {
    setDesiredSubnetworks((prev) => prev.filter((_, i) => i !== index));
  };

  const addDesiredSubnetField = () => {
    setDesiredSubnetworks((prev) => [...prev, { id: "", hosts: 0 }]);
  };

  return (
    <div className="grid sm:grid-rows-2 md:grid-rows-1 md:grid-cols-[1fr_2fr] gap-3">
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
            className={`placeholder:opacity-75 ${rootNetwork.length === 0 ? "" : !rootAddrIsValid ? "border-red-500 border-2" : "border-green-500"}`}
            value={rootNetwork}
            onChange={(e) => setRootNetwork(e.target.value)}
          />
          <div className="flex justify-end">
            {rootNetwork.length !== 0 && rootAddrValidationMsg}
          </div>
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
              {desiredSubnetworks.length}
            </Badge>
          </CardTitle>
          <CardDescription>
            List the required subnets by specifying the number of hosts needed
            for each segment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[3fr_1fr_40px] gap-x-4 gap-y-3">
            {desiredSubnetworks.length ? (
              <>
                <Label>Network ID/Name</Label>
                <Label>Number of hosts</Label>
                <span>{/* DELETE COL */}</span>
              </>
            ) : (
              <></>
            )}
            {desiredSubnetworks.flatMap(({ hosts, id }, index) => [
              <Input
                key={`id-${index + 1}`}
                type="text"
                placeholder={`LAN-${index + 1}`}
                className="placeholder:opacity-75"
                value={id}
                onChange={(e) =>
                  updateDesiredSubnetField(index, "id", e.target.value)
                }
              />,
              <Input
                key={`hosts-${index + 1}`}
                type="number"
                placeholder="0"
                className="placeholder:opacity-75 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={hosts}
                onChange={(e) =>
                  updateDesiredSubnetField(index, "hosts", e.target.value)
                }
              />,
              <Button
                key={`delete-${index + 1}`}
                variant={"outline"}
                className="flex justify-center items-center h-full w-full hover:text-red-600"
                onClick={() => deleteDesiredSubnetField(index)}
              >
                <Trash2 />
              </Button>,
            ])}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center gap-2">
          <Button
            className="w-full"
            variant={"secondary"}
            onClick={() => addDesiredSubnetField()}
          >
            <Plus />
            ADD
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

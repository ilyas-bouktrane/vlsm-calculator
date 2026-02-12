"use client";

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
  validateRootNetMaskForSubnets,
  validateIpv4NetworkAddressFormat,
  validateIpv4SubnetAddress,
  decCidrToBinMask,
  binAddrToDecAddr,
} from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function UserInputs() {
  const t = useTranslations("UserInputs");
  const {
    rootNetwork,
    setRootNetwork,
    desiredSubnetworks,
    setDesiredSubnetworks,
  } = useVlsmContext();

  const rootAddrFormatIsValid = validateIpv4NetworkAddressFormat(rootNetwork);
  const rootAddrSubnet = validateIpv4SubnetAddress(rootNetwork);

  const rootAddrIsValid = rootAddrFormatIsValid && rootAddrSubnet.isValid;
  const rootMaskSubnet = validateRootNetMaskForSubnets(
    rootNetwork,
    desiredSubnetworks,
  );
  const validationMsg = !rootAddrFormatIsValid ? (
    <span className="text-sm text-red-500 text-right">
      {t("validation.invalidFormat")}
    </span>
  ) : !rootAddrSubnet.isValid ? (
    <span className="text-sm text-red-500 text-right">
      {t("validation.invalidSubnet", {
        closestValidSubnet: `${rootAddrSubnet.closestValidSubnet.join(".")}/${
          rootNetwork.split("/")[1]
        }`,
      })}
    </span>
  ) : !rootMaskSubnet.isValid ? (
    <span className="text-sm text-red-500 text-right">
      {t("validation.insufficientSpace", {
        closestValidMask: rootMaskSubnet.closestValidMask,
        mask: binAddrToDecAddr(
          decCidrToBinMask(rootMaskSubnet.closestValidMask),
        ).join("."),
      })}
    </span>
  ) : (
    <span className="text-sm text-green-500 text-right">
      {t("validation.validAddress")}
    </span>
  );

  const updateDesiredSubnetField = (
    index: number,
    field: "hosts" | "id",
    value: string | number,
  ) => {
    setDesiredSubnetworks((prev) =>
      prev.map((s, i) =>
        i === index
          ? { ...s, [field]: field === "hosts" ? Number(value) : value }
          : s,
      ),
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
            {t("mainNetwork")}
          </CardTitle>
          <CardDescription>{t("mainNetworkDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-1.5 flex-col">
          <Label>{t("addressCidr")}</Label>
          <Input
            placeholder={t("addressCidrPlaceholder")}
            type="text"
            className={`placeholder:opacity-75 ${
              rootNetwork.length === 0
                ? ""
                : !rootAddrIsValid
                  ? "border-red-500 border-2"
                  : "border-green-500"
            }`}
            value={rootNetwork}
            onChange={(e) => setRootNetwork(e.target.value)}
          />
          <div className="flex justify-end">
            {rootNetwork.length !== 0 && validationMsg}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="gap-0">
          <CardTitle className="text-xl flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Layers size={20} />
              {t("desiredSubnetworks")}
            </div>
            <Badge className="text-sm" variant={"secondary"}>
              {desiredSubnetworks.length}
            </Badge>
          </CardTitle>
          <CardDescription>
            {t("desiredSubnetworksDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-[3fr_1fr_40px] gap-x-4 gap-y-3">
            {desiredSubnetworks.length ? (
              <>
                <Label>{t("networkId")}</Label>
                <Label>{t("numberOfHosts")}</Label>
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
                value={hosts > 0 ? hosts : undefined}
                onChange={(e) =>
                  updateDesiredSubnetField(index, "hosts", e.target.value)
                }
                min={0}
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
            {t("add")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import {
  CalculationSummaryType,
  DesiredSubnetworksType,
  MiniCardsInfosType,
  VlsmContextType,
} from "@/lib/types";
import {
  validateRootNetMaskForSubnets,
  validateIpv4NetworkAddressFormat,
  validateIpv4SubnetAddress,
} from "@/lib/utils";
import { createContext, useContext, useState } from "react";

export const VlsmContext = createContext<VlsmContextType | null>(null);

export default function VlsmContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rootNetwork, setRootNetwork] = useState<string>("");
  const [miniCardsInfos, setMiniCardsInfos] =
    useState<MiniCardsInfosType | null>(null);
  const [desiredSubnetworks, setDesiredSubnetworks] = useState<
    DesiredSubnetworksType[]
  >([]);
  const [calculationSummary, setCalculationSummary] = useState<
    CalculationSummaryType[]
  >([]);

  const readyToCalculate =
    validateIpv4NetworkAddressFormat(rootNetwork) &&
    validateRootNetMaskForSubnets(rootNetwork, desiredSubnetworks).isValid &&
    validateIpv4SubnetAddress(rootNetwork).isValid &&
    desiredSubnetworks.every(({ id, hosts }) => id.length !== 0 && hosts > 0) &&
    desiredSubnetworks.length > 0;

  return (
    <VlsmContext.Provider
      value={{
        rootNetwork,
        setRootNetwork,
        desiredSubnetworks,
        setDesiredSubnetworks,
        readyToCalculate,
        calculationSummary,
        setCalculationSummary,
        miniCardsInfos,
        setMiniCardsInfos,
      }}
    >
      {children}
    </VlsmContext.Provider>
  );
}

export const useVlsmContext = () => {
  const context = useContext(VlsmContext);
  if (!context) throw new Error("Need to be used inside its context.");
  return context;
};

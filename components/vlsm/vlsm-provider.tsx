"use client";

import { DesiredSubnetworksType, VlsmContextType } from "@/lib/types";
import { validateIpv4NetworkAddressFormat } from "@/lib/utils";
import { createContext, useContext, useState } from "react";

export const VlsmContext = createContext<VlsmContextType | null>(null);

export default function VlsmContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rootNetwork, setRootNetwork] = useState<string>("");
  const [desiredSubnetworks, setDesiredSubnetworks] =
    useState<DesiredSubnetworksType>([]);
  const readyToCalculate =
    validateIpv4NetworkAddressFormat(rootNetwork) &&
    desiredSubnetworks.length > 0 &&
    desiredSubnetworks.every(({ id, hosts }) => id.length !== 0 && hosts > 0);

  return (
    <VlsmContext.Provider
      value={{
        rootNetwork,
        setRootNetwork,
        desiredSubnetworks,
        setDesiredSubnetworks,
        readyToCalculate,
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

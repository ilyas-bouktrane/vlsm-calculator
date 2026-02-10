import { Dispatch, SetStateAction } from "react";

export type DesiredSubnetworksType = {
  id: string;
  hosts: number;
};

export type CalculationSummaryType = {
  name: string;
  address: string;
  hosts: number;
  mask: string;
  range: [string, string];
  broadcast: string;
  cidr: number;
};

export type MiniCardsInfosType = {
  rootNetwork: string;
  totalSubnetCapacity: number;
  subnets: number;
  allocatedHosts: number;
  remainingUsableAddr: number;
  totalRootNetCapacity: number;
  rootNetAddrUsed: number;
  remainingRootAddr: number;
};

export type VlsmContextType = {
  rootNetwork: string;
  setRootNetwork: Dispatch<SetStateAction<string>>;
  desiredSubnetworks: DesiredSubnetworksType[];
  setDesiredSubnetworks: Dispatch<SetStateAction<DesiredSubnetworksType[]>>;
  readyToCalculate: boolean;
  calculationSummary: CalculationSummaryType[];
  setCalculationSummary: Dispatch<SetStateAction<CalculationSummaryType[]>>;
  miniCardsInfos: MiniCardsInfosType | null;
  setMiniCardsInfos: Dispatch<SetStateAction<MiniCardsInfosType | null>>;
};

export type AllocationBarItemType = {
  percentage: number;
  label: string;
  cidr: number;
};

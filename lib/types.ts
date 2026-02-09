import { Dispatch, SetStateAction } from "react";

export type DesiredSubnetworksType = {
  id: string;
  hosts: number;
};

export type CalculationSummaryType = {
  subnetName: string;
  networkAddr: string;
  hosts: string;
  networkMask: string;
  range: [string, string];
  broadcast: string;
  networkCidr: string;
};

export type VlsmContextType = {
  rootNetwork: string;
  setRootNetwork: Dispatch<SetStateAction<string>>;
  desiredSubnetworks: DesiredSubnetworksType[];
  setDesiredSubnetworks: Dispatch<SetStateAction<DesiredSubnetworksType[]>>;
  readyToCalculate: boolean;
  calculationSummary: CalculationSummaryType[];
  setCalculationSummary: Dispatch<SetStateAction<CalculationSummaryType[]>>;
};

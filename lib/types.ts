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

export type VlsmContextType = {
  rootNetwork: string;
  setRootNetwork: Dispatch<SetStateAction<string>>;
  desiredSubnetworks: DesiredSubnetworksType[];
  setDesiredSubnetworks: Dispatch<SetStateAction<DesiredSubnetworksType[]>>;
  readyToCalculate: boolean;
  calculationSummary: CalculationSummaryType[];
  setCalculationSummary: Dispatch<SetStateAction<CalculationSummaryType[]>>;
};

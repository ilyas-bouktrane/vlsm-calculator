import { Dispatch, SetStateAction } from "react";

export type DesiredSubnetworksType = {
  id: string;
  hosts: number;
}[];

export type VlsmContextType = {
  rootNetwork: string;
  setRootNetwork: Dispatch<SetStateAction<string>>;
  desiredSubnetworks: DesiredSubnetworksType;
  setDesiredSubnetworks: Dispatch<SetStateAction<DesiredSubnetworksType>>;
  readyToCalculate: boolean;
};

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CalculationSummaryType, DesiredSubnetworksType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateIpv4NetworkAddressFormat(addr: string): boolean {
  const parts = addr.split("/");
  if (parts.length !== 2 || !parts.every((p) => p.length !== 0)) return false;

  const [address, cidrStr] = parts;
  const cidr = Number(cidrStr);

  if (isNaN(cidr) || cidr < 0 || cidr > 32 || cidrStr.length > 2) return false;

  const bytes = address.split(".");
  if (bytes.length !== 4) return false;

  return bytes.every((b) => {
    const num = Number(b);
    return !isNaN(num) && num >= 0 && num <= 255 && b === num.toString();
  });
}

export function decCidrToBinMask(cidr: number) {
  return (0xffffffff << (32 - cidr)) >>> 0;
}

export function decAddrToBinAddr(bytes: number[]) {
  return bytes.reduce((prev, curr) => (prev << 8) | curr, 0x00000000) >>> 0;
}

export function binAddrToDecAddr(addr: number) {
  return [24, 16, 8, 0].map((shift) => (addr >>> shift) & 0xff);
}

export function validateIpv4SubnetAddress(addr: string) {
  const [addressStr, cidrStr] = addr.split("/");
  const cidr = Number(cidrStr);

  const binMask = decCidrToBinMask(cidr);
  const binAddr = decAddrToBinAddr(addressStr.split(".").map((b) => Number(b)));

  const closestValidSubnet = binAddrToDecAddr(
    ((binAddr >>> (32 - cidr)) << (32 - cidr)) >>> 0,
  );
  const isValid = (binAddr & binMask) >>> 0 === binAddr;
  return { closestValidSubnet, isValid };
}

export function getSubnetMinSizeFromHosts(hosts: number) {
  return Math.pow(2, Math.ceil(Math.log2(hosts + 2)));
}

export function validateRootNetMaskForSubnets(
  rootNetwork: string,
  subnets: DesiredSubnetworksType[],
) {
  const rootCidr = Number(rootNetwork.split("/")[1]);
  const rootCapacity = Math.pow(2, 32 - rootCidr);

  const totalNeeded = subnets.reduce(
    (prev, curr) => prev + getSubnetMinSizeFromHosts(curr.hosts),
    0,
  );

  const isValid = rootCapacity >= totalNeeded;
  const closestValidMask = 32 - Math.ceil(Math.log2(totalNeeded));

  return { isValid, closestValidMask };
}

export function calculateVlsm(
  rootNetwork: string,
  subnets: DesiredSubnetworksType[],
) {
  const binRootAddr = decAddrToBinAddr(
    rootNetwork
      .split("/")[0]
      .split(".")
      .map((byte) => Number(byte)),
  );

  let prevAddr = binRootAddr;
  return subnets
    .sort((a, b) => b.hosts - a.hosts)
    .map(({ hosts, id: name }): CalculationSummaryType => {
      const hostsBits = Math.ceil(Math.log2(hosts + 2));
      const cidr = 32 - hostsBits;

      const binMask = (0xffffffff << hostsBits) >>> 0;
      const binNextAddr = prevAddr + Math.pow(2, hostsBits);
      const binCurrAddr = prevAddr;

      prevAddr = binNextAddr;
      return {
        name,
        hosts,
        cidr,
        mask: binAddrToDecAddr(binMask).join("."),
        address: binAddrToDecAddr(binCurrAddr).join("."),
        broadcast: binAddrToDecAddr(binNextAddr - 1).join("."),
        range: [
          binAddrToDecAddr(binCurrAddr + 1).join("."),
          binAddrToDecAddr(binNextAddr - 2).join("."),
        ],
      };
    });
}

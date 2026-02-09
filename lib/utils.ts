import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateIpv4NetworkAddressFormat(addr: string): boolean {
  const parts = addr.split("/");
  if (parts.length !== 2 || !parts.every((p) => p.length !== 0)) return false;
  console.log(parts);

  const [address, cidrStr] = parts;
  const cidr = Number(cidrStr);

  if (isNaN(cidr) || cidr < 0 || cidr > 32 || cidrStr.length > 2) return false;

  const bytes = address.split(".");
  if (bytes.length !== 4) return false;

  return bytes.every((b) => {
    const num = parseInt(b, 10);
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
  const cidr = parseInt(cidrStr);

  const binMask = decCidrToBinMask(cidr);
  const binAddr = decAddrToBinAddr(
    addressStr.split(".").map((b) => parseInt(b)),
  );

  const closestValidSubnet = binAddrToDecAddr(
    ((binAddr >>> (32 - cidr)) << (32 - cidr)) >>> 0,
  );
  const isValid = (binAddr & binMask) >>> 0 === binAddr;
  return { closestValidSubnet, isValid };
}

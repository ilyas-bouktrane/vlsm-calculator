import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateIpv4NetworkAddressFormat(addr: string): boolean {
  const parts = addr.split("/");
  if (parts.length !== 2) return false;

  const [address, cidrStr] = parts;
  const cidr = parseInt(cidrStr, 10);

  if (isNaN(cidr) || cidr < 0 || cidr > 32 || cidrStr.length > 2) return false;

  const bytes = address.split(".");
  if (bytes.length !== 4) return false;

  return bytes.every((b) => {
    const num = parseInt(b, 10);
    return !isNaN(num) && num >= 0 && num <= 255 && b === num.toString();
  });
}

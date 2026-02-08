import { createContext } from "react";

export const VlsmContext = createContext(null);

export default function VlsmProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VlsmContext.Provider value={null}>{children}</VlsmContext.Provider>;
}
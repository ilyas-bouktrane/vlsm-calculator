"use client";

import Header from "@/components/vlsm/header";
import VlsmContextProvider from "@/components/vlsm/vlsm-provider";
import UserInputs from "@/components/vlsm/user-inputs";
import CalcResetButtons from "@/components/vlsm/calc-reset-buttons";
import SubnetAllocation from "@/components/vlsm/subnet-allocation";
import SubnetInfoCards from "@/components/vlsm/subnet-info-cards";
import CalculationSummary from "@/components/vlsm/calculation-summary";
import Footer from "@/components/vlsm/footer";
import RootUsageInfoCards from "@/components/vlsm/root-usage-info-cards";
import RootUsageAllocation from "@/components/vlsm/root-usage-allocation";

const PageDescription = () => (
  <span className="text-muted-foreground text-sm my-3">
    A tool that helps network engineers efficiently divide an IP network into
    subnets of varying sizes using Variable Length Subnet Masking (VLSM). It
    calculates subnet addresses, broadcast addresses, and host ranges for
    optimized IP allocation.
  </span>
);

export default function Index() {
  return (
    <VlsmContextProvider>
      <Header />
      <main className="p-3 flex flex-col gap-4 my-27 sm:my-19">
        <PageDescription />
        <UserInputs />
        <CalcResetButtons />
        <SubnetAllocation />
        <SubnetInfoCards />
        <CalculationSummary />
        <RootUsageInfoCards />
        <RootUsageAllocation />
      </main>
      <Footer />
    </VlsmContextProvider>
  );
}

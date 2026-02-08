"use client";

import Header from "@/components/vlsm/header";
import VlsmProvider from "@/components/vlsm/vlsm-provider";
import UserInputs from "@/components/vlsm/user-inputs";
import CalcResetButtons from "@/components/vlsm/calc-reset-buttons";
import AllocationBar from "@/components/vlsm/allocation-bar";
import InfoCards from "@/components/vlsm/info-cards";
import SubnetTable from "@/components/vlsm/subnet-table";
import Footer from "@/components/vlsm/footer";

const PageDescription = () => (
  <span className="text-foreground text-sm my-3">
    A tool that helps network engineers efficiently divide an IP network into
    subnets of varying sizes using Variable Length Subnet Masking (VLSM). It
    calculates subnet addresses, broadcast addresses, and host ranges for
    optimized IP allocation.
  </span>
);

export default function Index() {
  return (
    <VlsmProvider>
      <Header />
      <main className="p-3 flex flex-col gap-4">
        <PageDescription />
        <UserInputs />
        <CalcResetButtons />
        <AllocationBar />
        <InfoCards />
        <SubnetTable />
      </main>
      <Footer />
    </VlsmProvider>
  );
}

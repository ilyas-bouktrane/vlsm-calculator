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
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

const PageDescription = () => {
  const t = useTranslations("Page");
  return (
    <span className="text-muted-foreground text-sm my-3">
      {t("description")}
    </span>
  );
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default function PageClient({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

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

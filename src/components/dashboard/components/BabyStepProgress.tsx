import useAccounts from "@/components/accounts/hooks/useAccounts";
import RenderStep from "@/components/babysteps/components/RenderSteps";
import useBabySteps from "@/components/babysteps/hooks/useBabySteps";
import getCurrentBabyStep from "@/components/babysteps/methods/getCurrentBabyStep";
import useBudgetItems from "@/components/budget/hooks/getBudgetItems";
import React, { useEffect, useState } from "react";

const BabyStepProgress = () => {
  const { data: babyStepdata, isFetched } = useBabySteps();
  const { data: budgetdata, isFetched: isbudgetFetched } = useBudgetItems();
  const { data: accountData, isFetched: isaccountFetched } = useAccounts();
  const [currentStep, setcurrentStep] = useState<any>(null);
  useEffect(() => {
    if (isFetched && isbudgetFetched && isaccountFetched) {
      console.log(accountData.data);
      setcurrentStep(getCurrentBabyStep(accountData.data, budgetdata.data)!);
    }
  }, [babyStepdata, budgetdata, accountData]);

  return currentStep != null ? (
    <div className="container w-[600px] bg-[#fff] rounded-[20px] shadow-lg">
      <div className="w-full flex justify-between">
        <h3 className="text-2xl font-bold pt-[20px] pl-[20px]">
          Baby Step Progress
        </h3>
        <h3 className="text-2xl text-[#00000080] font-bold pt-[20px] pr-[20px]">
          Step: {currentStep}
        </h3>
      </div>
      <RenderStep currentStep={currentStep} accounts={accountData.data} />
    </div>
  ) : (
    <div className="container w-[600px] h-[400px] bg-[#fff] rounded-[20px] shadow-lg"></div>
  );
};

export default BabyStepProgress;

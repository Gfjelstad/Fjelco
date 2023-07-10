import React, { useEffect, useState } from "react";
import HeaderFinance from "../../components/finances/HeaderFinance";
import useBabySteps from "@/components/babysteps/hooks/useBabySteps";
import BabyStepComponent from "@/components/babysteps/components/BabyStepComponent";
import useBudgetItems from "@/components/budget/hooks/getBudgetItems";
import getCurrentBabyStep from "@/components/babysteps/methods/getCurrentBabyStep";
import useAccounts from "@/components/accounts/hooks/useAccounts";
import RenderStep from "@/components/babysteps/components/RenderSteps";

const Babysteps = () => {
  const { data: babyStepdata, isFetched } = useBabySteps();
  const { data: budgetdata, isFetched: isbudgetFetched } = useBudgetItems();
  const { data: accountData, isFetched: isaccountFetched } = useAccounts();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isFetched && isbudgetFetched && isaccountFetched)
      setCurrentStep(getCurrentBabyStep(accountData.data, budgetdata.data)!);
  }, [babyStepdata, budgetdata, accountData, "other"]);
  return (
    isFetched &&
    isaccountFetched &&
    isbudgetFetched && (
      <div className="w-full flex flex-col overflow-x-hidden items-center">
        <HeaderFinance title="Baby Steps" />
        <div className="w-full flex flex-col pt-[40px] !m-[0px]  overflow-x-hidden items-center">
          {babyStepdata.data.map((step: any) => {
            if (currentStep > 3) {
              return (
                <BabyStepComponent
                  key={`step-${step.step}`}
                  currentStep={
                    step.step > 3 && step.step != 7 ? step.step : currentStep
                  }
                  step={step}
                >
                  <RenderStep
                    currentStep={currentStep}
                    accounts={accountData.data}
                  />
                </BabyStepComponent>
              );
            } else {
              return (
                <BabyStepComponent
                  currentStep={currentStep}
                  step={step}
                  key={`step-${step.step}`}
                >
                  <RenderStep
                    currentStep={currentStep}
                    accounts={accountData.data}
                  />
                </BabyStepComponent>
              );
            }
          })}
        </div>
        ;
      </div>
    )
  );
};

export default Babysteps;

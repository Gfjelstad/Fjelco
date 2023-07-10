import React, { ReactNode } from "react";

type NextElementProps<T = {}> = T & {
  children?: ReactNode;
  currentStep: number;
  step: any;
};

const BabyStepComponent = (props: NextElementProps) => {
  const { step, children, currentStep } = props;
  return (
    <div
      className={`w-[80%] mt-[25px] mr-[0px] overflow-hidden rounded-[10px] shadow-lg bg-[#fff] ${
        currentStep === step.step ? "border border-[#000000]" : ""
      }`}
    >
      <div className="w-full h-[100px] flex justify-between p-[25px] pl-[40px] pr-[40px]">
        <div
          className={`flex ${
            currentStep === step.step ? "items-center" : "flex-col items-start"
          }`}
        >
          <h2 className="text-[23px] text-[#00000080]">{step.id}:</h2>
          <h2
            className={`text-[23px]  ${
              currentStep === step.step
                ? "text-[#000000] ml-[15px]"
                : "text-[#00000070]"
            }`}
          >
            {step.title}
          </h2>
        </div>
        <div
          className={`w-[30px] h-[30px] rounded-[15px] border border-[#00000070] ${
            currentStep > step.step ? "bg-[#0066FF]" : "bg-[transparent]"
          }`}
        ></div>
      </div>
      <div
        className={` overflow-hidden flex flex-col items-center ${
          currentStep === step.step ? "h-max" : "h-[0px]"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default BabyStepComponent;

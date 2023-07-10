import React from "react";
import get36MoExpences from "./get36MoExpences";
import UpdateAccount from "@/components/accounts/methods/UpdateAccount";

const getCurrentBabyStep = (accounts: any, budget: any) => {
  const checkStep1 = () => {
    return (
      accounts.filter((account: any) => account.id === "Emergency Fund")[0]
        .amount >= 1000
    );
  };
  const checkStep2 = () => {
    // console.log(accounts.filter((account: any) => account.type === "debt"));
    if (accounts.filter((account: any) => account.type === "debt").length > 0) {
      console.log("there are account");
      return !accounts.some(
        (account: any) =>
          account.type === "debt" &&
          account.debtType != "house" &&
          account.amount != 0
      );
    } else {
      console.log("there are none");

      return true;
    }
  };
  const checkStep3 = () => {
    const emergencyFund = accounts.filter(
      (account: any) => account.id === "Emergency Fund"
    )[0];
    const expences = get36MoExpences(budget);
    if (checkStep2() && emergencyFund.goal != expences) {
      UpdateAccount({ ...emergencyFund, goal: expences });
      if (expences <= emergencyFund.amount) {
        return true;
      } else {
        return false;
      }
    } else {
      if (emergencyFund.goal <= emergencyFund.amount) {
        return true;
      } else {
        return false;
      }
    }
  };
  const checkStep4 = () => {
    return false;
  };
  const checkStep5 = () => {
    return false;
  };
  const checkStep6 = () => {
    return false;
  };
  const checkStep7 = () => {
    return false;
  };

  const validator = [
    checkStep1,
    checkStep2,
    checkStep3,
    checkStep4,
    checkStep5,
    checkStep6,
    checkStep7,
  ];
  for (let i = 0; i < validator.length; i++) {
    if (!validator[i]()) {
      return i + 1;
    } else if (i == validator.length - 1) {
      return 0;
    }
  }
};

export default getCurrentBabyStep;

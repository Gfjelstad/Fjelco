import React from "react";
import Progressbar from "./Progressbar";

const RenderStep1 = (props: any) => {
  return (
    <div className="w-full flex flex-col gap-[20px] pb-[50px] items-start pl-[30px] pt-[30px]">
      <Progressbar
        name={props.account.id}
        amount={props.account.amount}
        limit={props.account.goal}
      />
    </div>
  );
};
const RenderStep2 = (props: any) => {
  return (
    <div className="w-full flex flex-col gap-[20px] pb-[50px] items-start pl-[30px] pt-[30px]">
      {props.accounts
        .filter(
          (account: any) =>
            account.type == "debt" && account.debtType != "house"
        )
        .map((account: any) => {
          return (
            <Progressbar
              name={account.id}
              amount={account.amount + account.total}
              limit={account.total}
            />
          );
        })}
    </div>
  );
};
const RenderStep4 = (props: any) => {
  return (
    <div className="w-full flex flex-col gap-[20px] pb-[50px] items-start pl-[30px] pt-[30px]">
      {props.accounts
        .filter(
          (account: any) =>
            account.type == "debt" && account.debtType == "house"
        )
        .map((account: any) => {
          return (
            <Progressbar
              name={account.id}
              amount={account.amount + account.total}
              limit={account.total}
            />
          );
        })}
    </div>
  );
};

const RenderStep = (props: any) => {
  console.log(props.accounts);
  switch (props.currentStep) {
    case 1:
      return (
        <RenderStep1
          account={
            props.accounts.filter(
              (account: any) => account.id === "Emergency Fund"
            )[0]
          }
        />
      );
    case 2:
      return <RenderStep2 accounts={props.accounts} />;
    case 3:
      return (
        <RenderStep1
          account={
            props.accounts.filter(
              (account: any) => account.id === "Emergency Fund"
            )[0]
          }
        />
      );
    case 4:
      return <RenderStep4 accounts={props.accounts} />;

    default:
      return (
        <RenderStep1
          account={
            props.accounts.filter(
              (account: any) => account.id === "Emergency Fund"
            )[0]
          }
        />
      );
  }
};

export default RenderStep;

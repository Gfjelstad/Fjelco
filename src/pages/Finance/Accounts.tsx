import React, { useState } from "react";
import HeaderFinance from "../../components/finances/HeaderFinance";
import useAccounts from "@/components/accounts/hooks/useAccounts";
import NewAccount from "@/components/accounts/components/NewAccount";
import addNewAccount from "@/components/accounts/methods/addNewAccount";
import UpdateAccount from "@/components/accounts/methods/UpdateAccount";
import DeleteAccount from "@/components/accounts/methods/deleteAccount";

const Accounts = () => {
  const [newAccount, setnewAccount] = useState<any | null>(null);
  const [editAccount, setEditAccount] = useState<any | null>(null);
  const [clickedAccount, setClickedAccount] = useState("");
  const {
    data: accountData,
    isLoading,
    refetch: refetchAccounts,
  } = useAccounts();

  function addCommas(number: number): string {
    const numberStr: string = String(number);
    const numDigits: number = numberStr.length;
    const commaCount: number = Math.floor((numDigits - 1) / 3);

    let result: string = "";
    for (let i = 0; i < numDigits; i++) {
      const digitIndex: number = numDigits - i - 1;
      result = numberStr[digitIndex] + result;
      if (i !== numDigits - 1 && i % 3 === 2) {
        result = "," + result;
      }
    }

    if (result[0] === "," || result[0] === "-") {
      if (result[0] === "-" && result[1] == ",") {
        return result.slice(0, 1) + result.slice(2, result.length).concat();
      } else if (result[0] === "-" && result[1] != ",") {
        return result;
      } else {
        return result.slice(1, result.length).concat();
      }
    } else {
      return result;
    }
  }
  return !isLoading ? (
    <div className="w-full flex flex-col items-center">
      <div
        className={`fixed w-[400px] bg-[#fff] duration-300 h-screen ${
          newAccount === null ? "right-[-400px]" : "right-[0px]"
        }`}
      >
        <NewAccount
          account={newAccount}
          setNewAccount={setnewAccount}
          onSubmit={async (item: any) => {
            // console.log("submit", item);
            if (item.type === "fund") {
              console.log("fund", item);
              if (
                accountData.data.some((account: any) => account.id === item.id)
              ) {
                await UpdateAccount({
                  ...item,
                  amount: Number(item.amount),
                }).then(() => {
                  refetchAccounts();
                  setnewAccount(null);
                });
              } else {
                await addNewAccount({
                  ...item,
                  amount: Number(item.amount),
                }).then(() => {
                  refetchAccounts();
                  setnewAccount(null);
                });
              }
            } else if (item.type === "debt") {
              console.log("debt", item);
              if (
                accountData.data.some((account: any) => account.id === item.id)
              ) {
                await UpdateAccount({
                  ...item,
                  amount: -Number(item.amount),
                }).then(() => {
                  refetchAccounts();
                  setnewAccount(null);
                });
              } else {
                await addNewAccount({
                  ...item,
                  amount: -Number(item.amount),
                }).then(() => {
                  refetchAccounts();
                  setnewAccount(null);
                });
              }
            }
          }}
        />
      </div>
      <HeaderFinance title="Accounts" />
      <div className="w-[90%]   flex flex-col">
        <div className="w-full h-[80px] flex justify-end items-center">
          <button
            className="h-[30px] w-[150px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
            onClick={async () => {
              setnewAccount({
                type: "debt",
              });
            }}
          >
            <h2 className="text-[#fff] text-[18px]">+ New Account </h2>
          </button>
        </div>
        <div className="w-full flex items-center justify-start overflow-hidden">
          <h2 className="text-[35px] text-[#00000090] mr-[25px]">Debt</h2>
          <div className="h-[2px] w-[100%] bg-[#00000050]" />
        </div>
        <div className="w-full flex gap-[30px] flex-wrap pr-[200px]">
          {accountData.data
            .filter((item: any) => item.type === "debt" && item.amount < 0)
            .map((account: any) => {
              return (
                <div
                  className="w-[200px] p-[15px] relative h-[250px] bg-[#fff] rounded-[10px] shadow-lg"
                  key={`item-${account.id}`}
                  onClick={() => {
                    clickedAccount === account.id
                      ? setClickedAccount("")
                      : setClickedAccount(account.id);
                  }}
                >
                  <h2 className="text-[28px]">
                    {account.id}{" "}
                    <span className="text-[18px] text-[#00000080]">
                      {account.debtType === "asset" ? "asset" : ""}
                    </span>
                  </h2>
                  <div className="w-full mt-[10px] flex justify-between">
                    <h2 className="text-[16px]">Length</h2>
                    <h2 className="text-[16px]">{account.length} months</h2>
                  </div>
                  <div className="w-full  flex justify-between">
                    <h2 className="text-[16px]">Interest Rate</h2>
                    <h2 className="text-[16px]">{account.interest}%</h2>
                  </div>
                  <div className="absolute bottom-0 right-0 left-0 flex flex-col items-center justify-end">
                    <div className="w-full flex justify-between pl-[10px] pr-[10px]">
                      <h2 className="text-[21px]">Amount</h2>
                      <h2
                        className={`text-[21px] ${
                          account.amount < 0 ? "text-[red]" : "text-[#000000]"
                        }`}
                      >
                        ${addCommas(account.amount)}
                      </h2>
                    </div>
                    <div
                      className={`${
                        clickedAccount === account.id ? "h-[30px]" : "h-[0px]"
                      } overflow-hidden duration-200 w-full flex items-center justify-evenly`}
                    >
                      <button
                        className="h-[20px] w-[60px] pt-[5px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
                        onClick={async () => {
                          setnewAccount(account);
                        }}
                      >
                        <h2 className="text-[#fff] text-[15px]">Edit</h2>
                      </button>
                      <button
                        className="h-[20px] pt-[5px] w-[20px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
                        onClick={async () => {
                          await DeleteAccount(account).then(() =>
                            refetchAccounts()
                          );
                        }}
                      >
                        <h2 className="text-[#fff] text-[15px]">X</h2>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="w-full flex items-center mt-[40px] justify-start overflow-hidden">
          <h2 className="text-[35px] text-[#00000090] mr-[25px]">Funds</h2>
          <div className="h-[2px] w-[100%] bg-[#00000050]" />
        </div>
        <div className="w-full flex gap-[30px] flex-wrap pr-[200px]">
          {accountData.data
            .filter((item: any) => item.type === "fund")
            .map((account: any) => {
              return (
                <div
                  key={`item-${account.id}`}
                  className="w-[200px] p-[15px] relative h-[250px] bg-[#fff] rounded-[10px] shadow-lg"
                  onClick={() => {
                    clickedAccount === account.id
                      ? setClickedAccount("")
                      : setClickedAccount(account.id);
                  }}
                >
                  <h2 className="text-[28px]">
                    {account.id}{" "}
                    <span className="text-[18px] text-[#00000080]">
                      {account.asset ? "asset" : ""}
                    </span>
                  </h2>
                  <div className="w-full mt-[10px] flex justify-between">
                    <h2 className="text-[16px]">Goal</h2>
                    <h2 className="text-[16px]">${addCommas(account.goal)}</h2>
                  </div>

                  <div className="absolute bottom-0 right-0 left-0 flex flex-col items-center justify-end">
                    <div className="w-full flex justify-between pl-[10px] pr-[10px]">
                      <h2 className="text-[21px]">Amount</h2>
                      <h2
                        className={`text-[21px] ${
                          account.amount > account.goal
                            ? "text-[green]"
                            : "text-[#000000]"
                        }`}
                      >
                        ${addCommas(account.amount)}
                      </h2>
                    </div>
                    <div
                      className={`${
                        clickedAccount === account.id ? "h-[30px]" : "h-[0px]"
                      } overflow-hidden duration-200 w-full flex items-center justify-evenly`}
                    >
                      <button
                        className="h-[20px] w-[60px] pt-[5px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
                        onClick={async () => {
                          setnewAccount(account);
                        }}
                      >
                        <h2 className="text-[#fff] text-[15px]">Edit</h2>
                      </button>
                      {account.id == "Emergency Fund" ||
                      account.id == "Checking Account" ? null : (
                        <button
                          className="h-[20px] pt-[5px] w-[20px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
                          onClick={async () => {
                            await DeleteAccount(account).then(() =>
                              refetchAccounts()
                            );
                          }}
                        >
                          <h2 className="text-[#fff] text-[15px]">X</h2>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Accounts;

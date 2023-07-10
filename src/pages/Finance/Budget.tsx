import React, { useState, useEffect } from "react";
import HeaderFinance from "../../components/finances/HeaderFinance";
import BudgetItem from "@/components/budget/BudgetItem";
import useBudgetItems from "@/components/budget/hooks/getBudgetItems";
import useInfo from "@/components/budget/hooks/useInfo";
import axios from "axios";
import updateBudget from "@/components/budget/methods/updateBudget";
import updateMonth from "@/components/month/methods/updateMonth";
import useThisMonth from "@/components/month/hooks/useThisMonth";

const Budget = () => {
  const {
    data: budgetData_DB,
    isLoading,
    isRefetching,
    refetch: refetchBudget,
  } = useBudgetItems();
  const {
    data: myInfoDB,
    isLoading: isInfoLoading,
    refetch: refetchInfo,
  } = useInfo();
  const { data: monthData, refetch: refetchMonth } = useThisMonth();
  const [changed, setChanged] = useState(false);
  const [myInfo, setMyInfo] = useState<any>(null);
  const [budgetData, setBudgetData] = useState<any>(null);

  useEffect(() => {
    if (!isInfoLoading && !isLoading) {
      //   console.log(myInfoDB.data);
      setMyInfo(myInfoDB.data);
      setBudgetData(budgetData_DB.data);
    }
  }, [isInfoLoading, isLoading, isRefetching]);

  const handleSave = async () => {
    // console.log(budgetData);
    await updateBudget(budgetData)
      .then((res) => {
        updateMonth({ ...monthData.data[0], budget: budgetData });
        console.log(res);
        refetchMonth();
        refetchBudget();
      })
      .then(() => {
        setChanged(false);
      });
  };

  //   console.log(data.data)
  return budgetData != null && myInfo != null ? (
    <div className="w-full flex flex-col items-center">
      <HeaderFinance title="Budget" />
      <div className="w-[80%]  mt-[100px] mb-[40px] min-h-[400px] bg-[#fff] border border-[#00000010] rounded-[15px] shadow-xl">
        <div className="w-full p-[20px] h-[60px] flex items-center justify-between">
          <h2 className="text-[22px] text-[#00000070]">Monthly Cash Flow</h2>
          <div className="w-[300px] flex items-center h-[38px] rounded-[10px] border border-[#00000030]">
            <h2 className=" min-w-[180px] pl-[10px]  text-[16px] bg-[transparent] text-[#00000070]  ">
              Monthly Takehome Pay
            </h2>
            <input
              className=" w-[90px] border-l text-center border-r border-[#00000020] text-[17px] bg-[transparent] h-[100%] p-[10px]  "
              type="text"
              name=""
              placeholder="---"
              value={myInfo.Monthly_Income}
              id=""
              onChange={(e) => {
                setChanged(true);
                setMyInfo({ ...myInfo, Monthly_Income: e.target.value });
              }}
            />
            <h2 className=" w-[30px] text-center text-[17px] bg-[transparent] text-[#00000070]  ">
              $
            </h2>
          </div>
        </div>
        <div className="w-full gap-[30px] justify-center flex pb-[30px] mt-[30px] ">
          <div className="w-[45%]  mt-[40px]">
            {budgetData_DB.data
              .slice(0, Math.floor(budgetData.length / 2))
              .map((item: any, i: number) => {
                if ((i %= 0)) {
                }
                return (
                  <div className="w-[100%] pl-[5%] pr-[5%]" key={item.id}>
                    <BudgetItem
                      title={item.id}
                      items={item.items}
                      refetch={() => refetchBudget()}
                      income={myInfo.Monthly_Income}
                      onChange={(newItem: any) => {
                        setBudgetData(
                          budgetData.map((budgetItem: any) => {
                            if (budgetItem.id === item.id) {
                              if (budgetItem.items != newItem) {
                                setChanged(true);
                                return {
                                  ...budgetItem,
                                  items: newItem,
                                  total: newItem.reduce(
                                    (acc: any, obj: any) => acc + obj.budgeted,
                                    0
                                  ),
                                };
                              } else {
                                return budgetItem;
                              }
                            } else {
                              return budgetItem;
                            }
                          })
                        );
                      }}
                    />
                  </div>
                );
              })}
          </div>
          <div className="w-[45%] mt-[40px]">
            {budgetData_DB.data
              .slice(Math.floor(budgetData.length / 2))
              .map((item: any, i: number) => {
                if ((i %= 0)) {
                }
                return (
                  <div className="w-[100%] pl-[5%] pr-[5%]" key={item.id}>
                    <BudgetItem
                      title={item.id}
                      items={item.items}
                      refetch={() => refetchBudget()}
                      income={myInfo.Monthly_Income}
                      onChange={(newItem: any) => {
                        setBudgetData(
                          budgetData.map((budgetItem: any) => {
                            if (budgetItem.id === item.id) {
                              if (budgetItem.items != newItem) {
                                setChanged(true);
                                return {
                                  ...budgetItem,
                                  items: newItem,
                                  total: newItem.reduce(
                                    (acc: any, obj: any) => acc + obj.budgeted,
                                    0
                                  ),
                                };
                              } else {
                                return budgetItem;
                              }
                            } else {
                              return budgetItem;
                            }
                          })
                        );
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-[85%] flex justify-end justify-start">
          <div className=" flex mr-[10px] flex-col items-end justify-start">
            <h2 className="text-[#00000070] text-[23px]">Monthly Income:</h2>
            <h2 className="text-[#00000070] text-[23px]">Budget Total:</h2>
            <h2 className="text-[#00000070] text-[23px]">To Baby Steps:</h2>
          </div>
          <div className=" flex flex-col items-end justify-start">
            <h2 className="text-[#00000070] text-[23px]">
              ${myInfo.Monthly_Income}
            </h2>
            <h2 className="text-[#00000070] text-[23px]">
              ${budgetData.reduce((acc: any, obj: any) => acc + obj.total, 0)}
            </h2>
            <h2 className="text-[#00000070] text-[23px]">
              $
              {myInfo.Monthly_Income -
                budgetData.reduce((acc: any, obj: any) => acc + obj.total, 0)}
            </h2>
          </div>
        </div>
        <div className="w-full h-[30px] flex justify-center items-center">
          <button
            className={`h-[30px] mb-[20px] w-[150px] rounded-[10px] ${
              changed ? "" : "hidden"
            } bg-[#0066FF] flex items-center justify-center`}
            onClick={() => {
              handleSave();
            }}
          >
            <h2 className="text-[#fff] text-[18px]">Save</h2>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Budget;

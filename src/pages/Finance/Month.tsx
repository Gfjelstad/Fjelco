import React, { useEffect, useState } from "react";
import HeaderFinance from "../../components/finances/HeaderFinance";
import SectionComponent from "@/components/month/components/SectionComponent";
import useThisMonth from "@/components/month/hooks/useThisMonth";
import useInfo from "@/components/budget/hooks/useInfo";
import useBudgetItems from "@/components/budget/hooks/getBudgetItems";
import axios from "axios";
import { format } from "date-fns";
import createNewMonth from "@/components/month/methods/createNewMonth";
import updateMonth from "@/components/month/methods/updateMonth";
import BudgetTransaction from "@/components/month/components/BudgetTransaction";
import Table from "@/components/month/components/TestTable";
import useAccounts from "@/components/accounts/hooks/useAccounts";
import Accounttransaction from "@/components/month/methods/Accounttransaction";
import CompleteMonth from "@/components/month/methods/CompleteMonth";
import getNextMonth from "@/components/month/methods/getNextMonth";
import deleteMonth from "@/components/month/methods/deleteMonth";

const monthItem = {
  income: [],
  transactions: [],
  budget: [],
};

const Month = () => {
  const [month, setMonth] = useState<any>(null);
  //   const [Income, setIncome] = useState<any[]>([]);
  const [incomeInput, setIncomeInput] = useState(0);
  //   const [transactions, setTransactions] = useState([]);
  const [newBudgetTransaction, setNewBudgetTransaction] = useState<any | null>(
    null
  );
  const [accountTab, setAccountTab] = useState("from");
  const [fromAccounts, setFromAccounts] = useState(["Income"]);
  const [toAccounts, setToAccounts] = useState(["Truck Fund"]);
  const [newTransaction, setNewTransaction] = useState<any | null>(null);
  const {
    data: monthData,
    refetch: refetchMonth,
    isRefetching,
  } = useThisMonth();
  const { data: infoData } = useInfo();
  const { data: budgetData } = useBudgetItems();
  const { data: accountData } = useAccounts();

  useEffect(() => {
    if (typeof monthData != "undefined") {
      const thisDate = format(new Date(), "MM-yyyy");
      console.log(monthData.data.filter((month: any) => month.id === thisDate));
      const thisMonth = monthData.data.filter(
        (month: any) => month.id === thisDate
      )[0];
      console.log(monthData.data);
      setMonth(monthData.data[0]);
      setFromAccounts([
        "Income",
        ...accountData.data
          .map((item: any) => {
            if (item.type === "fund") {
              return item.id;
            }
          })
          .filter((item: any) => typeof item != "undefined"),
      ]);
      setToAccounts([
        ...accountData.data.map((item: any) => {
          return item.id;
        }),
      ]);
      //   setIncome(monthData.data[0].income);
      //   setTransactions(monthData.data[0].transactions);
    }
  }, [monthData, infoData, budgetData, accountData, isRefetching]);

  const handleAddIncome = async () => {
    if (incomeInput > 0) {
      updateMonth({
        ...month,
        income: [
          ...month.income,
          { amount: incomeInput, date: format(new Date(), "MM/dd/yy") },
        ],
      }).then(() => {
        refetchMonth();
      });
    }
  };

  const handleCompleteMonth = async () => {
    const thisDate = format(new Date(), "MM-yyyy");
    const replaceMonth = async (date: string) => {
      console.log("monthData sent to complete month", month);
      await CompleteMonth(month, accountData.data).then(async () => {
        await deleteMonth(month).then(async () => {
          await createNewMonth(budgetData.data, date).then(() => {
            refetchMonth();
          });
        });
      });
    };
    // console.log(getNextMonth());
    if (month.id === thisDate) {
      replaceMonth(getNextMonth());
    } else {
      replaceMonth(format(new Date(), "MM-yyyy"));
    }
  };

  return month != null ? (
    <div className="flex flex-col items-center">
      <div className="w-full bg-[#fff] h-[70px] flex items-center justify-between pl-[30px] pr-[30px] border-b-[2px] border-[#00000030]  ">
        <h2 className="text-[#000000] text-[25px]">
          This Month{" "}
          <span className="text-[18px] text-[#00000080]">{month.id}</span>
        </h2>
        <button
          className="h-[30px] w-[150px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
          onClick={async () => {
            console.log(handleCompleteMonth());
          }}
        >
          <h2 className="text-[#fff] text-[18px]">Complete Month</h2>
        </button>
      </div>
      <div className="w-full  flex justify-center gap-[5%] p-[50px]">
        <div className="flex flex-col h-max w-[40%] items-center gap-[50px] ">
          {/* Income Section */}
          <div className="bg-[#fff] rounded-[10px] shadow-lg h-[200px] w-[100%] min-w-[300px] flex flex-col items-center">
            <div className="border-b border-[#00000030] w-full h-[50px] items-center pl-[20px] pr-[20px] flex justify-between">
              <h2 className="text-[#000000] text-[25px]">Income</h2>
              <div className="h-[30px] overflow-hidden w-[200px] rounded-[8px] border border-[#00000030] flex justify between">
                <input
                  type="number"
                  className="h-full w-[70%] text-[black] text-[17px] pl-[5px] "
                  name=""
                  id=""
                  value={incomeInput == 0 ? "" : incomeInput}
                  placeholder="$---"
                  onChange={(e) => {
                    setIncomeInput(Number(e.target.value));
                  }}
                />
                <button
                  className="h-full w-[30%]  border-l border-[#00000040] flex items-center justify-center"
                  onClick={() => {
                    handleAddIncome();
                  }}
                >
                  <h2 className="text-[#000000] font-bold text-[14px]">Add</h2>
                </button>
              </div>
            </div>
            <div className="w-[80%] pr-[20px] h-[20px] mt-[10px] flex justify-between items-center ">
              <h2 className="text-[#00000070]">Amount</h2>
              <h2 className="text-[#00000070]">Total</h2>
            </div>
            <div className="w-full h-[130px] overflow-y-scroll flex flex-col items-center pb-[20px]">
              {month.income.map((item: any, i: number) => {
                return (
                  <div
                    className="w-[80%] h-[21px] mt-[10px] flex justify-between relative items-center "
                    key={`income-${item.date}`}
                  >
                    <div className="h-[1px] absolute top-[10px] left-[0px] right-[0px] bg-[#00000040]" />
                    <h2 className="bg-[#fff] z-[10]  pr-[10px]">
                      ${item.amount}{" "}
                      <span className="text-[13px] text-[#00000060]">
                        {item.date}
                      </span>
                    </h2>
                    <h2 className="bg-[#fff] z-[10] pl-[10px] ">
                      $
                      {Number(
                        month.income
                          .slice(0, i + 1)
                          .reduce((acc: any, obj: any) => acc + obj.amount, 0)
                      )}
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Send From Section */}
          <div className="bg-[#fff] rounded-[10px] shadow-lg h-[200px] w-[100%] min-w-[300px] flex flex-col items-center">
            <div className="border-b border-[#00000030] w-full h-[50px] items-center pl-[20px] pr-[20px] flex justify-between">
              <h2
                className={` ${
                  accountTab === "from" ? "text-[#000000]" : " text-[#00000060]"
                } cursor-pointer text-[25px]`}
                onClick={() => {
                  setAccountTab("from");
                }}
              >
                Send From
              </h2>
              <h2
                className={` ${
                  accountTab === "to" ? "text-[#000000]" : " text-[#00000060]"
                } cursor-pointer text-[25px]`}
                onClick={() => {
                  setAccountTab("to");
                }}
              >
                Send To
              </h2>
            </div>
            <div className="w-[100%] pr-[20px] h-[20px] mt-[10px] border-b border-[#00000030] flex justify-center items-center ">
              <h2 className="text-[#00000070]">Account</h2>
            </div>
            <div className="w-full h-[630px] overflow-y-scroll flex overflow-x-hidden  flex-col items-center pb-[20px]">
              {accountTab === "from"
                ? fromAccounts.map((account) => {
                    return (
                      <button
                        className="w-full h-[30px] hover:scale-[1.01] border-b border-[#00000030] flex items-center justify-center"
                        key={`account-${account}`}
                        onClick={() => {
                          setNewTransaction({
                            to: "",
                            from: account,
                            amount: 0,
                            date: "",
                          });
                        }}
                      >
                        <h2 className="text-[#000000]">{account}</h2>
                      </button>
                    );
                  })
                : toAccounts.map((account) => {
                    return (
                      <button
                        key={`account-${account}`}
                        className="w-full h-[30px] hover:scale-[1.01] border-b border-[#00000030] flex items-center justify-center"
                        onClick={() => {
                          setNewTransaction({
                            to: account,
                            from: "",
                            amount: 0,
                            date: "",
                          });
                        }}
                      >
                        <h2 className="text-[#000000]">{account}</h2>
                      </button>
                    );
                  })}
            </div>
          </div>
        </div>
        {/* Budget Items Section */}
        <div className="bg-[#fff] h-[450px] rounded-[10px] shadow-lg w-[40%] min-w-[300px] flex flex-col items-center">
          <div className="border-b border-[#00000030] w-full h-[50px] items-center pl-[20px] pr-[20px] flex justify-between">
            <h2 className="text-[#000000] text-[25px]">Budget Items</h2>
          </div>
          <div className="w-[80%] pr-[20px] h-[20px] mt-[10px] flex justify-between items-center ">
            <h2 className="text-[#00000070]">Item</h2>
            <h2 className="text-[#00000070]">Remaining</h2>
          </div>
          <div className="w-full h-[630px] overflow-y-scroll flex flex-col items-center pb-[20px]">
            {month.budget.map((category: any, i: number) => {
              //   console.log("category", category.items);
              return category.items.map((item: any) => {
                if (item.budgeted > 0) {
                  return (
                    <button
                      key={item.category}
                      className="w-[80%] rounded-[5px]  hover:shadow-sm hover:border-[#00000010] duration-200 hover:scale-[1.01] h-[21px] mt-[10px] flex justify-between relative items-center "
                      onClick={() => {
                        console.log("item", item);
                        console.log("category", category);
                        setNewTransaction(null);
                        setNewBudgetTransaction({
                          item: item,
                          category: category,
                        });
                      }}
                    >
                      <div className="h-[1px] absolute top-[10px] left-[0px] right-[0px] bg-[#00000040]" />
                      <h2
                        className={`bg-[#fff] z-[10] pr-[10px] ${
                          Number(item.budgeted) - Number(item.spent) > 0
                            ? "text-[#000000]"
                            : "text-[#00000060]"
                        }`}
                      >
                        {item.title}{" "}
                        <span className="text-[13px] text-[#00000060]">
                          {category.id}
                        </span>
                      </h2>
                      <h2
                        className={`bg-[#fff] z-[10] pl-[10px] ${
                          Number(item.budgeted) - Number(item.spent) > 0
                            ? "text-[#000000]"
                            : "text-[green]"
                        }`}
                      >
                        ${Number(item.budgeted) - Number(item.spent)}
                      </h2>
                    </button>
                  );
                }
              });
            })}
          </div>
        </div>
      </div>
      {/* Journal Section */}
      <div className="bg-[#fff] h-min rounded-[10px] shadow-lg w-[80%] min-w-[300px] flex flex-col items-center">
        <div className="border-b border-[#00000030] w-full h-[50px] items-center pl-[20px] pr-[20px] flex justify-between">
          <h2 className="text-[#000000] text-[25px]">Journal</h2>
          <button
            className="h-[30px] w-[150px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
            onClick={async () => {}}
          >
            <h2
              className="text-[#fff] text-[18px]"
              onClick={() => {
                setNewBudgetTransaction(null);
                setNewTransaction({
                  to: "",
                  from: "",
                  amount: 0,
                  date: "",
                });
              }}
            >
              New Transaction
            </h2>
          </button>
          <h2 className="text-[#00000070] text-[25px]">
            Remaining: $
            {month.income.reduce((acc: any, obj: any) => acc + obj.amount, 0) -
              month.transactions
                .filter((item: any) => item.from === "Income")
                .reduce((acc: any, obj: any) => acc + obj.amount, 0)}
          </h2>
        </div>

        <Table
          transactions={month.transactions}
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
          openBudget={newBudgetTransaction != null}
          fromAccounts={fromAccounts}
          toAccounts={toAccounts}
          onSubmit={async (transaction: any) => {
            return await Accounttransaction(
              transaction.to,
              transaction.from,
              Number(transaction.amount),
              accountData.data
            ).then(async (res: any) => {
              console.log(res);
              if (typeof res != "undefined" && res[0].status === 200) {
                return await updateMonth({
                  ...month,
                  transactions: [
                    ...month.transactions,
                    {
                      ...transaction,
                      amount: Number(transaction.amount),
                    },
                  ],
                }).then(() => {
                  refetchMonth();
                  setNewTransaction(null);
                  return true;
                });
              } else {
                return false;
              }
            });
          }}
          budgetInput={
            <BudgetTransaction
              transaction={newBudgetTransaction}
              onCancel={() => {
                setNewBudgetTransaction(null);
              }}
              onComplete={async (value: number) => {
                console.log();
                await updateMonth({
                  ...month,
                  transactions: [
                    ...month.transactions,
                    {
                      amount: Number(value),
                      to: newBudgetTransaction.item.title,
                      from: "Income",
                      date: format(new Date(), "MM/dd/yyyy"),
                    },
                  ],
                  budget: month.budget.map((item: any) => {
                    if (item.id === newBudgetTransaction.category.id) {
                      return {
                        ...item,
                        items: item.items.map((subCategory: any) => {
                          if (
                            subCategory.title ===
                            newBudgetTransaction.item.title
                          ) {
                            return { ...subCategory, spent: value };
                          } else {
                            return subCategory;
                          }
                        }),
                      };
                    } else {
                      return item;
                    }
                  }),
                }).then(() => {
                  refetchMonth();
                  setNewBudgetTransaction(null);
                });
              }}
            />
          }
        />

        {/* <BudgetTransaction
          transaction={newBudgetTransaction}
          onCancel={() => {
            setNewBudgetTransaction(null);
          }}
          onComplete={async (value: number) => {
            console.log();
            await updateMonth({
              ...month,
              transactions: [
                ...month.transactions,
                {
                  amount: value,
                  to: newBudgetTransaction.item.title,
                  from: "Income",
                  date: format(new Date(), "MM/dd/yyyy"),
                },
              ],
              budget: month.budget.map((item: any) => {
                if (item.id === newBudgetTransaction.category.id) {
                  return {
                    ...item,
                    items: item.items.map((subCategory: any) => {
                      if (
                        subCategory.title === newBudgetTransaction.item.title
                      ) {
                        return { ...subCategory, spent: value };
                      } else {
                        return subCategory;
                      }
                    }),
                  };
                } else {
                  return item;
                }
              }),
            }).then(() => {
              refetchMonth();
              setNewBudgetTransaction(null);
            });
          }}
        /> */}
        {/* {month.transactions.map((category: any, i: number) => {})} */}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Month;

import AddNew from "@/assets/Icons/AddNew";
import ArrowIcon from "@/assets/Icons/ArrowIcon";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckIcon from "@/assets/Icons/CheckIcon";

const BudgetItem = (props: any) => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [adding, setAdding] = useState(false);
  const [budget, setBudget] = useState(props.items);

  useEffect(() => {
    if (props.items != budget) props.onChange(budget);
  }, [budget]);

  const addBudgetItem = async () => {
    const data: any = await axios.post("/api/routes/updateDocument", {
      collection: "Budget",
      document: props.title,
      data: {
        items: [
          ...props.items,
          {
            title: newTitle,
            budgeted: 0,
            spent: 0,
          },
        ],
      },
    });
    // console.log(data);
    return data;
  };

  const handleSubmitNew = async () => {
    if (newTitle != "") {
      console.log("new Item", newTitle);
      await addBudgetItem().then(() => {
        props.refetch();
      });
    }
  };
  return (
    <div className="flex flex-col items-center h-min justify-center">
      <div
        className="relative w-full cursor-pointer"
        onClick={() => {
          setAdding(false);
          setOpen(!open);
        }}
      >
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex items-center justify-between">
          <h2 className="px-2 bg-white text-[20px] font-semibold text-gray-700">
            {props.title}
          </h2>
          <div className="flex items-center bg-[#fff]">
            <h2 className="px-2 bg-white text-gray-700">
              {budget
                .map((datum: any) => datum.budgeted)
                .reduce((a: any, b: any) => a + b)}
              $ |{" "}
              {Number(
                (budget
                  .map((datum: any) => datum.budgeted)
                  .reduce((a: any, b: any) => a + b) /
                  props.income) *
                  100
              ).toFixed(1)}
              %
            </h2>
            <div
              className={`duration-300 ${
                open ? "rotate-[-90deg]" : "rotate-[0deg]"
              }`}
            >
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          open ? `h-max` : "h-[0px]"
        } duration-300 w-full ml-[25px] pr-[45px] pl-[0px] relative overflow-hidden`}
      >
        <div className="w-[1px] absolute left-[0px] top-[0px] bg-[#00000070] bottom-[15px]"></div>
        {budget.map((item: any) => {
          return (
            <div
              className="relative w-full pl-[15px] mr-[30px] cursor-pointer"
              key={item.title}
            >
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex items-center justify-between">
                <h2 className="px-2 bg-white text-[18px]  text-gray-700">
                  {item.title}
                </h2>
                <div className="flex items-center bg-[#fff]">
                  <input
                    type="number"
                    className="border pl-[10px] text-center text-black w-[100px] rounded-[10px] border-[#00000030]"
                    value={item.budgeted}
                    placeholder="money"
                    onChange={(e) => {
                      setBudget(
                        budget.map((budgetItem: any) => {
                          if (budgetItem.title === item.title) {
                            return {
                              ...budgetItem,
                              budgeted: Number(e.target.value),
                            };
                          } else {
                            return budgetItem;
                          }
                        })
                      );
                      console.log(budget);
                      console.log(
                        budget.reduce(
                          (acc: any, obj: any) => acc + obj.budgeted,
                          0
                        )
                      );
                    }}
                    id=""
                  />
                  <h2 className="text-gray-700 ml-[3px]">$</h2>
                  <div
                    className={`duration-300 ${
                      open ? "rotate-[-90deg]" : "rotate-[0deg]"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="h-[30px] flex items-center">
          <div className="h-[1px] bg-gray-300 mr-[5px] w-[15px]" />
          <input
            type="text"
            className={`border duration-300 text-center text-black ${
              adding
                ? "w-[100px] border-[#00000030]"
                : " w-[0px] border-[transparent]"
            } rounded-[10px] `}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            name=""
            placeholder="Name"
            id=""
          />
          <div
            onClick={() => {
              adding ? handleSubmitNew() : setAdding(!adding);
            }}
          >
            {adding ? <CheckIcon /> : <AddNew />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;

import CloseIcon from "@/assets/Icons/CloseIcon";
import React, { useState, useEffect } from "react";

const NewAccount = (props: any) => {
  const [Account, setAccount] = useState<any | null>(null);

  useEffect(() => {
    setAccount(props.account);
  }, [props.account]);

  const handleChange = (event: any, setValue: Function) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    setValue(numericValue);
  };

  return Account != null ? (
    <div className="w-full h-full pt-[100px] relative  flex flex-col">
      <div
        className="absolute cursor-pointer left-[20px] top-[30px]"
        onClick={() => {
          setAccount(null);
          props.setNewAccount(null);
        }}
      >
        <CloseIcon />
      </div>
      <input
        className="w-[250px] h-[50px] border-b m-[20px] border-[#00000040] text-[35px]"
        placeholder="Account Name"
        type="text"
        value={
          typeof Account.id != "undefined" || Account.id != null
            ? Account.id
            : ""
        }
        onChange={(e) => {
          setAccount({ ...Account, id: e.target.value });
        }}
        name=""
        id=""
      />
      <div className="w-full mt-[40px] pl-[20px] pr-[20px] flex justify-evenly items-center border-b border-[#00000040] ">
        <h2
          className={` text-[25px] cursor-pointer ${
            Account.type === "debt" ? "text-[#0066FF]" : "text-[#00000070]"
          }`}
          onClick={() => setAccount({ type: "debt", id: Account.id })}
        >
          Debt
        </h2>
        <h2
          className={` text-[25px] cursor-pointer ${
            Account.type === "fund" ? "text-[#0066FF]" : "text-[#00000070]"
          }`}
          onClick={() => setAccount({ type: "fund", id: Account.id })}
        >
          Fund
        </h2>
      </div>
      <div className={`${Account.type != "debt" ? "hidden" : ""} p-[20px]`}>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Length
          </h2>
          <input
            type="text"
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            value={
              typeof Account.length != "undefined" || Account.length != null
                ? Account.length
                : ""
            }
            placeholder="(months)"
            onChange={(e) =>
              handleChange(e, (num: number) => {
                setAccount({ ...Account, length: num });
              })
            }
          />
        </div>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Interest
          </h2>
          <input
            type="number"
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            value={
              typeof Account.interest != "undefined" || Account.interest != null
                ? Account.interest
                : ""
            }
            placeholder="(percentage)"
            onChange={(e) =>
              setAccount({ ...Account, interest: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Min Payment
          </h2>
          <input
            type="text"
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            value={
              typeof Account.min_payment != "undefined" ||
              Account.min_payment != null
                ? Account.min_payment
                : ""
            }
            placeholder=""
            onChange={(e) =>
              handleChange(e, (num: number) => {
                setAccount({ ...Account, min_payment: num });
              })
            }
          />
        </div>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Total Owed
          </h2>
          <input
            type="text"
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            value={
              typeof Account.total != "undefined" || Account.total != null
                ? Account.total
                : ""
            }
            placeholder=""
            onChange={(e) =>
              handleChange(e, (num: number) => {
                setAccount({ ...Account, total: Number(num) });
              })
            }
          />
        </div>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Debt Type
          </h2>
          <select
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            defaultValue={"other"}
            onChange={(e) => {
              setAccount({ ...Account, debtType: e.target.value });
            }}
          >
            <option value="asset">asset</option>
            <option value="house">house</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Current Amount
          </h2>
          <input
            type="text"
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            value={
              typeof Account.amount != "undefined" || Account.amount != null
                ? Account.amount
                : ""
            }
            placeholder=""
            onChange={(e) =>
              handleChange(e, (num: number) => {
                setAccount({ ...Account, amount: num });
              })
            }
          />
        </div>
      </div>
      <div className={`${Account.type != "fund" ? "hidden" : ""} p-[20px]`}>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Goal
          </h2>
          <input
            type="text"
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            value={
              typeof Account.goal != "undefined" || Account.goal != null
                ? Account.goal
                : ""
            }
            placeholder=""
            onChange={(e) =>
              handleChange(e, (num: number) => {
                setAccount({ ...Account, goal: num });
              })
            }
          />
        </div>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Current Amount
          </h2>
          <input
            type="text"
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            value={
              typeof Account.amount != "undefined" || Account.amount != null
                ? Account.amount
                : ""
            }
            placeholder=""
            onChange={(e) =>
              handleChange(e, (num: number) => {
                setAccount({ ...Account, amount: num });
              })
            }
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <button
          className="h-[30px] w-[150px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
          onClick={async () => {
            props.onSubmit(Account);
            console.log(Account);
          }}
        >
          <h2 className="text-[#fff] text-[18px]">Create</h2>
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default NewAccount;

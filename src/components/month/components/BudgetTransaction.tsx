import React, { useState } from "react";
import { Slider } from "@material-tailwind/react";

const BudgetTransaction = (props: any) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    setValue(numericValue);
  };

  return props.transaction != null ? (
    <div className="w-full h-[80px] pr-[40px] flex items-center justify-between border-t border-b border-[#00000020] ">
      <div className="w-[50%] pl-[20px] pr-[20px]">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-[#000000] text-[18px]">Income</h2>
          <h2 className="text-[#000000] text-[18px]">
            {props.transaction.item.title}
          </h2>
        </div>
        <Slider
          defaultValue={50}
          onChange={(e) => {
            setValue(
              Number(
                Number(
                  (Number(e.target.value) / 100) *
                    props.transaction.item.budgeted
                  // 100
                ).toFixed(2)
              )
            );
          }}
          className="text-[#2ec947]"
          barClassName="rounded-none bg-[#2ec946]"
          thumbClassName="[&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:-mt-[4px] [&::-webkit-slider-thumb]:-mt-[4px]"
          trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-[#2ec946]/10 border border-[#2ec946]/20"
        />
      </div>
      <input
        type="text"
        className="h-full w-[150px] rounded-[10px] h-[31px] border border-[#00000030] text-[black] text-[17px] pl-[5px] "
        name=""
        id=""
        value={value}
        placeholder="$---"
        onChange={handleChange}
      />

      <div className="flex gap-[20px]">
        <button
          className="h-[30px] w-[100px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
          onClick={async () => {
            props.onCancel();
          }}
        >
          <h2 className="text-[#fff] text-[18px]">Cancle</h2>
        </button>
        <button
          className="h-[30px] w-[150px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
          onClick={async () => {
            props.onComplete(value);
          }}
        >
          <h2 className="text-[#fff] text-[18px]">Complete</h2>
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default BudgetTransaction;

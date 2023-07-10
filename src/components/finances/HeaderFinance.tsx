import { useRouter } from "next/router";
import React from "react";

const headerFinance = (props: any) => {
  const router = useRouter();
  return (
    <div className="w-full bg-[#fff] h-[70px] flex items-center justify-between pl-[30px] pr-[30px] border-b-[2px] border-[#00000030]  ">
      <h2 className="text-[#000000] text-[25px]">{props.title}</h2>
      <button
        className="h-[30px] w-[150px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
        onClick={() => {
          router.push("/Finance/Month");
        }}
      >
        <h2 className="text-[#fff] text-[18px]">This Month</h2>
      </button>
    </div>
  );
};

export default headerFinance;

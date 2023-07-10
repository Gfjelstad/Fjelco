// import { logoutUser } from "@/methods/auth";
import { logoutUser } from "@/methods/auth";
import { useRouter } from "next/router";
import React from "react";

const NavBarFinance = () => {
  const router = useRouter();

  return (
    <div className="w-[250px] bg-[#fff] border-r flex flex-col justify-between border-[#00000020] h-screen left-[0px] haltr fixed drop-shadow-lg ">
      <div>
        <div className="flex justify-center items-center">
          <h1 className="text-[35px] m-[20px] font-bold">Finance</h1>
        </div>
        <h2 className="p-[10px] text-[28px] text-[#00000070] font-semibold">
          Menu
        </h2>
        <button
          className={`pl-14 pt-[15px] text-[26px] ${
            router.pathname.split("/").includes("Dashboard")
              ? "text-[#0066FF]"
              : "text-[#000000]"
          } `}
          onClick={() => {
            router.push("Dashboard");
          }}
        >
          Overview
        </button>
        <button
          className={`pl-14 pt-[15px] text-[26px] ${
            router.pathname.split("/").includes("Budget")
              ? "text-[#0066FF]"
              : "text-[#000000]"
          } `}
          onClick={() => {
            router.push("Budget");
          }}
        >
          Budget
        </button>
        <button
          className={`pl-14 pt-[15px] text-[26px] ${
            router.pathname.split("/").includes("Babysteps")
              ? "text-[#0066FF]"
              : "text-[#000000]"
          } `}
          onClick={() => {
            router.push("Babysteps");
          }}
        >
          Baby Steps
        </button>
        <button
          className={`pl-14 pt-[15px] text-[26px] ${
            router.pathname.split("/").includes("Accounts")
              ? "text-[#0066FF]"
              : "text-[#000000]"
          } `}
          onClick={() => {
            router.push("Accounts");
          }}
        >
          Accounts
        </button>
        <button
          className={`pl-14 pt-[15px] text-[26px] ${
            router.pathname.split("/").includes("Assets")
              ? "text-[#0066FF]"
              : "text-[#000000]"
          } `}
          onClick={() => {
            router.push("Assets");
          }}
        >
          Assets
        </button>
      </div>
      <div className="w-full mb-[30px] flex justify-center">
        <button
          className={` text-[20px]`}
          onClick={async () => {
            await logoutUser().then(() => {
              window.location.reload();
            });
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default NavBarFinance;

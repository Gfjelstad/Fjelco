import { useRouter } from "next/router";
import React from "react";

const NavBar = () => {
  const router = useRouter();
  return (
    <div className="flex fixed text-[#fff] h-16 w-screen justify-between items-center  ">
      <div className="flex justify-center pl-[100px] items-center">
        <h1 className="text-[25px]">Grant Fjelstad</h1>
      </div>
      <div className="flex text-[#fff] items-center">
        <button
          className={`pl-[35px] text-[18px] ${
            router.pathname.split("/").includes("Dashboard")
              ? "text-[#0066FF]"
              : "text-[#000000]"
          } `}
          onClick={() => {
            router.push("/");
          }}
        >
          <h2 className="text-[#fff]">About me</h2>
        </button>
        <button
          className={`pl-[35px] text-[18px] ${
            router.pathname.split("/").includes("Education")
              ? "text-[#0066FF]"
              : "text-[#000000]"
          } `}
          onClick={() => {
            router.push("/Education");
          }}
        >
          <h2 className="text-[#fff]">Education</h2>
        </button>
        <button
          className={`pl-[35px] text-[18px] ${
            router.pathname.split("/").includes("Projects")
              ? "text-[#0066FF]"
              : "text-[#000000]"
          } `}
          onClick={() => {
            router.push("/Projects");
          }}
        >
          <h2 className="text-[#fff]">Projects</h2>
        </button>
      </div>
      <button className="pl-14 pr-14 text-white ">LinkedIn</button>
    </div>
  );
};

export default NavBar;

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import { FC, use, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { scroller } from "react-scroll";
import DesignIcon from "@/assets/Icons/DesignIcon";
import FullStackIcon from "@/assets/Icons/FullStackIcon";
import Web3Icon from "@/assets/Icons/Web3Icon";
import DprintIcon from "@/assets/Icons/3dprintIcon";
import CadIcon from "@/assets/Icons/CadIcon";
import AutomationIcon from "@/assets/Icons/automationIcon";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="h-screen bg-[#373737] pt-[200px] flex justify-center w-screen">
        <div className="w-[500px] flex flex-col items-start ">
          <div className="w-[200px] h-[50px] bg-[#86FF7B] flex items-center justify-center">
            <h2>Full-Stack Developer</h2>
          </div>
          <div className="w-[200px] mt-[10px] h-[50px] bg-[#FFAD33] flex items-center justify-center">
            <h2>Mechanical Engineer</h2>
          </div>
          <h2 className="text-[48px] text-[#fff] mt-[40px]">
            Digital or Physical. <br /> I can make it
          </h2>
          <h2 className="text-[#ffffff60] text-[20px]">
            I turn great ideas into reality, whether hardware,
            <br /> software, or a mixture of both
          </h2>
        </div>
        <div className="w-[500px] flex flex-col items-start "></div>
      </div>
      <div className="flex pt-[150px] flex-col items-center w-screen bg-[#262626]">
        <div className="h-screen gap-[30px] grid grid-cols-2">
          <div className=" flex flex-col items-center w-[450px]">
            <div className="w-[100%] p-[30px] h-[145px] rounded-[10px] mb-[5px] bg-[#373737]  flex justify-between ">
              <h2 className="text-[18px] text-[#fff]">Design</h2>
              <DesignIcon />
            </div>
            <div className="w-[100%] p-[30px] h-[145px] rounded-[10px] mb-[5px] bg-[#373737]  flex justify-between ">
              <h2 className="text-[18px] text-[#fff]">Full-Stack</h2>
              <FullStackIcon />
            </div>
            <div className="w-[100%] p-[30px] h-[145px] rounded-[10px] mb-[5px] bg-[#373737]  flex justify-between ">
              <h2 className="text-[18px] text-[#fff]">Web3</h2>
              <Web3Icon />
            </div>
          </div>
          <div>
            <h2 className="text-[#fff] text-[52px]">
              Hello!
              <br /> I'm Grant
            </h2>
          </div>
          <div></div>
          <div className=" flex flex-col items-center w-[450px]">
            <div className="w-[100%] p-[30px] h-[145px] rounded-[10px] mb-[5px] bg-[#373737]  flex justify-between ">
              <h2 className="text-[18px] text-[#fff]">Mechanical Design</h2>
              <CadIcon />
            </div>
            <div className="w-[100%] p-[30px] h-[145px] rounded-[10px] mb-[5px] bg-[#373737]  flex justify-between ">
              <h2 className="text-[18px] text-[#fff]">Rapid Prototyping</h2>
              <DprintIcon />
            </div>
            <div className="w-[100%] p-[30px] h-[145px] rounded-[10px] mb-[5px] bg-[#373737]  flex justify-between ">
              <h2 className="text-[18px] text-[#fff]">
                Automation Integration
              </h2>
              <AutomationIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

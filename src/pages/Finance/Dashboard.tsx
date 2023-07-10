import React, { useState } from "react";
import HeaderFinance from "../../components/finances/HeaderFinance";

import {
  VictoryGroup,
  VictoryBar,
  VictoryLine,
  VictoryChart,
  Axis,
  VictoryAxis,
  TextSize,
} from "victory";
import Revenue from "@/components/dashboard/components/Revenue";
import BudgetSplit from "@/components/dashboard/components/BudgetSplit";
import BabyStepProgress from "@/components/dashboard/components/BabyStepProgress";

const Dashboard = () => {
  // Sample data for the charts

  const barChartData1 = [
    { x: "January", y: 12 },
    { x: "February", y: 19 },
    { x: "March", y: 3 },
    { x: "April", y: 5 },
    { x: "May", y: 2 },
    { x: "June", y: 123 },
  ];

  const barChartData2 = [
    { x: "hello", y: 83 },
    { x: "January", y: 183 },
    { x: "February", y: 10 },
    { x: "March", y: 64 },
    { x: "April", y: 34 },
    { x: "May", y: 52 },
    { x: "June", y: 39 },
  ];

  const barChartData3 = [
    { x: "January", y: 5 },
    { x: "February", y: 3 },
    { x: "March", y: 7 },
    { x: "April", y: 9 },
    { x: "May", y: 4 },
    { x: "June", y: 122 },
  ];

  const lineChartData1 = [
    { x: "January", y: 65 },
    { x: "February", y: 59 },
    { x: "March", y: 80 },
    { x: "April", y: 81 },
    { x: "May", y: 156 },
    { x: "June", y: 55 },
  ];

  const lineChartData2 = [
    { x: "January", y: 28 },
    { x: "February", y: 48 },
    { x: "March", y: 40 },
    { x: "April", y: 19 },
    { x: "May", y: 86 },
    { x: "June", y: 27 },
    { x: "July", y: 19 },
    { x: "August", y: 86 },
    { x: "Sept", y: 27 },
  ];

  const lineChartData3 = [
    { x: "January", y: 38 },
    { x: "February", y: 22 },
    { x: "March", y: 17 },
    { x: "April", y: 35 },
    { x: "May", y: 41 },
    { x: "June", y: 33 },
  ];

  return (
    <div className="flex flex-col items-center">
      <HeaderFinance title="Dashboard" />
      <div className=" mt-[100px] grid gap-[50px] grid-cols-2">
        <Revenue />
        <BudgetSplit />
        <BabyStepProgress />
      </div>
    </div>
  );
};

export default Dashboard;

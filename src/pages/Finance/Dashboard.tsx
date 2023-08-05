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

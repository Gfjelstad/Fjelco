import React from "react";

const get36MoExpences = (budget: any) => {
  const month = budget.reduce(
    (acc: any, obj: any) =>
      acc + obj.items.reduce((acc: any, obj: any) => acc + obj.budgeted, 0),
    0
  );
  return Number(month) * 5;
};

export default get36MoExpences;

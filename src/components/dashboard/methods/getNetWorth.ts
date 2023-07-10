import React from "react";

const getNetWorth = (accounts: any[]) => {
  return accounts.reduce(
    (acc: any, obj: any) =>
      obj.type === "debt" ? acc + obj.total + obj.amount : acc + obj.amount,
    0
  );
};

export default getNetWorth;

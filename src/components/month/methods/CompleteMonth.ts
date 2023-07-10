import React from "react";
import axios from "axios";
import { format } from "date-fns";

const CompleteMonth = async (monthItem: any, accounts: any) => {
  const Complete = async () => {
    const data: any = await axios.post("/api/routes/addDocumentwithID", {
      collection: "completedMonths",
      document: monthItem.id,
      data: {
        ...monthItem,
        accounts: accounts,
      },
    });
    // console.log(data);
    return data;
  };
  return await Complete();
};

export default CompleteMonth;
CompleteMonth;

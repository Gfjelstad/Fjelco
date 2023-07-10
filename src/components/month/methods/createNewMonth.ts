import React from "react";
import axios from "axios";
import { format } from "date-fns";

const createNewMonth = async (budget: any, date: any) => {
  const getInfo = async () => {
    const data: any = await axios.post("/api/routes/addDocumentwithID", {
      collection: "thisMonth",
      document: date,
      data: {
        income: [],
        budget: budget,
        transactions: [],
      },
    });
    // console.log(data);
    return data;
  };
  return await getInfo();
};

export default createNewMonth;

import React from "react";
import axios from "axios";

const updateBudget = async (items: any[]) => {
  const promises = items.map((item: any) => {
    // console.log("id", item.id);
    // console.log("items", item.items);
    const data: any = axios.post("/api/routes/updateDocument", {
      collection: "Budget",
      document: item.id,
      data: {
        items: item.items,
        total: item.items.reduce((acc: any, obj: any) => acc + obj.budgeted, 0),
      },
    });
    return data;
  });
  // console.log(data);
  return Promise.all(promises);
};

export default updateBudget;

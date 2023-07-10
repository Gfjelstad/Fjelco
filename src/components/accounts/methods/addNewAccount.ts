import React from "react";
import axios from "axios";

const addNewAccount = async (item: any) => {
  const data: any = await axios.post("/api/routes/addDocumentwithID", {
    collection: "Accounts",
    document: item.id,
    data: {
      ...item,
    },
  });
  return data;
};

export default addNewAccount;

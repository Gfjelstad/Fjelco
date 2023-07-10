import React from "react";
import axios from "axios";

const DeleteAccount = async (item: any) => {
  const data: any = await axios.post("/api/routes/deleteDocument", {
    collection: "Accounts",
    document: item.id,
  });
  return data;
};

export default DeleteAccount;

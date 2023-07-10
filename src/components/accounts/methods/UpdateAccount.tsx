import React from "react";
import axios from "axios";

const UpdateAccount = async (item: any) => {
  const data: any = await axios.post("/api/routes/updateDocument", {
    collection: "Accounts",
    document: item.id,
    data: {
      ...item,
    },
  });
  return data;
};

export default UpdateAccount;

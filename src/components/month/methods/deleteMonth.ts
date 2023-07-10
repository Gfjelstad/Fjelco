import React from "react";
import axios from "axios";

const deleteMonth = async (month: any) => {
  const data: any = await axios.post("/api/routes/deleteDocument", {
    collection: "thisMonth",
    document: month?.id,
  });
  return data;
};

export default deleteMonth;

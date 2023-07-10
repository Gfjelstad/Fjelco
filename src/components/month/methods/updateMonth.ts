import React from "react";
import axios from "axios";

const updateMonth = async (month: any) => {
  const data: any = await axios.post("/api/routes/updateDocument", {
    collection: "thisMonth",
    document: month?.id,
    data: {
      ...month,
    },
  });
};

export default updateMonth;

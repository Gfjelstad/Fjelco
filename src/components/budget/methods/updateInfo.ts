import React from "react";
import axios from "axios";

const updateInfo = async (info: any) => {
  const data: any = await axios.post("/api/routes/updateDocument", {
    collection: "Info",
    document: "Grant",
    data: {
      ...info,
    },
  });
  // console.log(data);
  return data;
};

export default updateInfo;

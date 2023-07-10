import React from "react";
import axios from "axios";

const addNewAsset = async (item: any) => {
  const data: any = await axios.post("/api/routes/addDocumentwithID", {
    collection: "Asset",
    document: item.id,
    data: {
      ...item,
    },
  });
  return data;
};

export default addNewAsset;

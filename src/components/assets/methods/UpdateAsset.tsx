import React from "react";
import axios from "axios";

const UpdateAsset = async (item: any) => {
  const data: any = await axios.post("/api/routes/updateDocument", {
    collection: "Asset",
    document: item.id,
    data: {
      ...item,
    },
  });
  return data;
};

export default UpdateAsset;

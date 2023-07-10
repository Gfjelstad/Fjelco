import React from "react";
import axios from "axios";

const DeleteAsset = async (item: any) => {
  const data: any = await axios.post("/api/routes/deleteDocument", {
    collection: "Asset",
    document: item.id,
  });
  return data;
};

export default DeleteAsset;

import React from "react";
import axios from "axios";

const checkAuth = async () => {
  const data: any = await axios.post("/api/routes/checkAuth");
  return data;
};

export default checkAuth;

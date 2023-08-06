import React from "react";
import axios from "axios";

const loginUser = async (pin: string) => {
  const data: any = await axios.post("/api/routes/login", {
    pin: pin,
  });
  console.log("from login function", data);
  return data;
};

const logoutUser = async () => {
  const data: any = await axios.get("/api/routes/logout");
  console.log("from login function", data);
  return data;
};

export { loginUser, logoutUser };

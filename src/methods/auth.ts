import React from "react";
import axios from "axios";

const loginUser = async (email: string, password: string) => {
  const data: any = await axios.post("/api/routes/login", {
    email: email,
    password: password,
  });
  console.log("from login function", data);
  return data;
};

const logoutUser = async () => {
  const data: any = await axios.post("/api/routes/logout");
  console.log("from login function", data);
  return data;
};

export { loginUser, logoutUser };

import { format } from "date-fns";
import React from "react";

const getNextMonth = () => {
  const thisDate = format(new Date(), "MM-yyyy");
  const newMonth =
    Number(thisDate.split("-")[0]) + 1 != 13
      ? String(Number(thisDate.split("-")[0]) + 1)
      : "1";
  const newDate = `${
    String(Number(thisDate.split("-")[0]) + 1).length === 1
      ? `0${String(Number(thisDate.split("-")[0]) + 1)}`
      : String(Number(thisDate.split("-")[0]) + 1)
  }-${thisDate.split("-")[1]}`;
  return newDate;
};

export default getNextMonth;

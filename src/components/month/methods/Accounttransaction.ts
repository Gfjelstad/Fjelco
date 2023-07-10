import React from "react";
import axios from "axios";

const Accounttransaction = async (
  to: string,
  from: string,
  amount: number,
  accounts: any
) => {
  const toAccount = accounts.filter((item: any) => item.id === to)[0];
  console.log(toAccount);
  console.log(Number(toAccount.amount) + Number(amount));
  if (from === "Income") {
    const data = await axios.post("/api/routes/updateDocument", {
      collection: "Accounts",
      document: to,
      data: {
        ...toAccount,
        amount: Number(toAccount.amount) + Number(amount),
      },
    });
    return [data];
  } else {
    const fromAccount = accounts.filter((item: any) => item.id === from)[0];
    if (fromAccount.amount > amount) {
      return await axios
        .post("/api/routes/updateDocument", {
          collection: "Accounts",
          document: from,
          data: {
            ...fromAccount,
            amount: Number(fromAccount.amount) - Number(amount),
          },
        })
        .then(async (res: any) => {
          const data: any = await axios.post("/api/routes/updateDocument", {
            collection: "Accounts",
            document: to,
            data: {
              ...toAccount,
              amount: Number(toAccount.amount) + Number(amount),
            },
          });
          return [data, res];
        });
    } else {
      console.log("not enough funds");
    }
  }
};

export default Accounttransaction;

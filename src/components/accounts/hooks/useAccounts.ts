import axios from "axios";
import { useQuery } from "react-query";

const useAccounts = () => {
  const getAccounts = async () => {
    const data: any = await axios.post("/api/routes/getCollection", {
      collection: "Accounts",
    });
    // console.log(data);
    return data;
  };

  return useQuery(["Accounts"], getAccounts, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export default useAccounts;

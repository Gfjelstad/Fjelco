import axios from "axios";
import { useQuery } from "react-query";

const useBudgetItems = () => {
  const getBudgetItems = async () => {
    const data: any = await axios.post("/api/routes/getCollection", {
      collection: "Budget",
    });
    // console.log(data);
    return data;
  };

  return useQuery(["budgetItems"], getBudgetItems, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export default useBudgetItems;

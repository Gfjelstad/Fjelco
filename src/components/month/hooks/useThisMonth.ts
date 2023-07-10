import axios from "axios";
import { useQuery } from "react-query";

const useThisMonth = () => {
  const getThisMonth = async () => {
    const data: any = await axios.post("/api/routes/getCollection", {
      collection: "thisMonth",
    });
    // console.log(data);
    return data;
  };

  return useQuery(["thisMonth"], getThisMonth, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export default useThisMonth;

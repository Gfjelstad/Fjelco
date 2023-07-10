import axios from "axios";
import { useQuery } from "react-query";

const usePastMonths = () => {
  const getPastMonths = async () => {
    const data: any = await axios.post("/api/routes/getCollection", {
      collection: "completedMonths",
    });
    // console.log(data);
    return data;
  };

  return useQuery(["PastMonths"], getPastMonths, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export default usePastMonths;

import axios from "axios";
import { useQuery } from "react-query";

const useBabySteps = () => {
  const getBabySteps = async () => {
    const data: any = await axios.post("/api/routes/getCollection", {
      collection: "Baby Steps",
    });
    // console.log(data);
    return data;
  };

  return useQuery(["BabySteps"], getBabySteps, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export default useBabySteps;

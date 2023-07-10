import axios from "axios";
import { useQuery } from "react-query";

const useAssets = () => {
  const getAssets = async () => {
    const data: any = await axios.post("/api/routes/getCollection", {
      collection: "Assets",
    });
    // console.log(data);
    return data;
  };

  return useQuery(["Assets"], getAssets, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export default useAssets;

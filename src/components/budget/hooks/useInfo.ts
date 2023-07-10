import axios from "axios";
import { useQuery } from "react-query";

const useInfo = () => {
  const getInfo = async () => {
    const data: any = await axios.post("/api/routes/getDocument", {
      collection: "Info",
      document: "Grant",
    });
    // console.log(data);
    return data;
  };

  return useQuery(["Info"], getInfo, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export default useInfo;

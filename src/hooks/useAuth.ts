import axios from "axios";
import { useQuery } from "react-query";

const useAuth = () => {
  const getAuth = async () => {
    const data: any = await axios.post("/api/routes/checkAuth");
    // console.log(data);
    return data;
  };

  return useQuery(["Auth"], getAuth, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export default useAuth;

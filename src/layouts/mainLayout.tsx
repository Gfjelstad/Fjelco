import NavBar from "@/components/navBar";
import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import NavBarFinance from "@/components/finances/NavBarFinance";
import checkAuth from "@/methods/checkAuth";
import Login from "@/components/finances/Login";
import useAuth from "@/hooks/useAuth";

interface Props {
  children: ReactElement;
}

const MainLayout = ({ children }: Props) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(true);
  // const { data: authData, isFetched, refetch } = useAuth();
  // console.log(useRouter().pathname
  // useEffect(() => {
  //   refetch();
  // }, [router.pathname]);
  // useEffect(() => {
  //   if (isFetched) {
  //     const checkAuthFunction = async () => {
  //       const result = await checkAuth();
  //       console.log("auth hook", authData.data);
  //       if (router.pathname.split("/").includes("Finance") && !authData.data) {
  //         setLoggedIn(false);
  //       } else if (
  //         router.pathname.split("/").includes("Finance") &&
  //         authData.data
  //       ) {
  //         setLoggedIn(true);
  //       }
  //     };
  //     checkAuthFunction();
  //   }
  // }, [isFetched]);
  return router.pathname.split("/").includes("Finance") ? (
    <>
      {loggedIn ? (
        <div className="max-w-screen bg-[#F6F6F6] min-h-screen pl-[250px] ">
          <NavBarFinance />
          <ToastContainer theme="dark" />
          {children}
        </div>
      ) : (
        <Login />
      )}
    </>
  ) : (
    <>
      <div className=" max-w-screen overflow-x-hidden min-h-screen ">
        <NavBar />
        <ToastContainer theme="dark" />
        {children}
      </div>
    </>
  );
};

export default MainLayout;

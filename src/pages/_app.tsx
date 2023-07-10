import "@/assets/styles/globals.css";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import MainLayout from "@/layouts/mainLayout";
import { FC, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </QueryClientProvider>
  );
};

export default App;

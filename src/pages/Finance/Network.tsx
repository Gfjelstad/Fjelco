import HeaderFinance from "@/components/finances/HeaderFinance";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Network = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <HeaderFinance title="Network" />
      <div className="w-[80%]  mt-[100px] mb-[40px] min-h-[400px] bg-[#fff] border border-[#00000010] rounded-[15px] shadow-xl">
        <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
          This ~is not~ strikethrough, but ~~this is~~!
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Network;

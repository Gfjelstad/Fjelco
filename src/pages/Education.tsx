import React from "react";

const Education = () => {
  return (
    <div className="bg-[#262626] gap-[30px] min-h-screen pt-[200px] flex flex-col items-center ">
      <div className="w-[800px] max-w-[80vw] bg-[#373737] h-[150px] rounded-[10px] flex items-center justify-between">
        <div className="flex flex-col pl-[30px] w-[300px]">
          <h2 className="text-[30px] text-[#fff]">Texas Tech University</h2>
          <h2 className="text-[20px] text-[#FFAD33]">Mechanical Engineering</h2>
        </div>
        <div className="flex flex-col items-end pr-[30px] w-[300px]">
          <h2 className="text-[20px] text-[#ffffff70]">2020-2023</h2>
          <h2 className="text-[20px] text-[#FFAD3370]">
            Summa Cum Laude (3.97 GPA)
          </h2>
        </div>
      </div>
      <div className="w-[800px] max-w-[80vw] bg-[#373737] h-[150px] rounded-[10px] flex items-center justify-between">
        <div className="flex flex-col pl-[30px] w-[300px]">
          <h2 className="text-[30px] text-[#fff]">Wartburg College</h2>
          <h2 className="text-[20px] text-[#FFAD33]">
            Engineering Science <br />{" "}
            <span className="text-[16px]">Track and Field</span>
          </h2>
        </div>
        <div className="flex flex-col items-end pr-[30px] w-[300px]">
          <h2 className="text-[20px] text-[#ffffff70]">2018-2020</h2>
          <h2 className="text-[20px] text-[#FFAD3370]"></h2>
        </div>
      </div>
    </div>
  );
};

export default Education;

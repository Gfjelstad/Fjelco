import React from "react";

const Progressbar = (props: any) => {
  console.log(props);
  return (
    <div
      className="w-[80%] flex items-center justify-between"
      key={`Progress-${props.name}`}
    >
      <div className="w-[180px] overflow-hidden">
        <h2 className="text-[18px] text-[black]">{props.name}</h2>
      </div>
      <div className="w-[70%] h-[8px] rounded-[4px] border border-[#00000090] overflow-hidden flex items-center">
        <div
          className={` h-full bg-[#0066FF]`}
          style={{
            width: `${Math.floor((props.amount / props.limit) * 100)}%`,
          }}
        />
      </div>
      <div className="w-[120px] flex justify-end">
        <h2
          className="text-[red] text-[14px]
      "
        >
          {props.amount - props.limit < 0
            ? `$${props.amount - props.limit}`
            : ""}
        </h2>
      </div>
    </div>
  );
};

export default Progressbar;

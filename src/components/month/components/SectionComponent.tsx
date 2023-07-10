import React from "react";

interface SectionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: any;
}

const SectionComponent = (props: SectionProps) => {
  return (
    <div
      {...props}
      className="bg-[#fff] rounded-[10px] shadow-lg flex flex-col items-center"
    >
      {props.children}
    </div>
  );
};

export default SectionComponent;

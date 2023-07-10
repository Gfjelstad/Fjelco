import useBudgetItems from "@/components/budget/hooks/getBudgetItems";
import useInfo from "@/components/budget/hooks/useInfo";
import React, { useEffect, useState } from "react";
import { VictoryLegend, VictoryPie, VictoryTooltip } from "victory";

const BudgetSplit = () => {
  const { data: infoData, isFetched: InfoFetched } = useInfo();
  const { data: budgetData, isFetched: BudgetFetched } = useBudgetItems();
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (BudgetFetched && InfoFetched) {
      console.log(
        Number(
          infoData.data.Monthly_Income -
            budgetData.data.reduce((acc: any, obj: any) => acc + obj.total, 0)
        )
      );
      setData([
        {
          x: "remaining",
          y: Number(
            infoData.data.Monthly_Income -
              budgetData.data.reduce((acc: any, obj: any) => acc + obj.total, 0)
          ),
        },
        ...budgetData.data
          .filter((category: any) => category.total != 0)
          .map((category: any) => {
            return {
              x: category.id,
              y: category.items.reduce(
                (acc: any, obj: any) => acc + obj.budgeted,
                0
              ),
            };
          }),
      ]);
    }
  }, [budgetData]);

  const legendData = [
    ...data.map((item: any) => {
      return { name: item.x };
    }),
  ];

  const [activeSlice, setActiveSlice] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event: any) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };
  const handleSliceMouseOver = (event: any, datum: any) => {
    setActiveSlice({ name: datum.x, amount: datum.y });
    // console.log(event.clientX, event.clientY);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleSliceMouseOut = () => {
    window.removeEventListener("mousemove", handleMouseMove);

    setActiveSlice(null);
  };

  const renderTooltip = () => {
    window.addEventListener("mousemove", handleMouseMove);
    return (
      <div
        className="absolute z-10 bg-white rounded shadow p-2"
        style={{ left: mousePos.x, top: mousePos.y }}
      >
        <span className="font-bold">
          {activeSlice.name} - ${activeSlice.amount}
        </span>
      </div>
    );
  };

  return BudgetFetched && InfoFetched ? (
    <div className="container w-[600px] h-[400px] bg-[#fff] rounded-[20px] shadow-lg">
      <div className="w-full flex justify-between">
        <h3 className="text-2xl font-bold pt-[20px] pl-[20px]">Budget Split</h3>
        <h3 className="text-2xl text-[#00000080] font-bold pt-[20px] pr-[20px]">
          ${infoData.data.Monthly_Income}
        </h3>
      </div>
      <div className="flex justify-start mr-[-120px] pl-[20px]">
        <div className="w-full flex items-start justify-end flex p-4">
          <VictoryPie
            data={data}
            colorScale={[
              "#89CFF0",
              "#0000FF",
              "#7393B3",
              "#088F8F",
              "#5F9EA0",
              "#0047AB",
              "#6495ED",
              "#00FFFF",
              "#00008B",
              "#6082B6",
              "#00A36C",
              "#3F00FF",
              "#5D3FD3",
              "#ADD8E6",
              "#1F51FF",
            ]}
            // Other configurations and customizations
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 12 }}
                flyoutStyle={{ fill: "black" }}
                flyoutWidth={100}
                flyoutHeight={40}
                flyoutPadding={8}
                pointerLength={8}
                cornerRadius={4}
                renderInPortal={true}
              />
            }
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: (tevent, props) => {
                    return [
                      {
                        target: "data",
                        mutation: (event) =>
                          handleSliceMouseOver(tevent, props.datum),
                      },
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: "data",
                        mutation: handleSliceMouseOut,
                      },
                    ];
                  },
                },
              },
            ]}
          />

          <VictoryLegend
            x={50}
            y={70}
            colorScale={[
              "#89CFF0",
              "#0000FF",
              "#7393B3",
              "#088F8F",
              "#5F9EA0",
              "#0047AB",
              "#6495ED",
              "#00FFFF",
              "#00008B",
              "#6082B6",
              "#00A36C",
              "#3F00FF",
              "#5D3FD3",
              "#ADD8E6",
              "#1F51FF",
            ]}
            centerTitle
            orientation="vertical"
            style={{ title: { fontSize: 12 } }}
            data={legendData}
          />
        </div>
      </div>
      {activeSlice && renderTooltip()}
    </div>
  ) : (
    <div className="container relative w-[600px] h-[400px] bg-[#fff] rounded-[20px] shadow-lg"></div>
  );
};

export default BudgetSplit;

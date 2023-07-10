import React, { useEffect, useState } from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryStack,
  VictoryTooltip,
} from "victory";
import usePastMonths from "../hooks/usePastMonths";
import { format } from "date-fns";
import getNetWorth from "../methods/getNetWorth";

const Revenue = () => {
  const { data: monthData, refetch, isFetched } = usePastMonths();
  const [chosenMonths, setChosenMonths] = useState<any>([]);
  const [category, setCategory] = useState<string>("Last 6 Months");
  const thisDate = format(new Date(), "MM-yyyy");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSlice, setActiveSlice] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isFetched) {
      if (monthData.data.length > 6) {
      } else {
      }
    }
  }, [isFetched]);

  function getLastSixMonths(date: string, data: any) {
    const [selectedMonth, selectedYear] = date.split("-").map(Number);
    const result: any[] = [];

    for (let i = 0; i < 6; i++) {
      const month = selectedMonth - 5 + i;
      const year = selectedYear - Math.floor((selectedMonth - i - 1) / 12);
      const formattedDate = `${String(month).padStart(2, "0")}-${String(year)}`;

      const matchingData = data.find((item: any) => item.id === formattedDate);
      if (matchingData) {
        result.push({
          id: formattedDate,
          netWorth: getNetWorth(matchingData.accounts),
          income: matchingData.income.reduce(
            (acc: any, obj: any) => acc + obj.amount,
            0
          ),
          i,
        });
      } else {
        if (i === 0) {
          result.push({ id: formattedDate, netWorth: 0, income: 0, i });
        } else {
          result.push({
            id: formattedDate,
            netWorth: result[i - 1].netWorth,
            income: 0,
            i,
          });
        }
      }
    }

    return result;
  }

  useEffect(() => {
    if (isFetched) {
      switch (category) {
        case "Last 6 Months":
          const data = getLastSixMonths(thisDate, monthData.data);
          console.log("last 6 months", data);
          console.log("total months", monthData.data);
          console.log("current date", thisDate);
          setChosenMonths(data);

        default:
          break;
      }
    }
  }, [category, isFetched]);

  const barChartData1 = [
    { x: "January", y: 12 },
    { x: "February", y: 19 },
    { x: "March", y: 3 },
    { x: "April", y: 5 },
    { x: "May", y: 2 },
    { x: "June", y: 3 },
  ];

  // const barChartData2 = [
  //   { x: "January", y: 8 },
  //   { x: "February", y: 10 },
  //   { x: "March", y: 6 },
  //   { x: "April", y: 3 },
  //   { x: "May", y: 5 },
  //   { x: "June", y: 9 },
  // ];

  // const barChartData3 = [
  //   { x: "January", y: 5 },
  //   { x: "February", y: 3 },
  //   { x: "March", y: 7 },
  //   { x: "April", y: 9 },
  //   { x: "May", y: 4 },
  //   { x: "June", y: 2 },
  // ];

  const lineChartData1 = [
    { x: "January", y: 65 },
    { x: "February", y: 59 },
    { x: "March", y: 80 },
    { x: "April", y: 81 },
    { x: "May", y: 56 },
    { x: "June", y: 55 },
  ];
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
        <span className="font-bold">Income: ${activeSlice.amount}</span>
      </div>
    );
  };

  // const lineChartData2 = [
  //   { x: "January", y: 28 },
  //   { x: "February", y: 48 },
  //   { x: "March", y: 40 },
  //   { x: "April", y: 19 },
  //   { x: "May", y: 86 },
  //   { x: "June", y: 27 },
  // ];

  // const lineChartData3 = [
  //   { x: "January", y: 38 },
  //   { x: "February", y: 22 },

  //   { x: "March", y: 17 },
  //   { x: "April", y: 35 },
  //   { x: "May", y: 41 },
  //   { x: "June", y: 33 },
  // ];
  return isFetched ? (
    <div>
      <div className="container w-[600px]  bg-[#fff] rounded-[20px] shadow-lg">
        {activeSlice && renderTooltip()}
        <div className="">
          <h3 className="text-2xl font-bold pt-[20px] pl-[20px]">
            Combined Chart
          </h3>
          <VictoryChart domainPadding={{ x: 20 }}>
            <VictoryAxis
              dependentAxis
              style={{
                tickLabels: {
                  fill: "#000000",

                  fontSize: 12,
                },
              }}
            />
            <VictoryAxis
              dependentAxis={false}
              style={{
                tickLabels: {
                  fill: "black",

                  fontSize: 12,
                },
              }}
            />
            <VictoryGroup
              offset={10}
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
            >
              <VictoryBar
                data={chosenMonths.map((item: any) => {
                  return { x: item.id, y: item.income };
                })}
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
              {/* <VictoryBar data={barChartData2} />
              <VictoryBar data={barChartData3} /> */}
            </VictoryGroup>
            <VictoryGroup
              colorScale={[
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
            >
              <VictoryLine
                data={chosenMonths.map((item: any) => {
                  return { x: item.id, y: item.netWorth };
                })}
              />
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
              {/* <VictoryLine data={lineChartData2} />
              <VictoryLine data={lineChartData3} /> */}
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="container w-[600px]  bg-[#fff] rounded-[20px] shadow-lg"></div>
    </div>
  );
};

export default Revenue;

import { format } from "date-fns";
import React, { useState, useEffect } from "react";

const categories: string[] = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
];

interface TableRow {
  to: string;
  from: string;
  amount: number;
  date: string;
}

function Table(props: any): JSX.Element {
  const [data, setData] = useState<TableRow[]>(props.transactions);
  const [newRow, setNewRow] = useState<TableRow>({
    to: "",
    from: "",
    amount: 0,
    date: "",
  });

  useEffect(() => {
    setData(props.transactions);
  }, [props.transactions]);
  useEffect(() => {
    if (props.newTransaction != null) {
      console.log(props.newTransaction);
      setNewRow(props.newTransaction);
    }
  }, [props.newTransaction]);

  const handleFromChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setNewRow((prevRow) => ({
      ...prevRow,
      from: event.target.value,
    }));
  };
  const handleToChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setNewRow((prevRow) => ({
      ...prevRow,
      to: event.target.value,
    }));
  };

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    setNewRow((prevRow: any) => ({
      ...prevRow,
      amount: numericValue,
    }));
  };

  const handleAddRow = async () => {
    await props
      .onSubmit({ ...newRow, date: format(new Date(), "MM/dd/yyyy") })
      .then((res: any) => {
        console.log("table side", res);
        if (res) {
          setNewRow((prevRow) => ({
            ...prevRow,
          }));
          setData((prevData) => [
            ...prevData,
            { ...newRow, date: format(new Date(), "MM/dd/yyyy") },
          ]);
        }
      })
      .then(() => {
        setNewRow({
          to: "",
          from: "",
          amount: 0,
          date: "",
        });
      });
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {/* <th className="px-6 py-3 text-left">ID</th> */}
          <th className="px-6 py-3 text-left">From</th>
          <th className="px-6 py-3 text-left">To</th>

          <th className="px-6 py-3 text-left">Amount</th>
          <th className="px-6 py-3 text-left">Date</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr className={`relative ${props.openBudget ? "h-[80px]" : "h-[0px]"}`}>
          <div className="absolute inset-0">{props.budgetInput}</div>
        </tr>
        {props.newTransaction != null ? (
          <tr>
            {/* <td className="px-6 py-4">{newRow.id}</td> */}
            <td className="px-6 py-4">
              <select
                className="border border-gray-300 rounded px-2 py-1"
                value={newRow.from}
                onChange={handleFromChange}
              >
                <option value="">Select category</option>
                {props.fromAccounts.map((category: any) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-6 py-4">
              <select
                className="border border-gray-300 rounded px-2 py-1"
                value={newRow.to}
                onChange={handleToChange}
              >
                <option value="">Select category</option>
                {props.toAccounts.map((category: any) => (
                  <option className="" key={category} value={category}>
                    <h2 className=" h-[100px] pt-[30px] text-[14px]">
                      {category}
                    </h2>
                  </option>
                ))}
              </select>
            </td>
            <td className="px-6 py-4">
              <input
                type="text"
                className="h-full w-[150px] rounded-[10px] h-[31px] border border-[#00000030] text-[black] text-[17px] pl-[5px] "
                name=""
                id=""
                value={newRow.amount}
                placeholder="$---"
                onChange={handleValueChange}
              />
            </td>

            <td className="px-6 py-4 flex gap-[5px]">
              <button
                className="h-[30px] w-[60px] text-[#fff] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
                onClick={handleAddRow}
              >
                Add
              </button>
              <button
                className="h-[30px] w-[30px] text-[#fff] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
                onClick={() => {
                  setNewRow({
                    to: "",
                    from: "",
                    amount: 0,
                    date: "",
                  });
                  props.setNewTransaction(null);
                }}
              >
                X
              </button>
            </td>
          </tr>
        ) : (
          <></>
        )}
        {data.map((row, i: number) => (
          <tr key={i}>
            {/* <td className="px-6 py-4">{row.id}</td> */}
            <td className="px-6 py-4">{row.from}</td>
            <td className="px-6 py-4">{row.to}</td>
            <td className="px-6 py-4">{row.amount}</td>
            <td className="px-6 py-4">{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

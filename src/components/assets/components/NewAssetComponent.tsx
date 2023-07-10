import CloseIcon from "@/assets/Icons/CloseIcon";
import React, { useState, useEffect } from "react";

const NewAssetComponent = (props: any) => {
  const [Asset, setAsset] = useState<any | null>(null);

  useEffect(() => {
    setAsset(props.account);
  }, [props.account]);

  const handleChange = (event: any, setValue: Function) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    setValue(numericValue);
  };

  return Asset != null ? (
    <div className="w-full h-full pt-[100px] relative  flex flex-col">
      <div
        className="absolute cursor-pointer left-[20px] top-[30px]"
        onClick={() => {
          setAsset(null);
          props.setNewAsset(null);
        }}
      >
        <CloseIcon />
      </div>
      <input
        className="w-[250px] h-[50px] border-b m-[20px] border-[#00000040] text-[35px]"
        placeholder="Asset Name"
        type="text"
        value={
          typeof Asset.id != "undefined" || Asset.id != null ? Asset.id : ""
        }
        onChange={(e) => {
          setAsset({ ...Asset, id: e.target.value });
        }}
        name=""
        id=""
      />

      <div className={`${Asset.type != "debt" ? "hidden" : ""} p-[20px]`}>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Length
          </h2>
          <input
            type="text"
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            value={
              typeof Asset.length != "undefined" || Asset.length != null
                ? Asset.length
                : ""
            }
            placeholder="(months)"
            onChange={(e) =>
              handleChange(e, (num: number) => {
                setAsset({ ...Asset, length: num });
              })
            }
          />
        </div>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Interest
          </h2>
          <input
            type="number"
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            value={
              typeof Asset.interest != "undefined" || Asset.interest != null
                ? Asset.interest
                : ""
            }
            placeholder="(percentage)"
            onChange={(e) =>
              setAsset({ ...Asset, interest: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Min Payment
          </h2>
          <input
            type="text"
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            value={
              typeof Asset.min_payment != "undefined" ||
              Asset.min_payment != null
                ? Asset.min_payment
                : ""
            }
            placeholder=""
            onChange={(e) =>
              handleChange(e, (num: number) => {
                setAsset({ ...Asset, min_payment: num });
              })
            }
          />
        </div>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Total Owed
          </h2>
          <input
            type="text"
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            value={
              typeof Asset.total != "undefined" || Asset.total != null
                ? Asset.total
                : ""
            }
            placeholder=""
            onChange={(e) =>
              handleChange(e, (num: number) => {
                setAsset({ ...Asset, total: Number(num) });
              })
            }
          />
        </div>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Debt Type
          </h2>
          <select
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            onChange={(e) => {
              setAsset({ ...Asset, debtType: e.target.value });
            }}
          >
            <option value="asset">asset</option>
            <option value="house">house</option>
            <option value="other">other</option>
          </select>
        </div>
        <div className="flex items-center">
          <h2 className={` text-[25px] cursor-pointer text-[#00000070]`}>
            Current Amount
          </h2>
          <input
            type="text"
            className="w-[130px] h-[25px] border-b m-[20px] border-[#00000040] text-[20px] "
            name=""
            id=""
            value={
              typeof Asset.amount != "undefined" || Asset.amount != null
                ? Asset.amount
                : ""
            }
            placeholder=""
            onChange={(e) =>
              handleChange(e, (num: number) => {
                setAsset({ ...Asset, amount: num });
              })
            }
          />
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <button
          className="h-[30px] w-[150px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
          onClick={async () => {
            props.onSubmit(Asset);
            console.log(Asset);
          }}
        >
          <h2 className="text-[#fff] text-[18px]">Create</h2>
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default NewAssetComponent;

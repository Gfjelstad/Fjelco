import React, { useState } from "react";
import HeaderFinance from "../../components/finances/HeaderFinance";
import useAssets from "@/components/assets/hooks/useAssets";
import NewAsset from "@/components/assets/components/NewAssetComponent";
import addNewAsset from "@/components/assets/methods/addNewAsset";
import UpdateAsset from "@/components/assets/methods/UpdateAsset";
import DeleteAsset from "@/components/assets/methods/deleteAsset";
import useAccounts from "@/components/accounts/hooks/useAccounts";

const Assets = () => {
  const [newAsset, setnewAsset] = useState<any | null>(null);
  const [editAsset, setEditAsset] = useState<any | null>(null);
  const [clickedAsset, setClickedAsset] = useState("");
  const { data: assetData, isFetched, refetch: refetchAssets } = useAssets();
  const {
    data: accountData,
    isFetched: accountFetched,
    refetch: refetchaccount,
  } = useAccounts();

  function addCommas(number: number): string {
    const numberStr: string = String(number);
    const numDigits: number = numberStr.length;
    const commaCount: number = Math.floor((numDigits - 1) / 3);

    let result: string = "";
    for (let i = 0; i < numDigits; i++) {
      const digitIndex: number = numDigits - i - 1;
      result = numberStr[digitIndex] + result;
      if (i !== numDigits - 1 && i % 3 === 2) {
        result = "," + result;
      }
    }

    if (result[0] === "," || result[0] === "-") {
      if (result[0] === "-" && result[1] == ",") {
        return result.slice(0, 1) + result.slice(2, result.length).concat();
      } else if (result[0] === "-" && result[1] != ",") {
        return result;
      } else {
        return result.slice(1, result.length).concat();
      }
    } else {
      return result;
    }
  }
  return isFetched && accountFetched ? (
    <div className="w-full flex flex-col items-center">
      <div
        className={`fixed w-[400px] bg-[#fff] duration-300 h-screen ${
          newAsset === null ? "right-[-400px]" : "right-[0px]"
        }`}
      >
        <NewAsset
          asset={newAsset}
          setNewAsset={setnewAsset}
          onSubmit={async (item: any) => {
            // console.log("submit", item);
            if (item.type === "fund") {
              console.log("fund", item);
              if (assetData.data.some((asset: any) => asset.id === item.id)) {
                await UpdateAsset({
                  ...item,
                  amount: Number(item.amount),
                }).then(() => {
                  refetchAssets();
                  setnewAsset(null);
                });
              } else {
                await addNewAsset({
                  ...item,
                  amount: Number(item.amount),
                }).then(() => {
                  refetchAssets();
                  setnewAsset(null);
                });
              }
            } else if (item.type === "debt") {
              console.log("debt", item);
              if (assetData.data.some((asset: any) => asset.id === item.id)) {
                await UpdateAsset({
                  ...item,
                  amount: -Number(item.amount),
                }).then(() => {
                  refetchAssets();
                  setnewAsset(null);
                });
              } else {
                await addNewAsset({
                  ...item,
                  amount: -Number(item.amount),
                }).then(() => {
                  refetchAssets();
                  setnewAsset(null);
                });
              }
            }
          }}
        />
      </div>
      <HeaderFinance title="Assets" />
      <div className="w-[90%]   flex flex-col">
        <div className="w-full h-[80px] flex justify-end items-center">
          <button
            className="h-[30px] w-[150px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
            onClick={async () => {
              setnewAsset({
                type: "debt",
              });
            }}
          >
            <h2 className="text-[#fff] text-[18px]">+ New Asset </h2>
          </button>
        </div>
        <div className="w-full flex items-center justify-start overflow-hidden">
          <h2 className="text-[35px] text-[#00000090] mr-[25px]">Debt</h2>
          <div className="h-[2px] w-[100%] bg-[#00000050]" />
        </div>
        <div className="w-full flex gap-[30px] flex-wrap pr-[200px]">
          {accountData.data
            .filter(
              (item: any) =>
                item.type === "debt" &&
                item.debtType === "asset" &&
                item.amount < 0
            )
            .map((asset: any) => {
              return (
                <div
                  key={asset.id}
                  className="w-[200px] p-[15px] relative h-[250px] bg-[#fff] rounded-[10px] shadow-lg"
                  onClick={() => {
                    clickedAsset === asset.id
                      ? setClickedAsset("")
                      : setClickedAsset(asset.id);
                  }}
                >
                  <h2 className="text-[28px]">
                    {asset.id}{" "}
                    <span className="text-[18px] text-[#00000080]">
                      {asset.asset ? "asset" : ""}
                    </span>
                  </h2>
                  <div className="w-full mt-[10px] flex justify-between">
                    <h2 className="text-[16px]">Length</h2>
                    <h2 className="text-[16px]">{asset.length} months</h2>
                  </div>
                  <div className="w-full  flex justify-between">
                    <h2 className="text-[16px]">Interest Rate</h2>
                    <h2 className="text-[16px]">{asset.interest}%</h2>
                  </div>
                  <div className="absolute bottom-0 right-0 left-0 flex flex-col items-center justify-end">
                    <div className="w-full flex justify-between pl-[10px] pr-[10px]">
                      <h2 className="text-[21px]">Amount</h2>
                      <h2 className={`text-[21px] ${"text-[#000000]"}`}>
                        ${addCommas(asset.total + asset.amount)}
                      </h2>
                    </div>
                    <div
                      className={`${
                        clickedAsset === asset.id ? "h-[30px]" : "h-[0px]"
                      } overflow-hidden duration-200 w-full flex items-center justify-evenly`}
                    >
                      <button
                        className="h-[20px] w-[60px] pt-[5px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
                        onClick={async () => {
                          setnewAsset(asset);
                        }}
                      >
                        <h2 className="text-[#fff] text-[15px]">Edit</h2>
                      </button>
                      <button
                        className="h-[20px] pt-[5px] w-[20px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
                        onClick={async () => {
                          await DeleteAsset(asset).then(() => refetchAssets());
                        }}
                      >
                        <h2 className="text-[#fff] text-[15px]">X</h2>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="w-full flex items-center mt-[40px] justify-start overflow-hidden">
          <h2 className="text-[35px] text-[#00000090] mr-[25px]">Owned</h2>
          <div className="h-[2px] w-[100%] bg-[#00000050]" />
        </div>
        <div className="w-full flex gap-[30px] flex-wrap pr-[200px]">
          {accountData.data
            .filter(
              (item: any) =>
                item.type === "debt" &&
                item.debtType === "asset" &&
                item.amount >= 0
            )
            .map((asset: any) => {
              return (
                <div
                  className="w-[200px] p-[15px] relative h-[250px] bg-[#fff] rounded-[10px] shadow-lg"
                  onClick={() => {
                    clickedAsset === asset.id
                      ? setClickedAsset("")
                      : setClickedAsset(asset.id);
                  }}
                >
                  <h2 className="text-[28px]">
                    {asset.id}{" "}
                    <span className="text-[18px] text-[#00000080]">
                      {asset.asset ? "asset" : ""}
                    </span>
                  </h2>

                  <div className="absolute bottom-0 right-0 left-0 flex flex-col items-center justify-end">
                    <div className="w-full flex justify-between pl-[10px] pr-[10px]">
                      <h2 className="text-[21px]">Amount</h2>
                      <h2
                        className={`text-[21px] ${
                          asset.amount > asset.goal
                            ? "text-[green]"
                            : "text-[#000000]"
                        }`}
                      >
                        ${addCommas(asset.total + asset.amount)}
                      </h2>
                    </div>
                    <div
                      className={`${
                        clickedAsset === asset.id ? "h-[30px]" : "h-[0px]"
                      } overflow-hidden duration-200 w-full flex items-center justify-evenly`}
                    >
                      <button
                        className="h-[20px] w-[60px] pt-[5px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
                        onClick={async () => {
                          setnewAsset(asset);
                        }}
                      >
                        <h2 className="text-[#fff] text-[15px]">Edit</h2>
                      </button>
                      {asset.id != "Emergency Fund" && (
                        <button
                          className="h-[20px] pt-[5px] w-[20px] rounded-[10px] bg-[#0066FF] flex items-center justify-center"
                          onClick={async () => {
                            await DeleteAsset(asset).then(() =>
                              refetchAssets()
                            );
                          }}
                        >
                          <h2 className="text-[#fff] text-[15px]">X</h2>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Assets;

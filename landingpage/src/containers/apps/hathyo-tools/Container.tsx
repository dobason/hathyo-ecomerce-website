"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import InputForm from "./InputForm";
import ToolsGallery from "./Gallery";
import ToolContents from "./Contents";
import ContractFooter from "@/components/ContractFooter";
import ChartResult from "./Charts";
import { toolInputsConfig } from "./ToolInputsConfig";
import { HealthTools } from "./Tools/HealthTools";
import { UserInfo, ToolResult, Gender } from "@/types/health-tools";
import { useSearchParams } from "next/navigation";

function Container() {
  const [toolSelected, setToolSelected] = useState<
    keyof typeof toolInputsConfig | null
  >(null);
  const [userData, setUserData] = useState<null | UserInfo>(null);
  const [healthResult, setHealthResult] = useState<ToolResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    onSetResult();
  }, [userData]);

  useEffect(() => {
    if (toolSelected !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [toolSelected]);

  useEffect(() => {
    if (!!searchParams) {
      const name = searchParams.get("name");
      const height = searchParams.get("height");
      const age = searchParams.get("age");
      const gender = searchParams.get("gender") as Gender;
      const weight = searchParams.get("weight");
      const tool = searchParams.get("tool") ?? "";
      if (!!name && !!height && !!age && !!gender && !!weight) {
        setToolSelected(tool);
        setUserData({
          name,
          age: parseInt(age),
          gender,
          weight: parseInt(weight),
          height: parseInt(height),
          bmr_formula: "katch_mc_ardle",
          bfp_formula: "bmi",
          time_run: "00:50:25",
          distance_run: 5,
          repeat_in_rep_max: 1,
          activityLevel: 1.2,
          met: 1,
          duration: 1,
          race: "black",
          drinks: [
            {
              type: "Beer",
              amount: 2,
              size: "12oz/330ml bar cup (small)",
              abv: 5,
            },
          ],
        });
        setShowResult(true);
      }
    }
  }, [searchParams]);

  const onSetResult = async () => {
    try {
      if (userData !== null) {
        const healthTools = new HealthTools(userData);
        let result = await healthTools.getHealthToolsResults();
        result["user_infor"] = userData;
        setHealthResult(result);
      } else {
        setHealthResult(null);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <main>
      {toolSelected == null ? (
        <ToolsGallery setToolSelected={setToolSelected} />
      ) : (
        <div>
          <div className="bg-gradient-to-r from-Moss/900 to-[#6DA82D] flex justify-center">
            <div className="xl:w-11/12 xl:py-14 w-full py-8 flex justify-center">
              <div className="grid grid-cols-1 xl:grid-cols-2">
                <div className="hidden xl:block m-auto">
                  <Image
                    className="object-cover"
                    alt="main banner"
                    src="/person_model.png"
                    width="600"
                    height="600"
                  />
                </div>
                <div className="flex justify-center px-4">
                  {showResult ? (
                    <ChartResult
                      toolSelected={toolSelected}
                      healthResult={healthResult}
                      setShowResult={setShowResult}
                      setHealthResult={setHealthResult}
                      setToolSelected={setToolSelected}
                    />
                  ) : (
                    <InputForm
                      toolSelected={toolSelected}
                      setUserData={setUserData}
                      setShowResult={setShowResult}
                      setToolSelected={setToolSelected}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-Moss/100">
            <div className="container m-auto">
              <div className="flex justify-center">
                <div className="xl:w-4/5 w-full bg-white flex flex-col justify-center xl:m-10 m-4 xl:p-10 p-4">
                  <ToolContents toolSelected={toolSelected} />
                  <ContractFooter />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Container;

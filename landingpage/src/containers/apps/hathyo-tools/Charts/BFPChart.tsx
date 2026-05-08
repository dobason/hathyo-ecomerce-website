import React, { Fragment, useEffect, useState } from "react";
import classNames from "classnames";
import { Gender, ToolResult } from "@/types/health-tools";
import EmptyAnimation from "@/components/Empty";

type bfpData = {
  us_navy: number;
  bmi: number;
  gender: Gender;
  category: string;
  fatMass: number;
  leanMass: number;
};

interface Props {
  healthResult: ToolResult | null;
}

function BFPChart({ healthResult }: Props) {
  const [bfpData, setBFPData] = useState<bfpData | null>(null);
  const between = (
    x: number,
    gender: Gender,
    min_male: number,
    max_male: number,
    min_female: number,
    max_female: number
  ) => {
    if (gender == "male") {
      return x >= min_male && x < max_male;
    } else {
      return x >= min_female && x < max_female;
    }
  };

  useEffect(() => {
    if (!healthResult || healthResult == null) return;
    const bfpResult = healthResult.bfp_result;
    const data = {
      bmi: bfpResult?.bmi ?? 0,
      gender: healthResult.user_infor.gender,
      us_navy: bfpResult?.us_navy ?? 0,
      category: bfpResult?.category ?? "",
      fatMass: bfpResult?.fatMass ?? 0,
      leanMass: bfpResult?.leanMass ?? 0,
    };
    setBFPData(data);
  }, [healthResult]);

  return (
    <div className="container">
      {bfpData == null ? (
        <EmptyAnimation />
      ) : (
        <div className="flex py-10 flex-col">
          <div className="mb-16">
            <div className="flex w-full h-16">
              {/* Phần đầu */}
              <div
                className={classNames("relative bg-[#FDA29B] rounded-l-lg", {
                  "w-[4%]": bfpData.gender === "male",
                  "w-[20%]": bfpData.gender === "female",
                })}
              >
                <span className="absolute bottom-[-5px] right-[-15px] p-1 text-xs text-Moss/700 font-extrabold z-10">
                  {bfpData.gender == "male" ? (
                    <span>2%</span>
                  ) : (
                    <span>10%</span>
                  )}
                </span>
                {(bfpData.bmi ?? 0) < 2 && (
                  <div className="absolute flex flex-col justify-center items-center left-1/2 top-[-55px] transform -translate-x-1/2 gap-1">
                    <div className="text-lg font-bold text-white">
                      {bfpData.us_navy > 0 ? bfpData.us_navy : bfpData.bmi}%
                    </div>
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                )}
              </div>
              {/* Phần hai */}
              <div
                className={classNames("relative bg-[#FEDF89]", {
                  "w-[8%]": bfpData.gender === "male",
                  "w-[10%]": bfpData.gender === "female",
                })}
              >
                <span className="absolute bottom-[-5px] right-[-15px] p-1 text-xs text-Moss/700 font-extrabold z-10">
                  {bfpData.gender == "male" ? (
                    <span>6%</span>
                  ) : (
                    <span>14%</span>
                  )}
                </span>
                <span className="hidden xl:block absolute left-1/2 bottom-[-30px] transform -translate-x-1/2 p-1 text-xs text-white z-10">
                  Essential
                </span>
                {between(bfpData.bmi, bfpData.gender, 2, 6, 10, 14) && (
                  <div className="absolute flex flex-col justify-center items-center left-1/2 top-[-55px] transform -translate-x-1/2 gap-1">
                    <div className="text-lg font-bold text-white">
                      {bfpData.us_navy > 0 ? bfpData.us_navy : bfpData.bmi}%
                    </div>
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                )}
              </div>
              {/* Phần ba */}
              <div
                className={classNames("relative bg-[#ACDC79]", {
                  "w-[20%]": bfpData.gender === "male",
                  "w-[18%]": bfpData.gender === "female",
                })}
              >
                <span className="absolute bottom-[-5px] right-[-15px] p-1 text-xs text-Moss/700 font-extrabold z-10">
                  {bfpData.gender == "male" ? (
                    <span>14%</span>
                  ) : (
                    <span>21%</span>
                  )}
                </span>
                <span className="hidden xl:block absolute left-1/2 bottom-[-30px] transform -translate-x-1/2 p-1 text-xs text-white z-10">
                  Athletes
                </span>
                {between(bfpData.bmi, bfpData.gender, 6, 14, 14, 21) && (
                  <div className="absolute flex flex-col justify-center items-center left-1/2 top-[-55px] transform -translate-x-1/2 gap-1">
                    <div className="text-lg font-bold text-white">
                      {bfpData.us_navy > 0 ? bfpData.us_navy : bfpData.bmi}%
                    </div>
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                )}
              </div>
              {/* Phần tư */}
              <div className="relative w-[12%] bg-[#8AC051]">
                <span className="absolute bottom-[-5px] right-[-15px] p-1 text-xs text-Moss/700 font-extrabold z-10">
                  {bfpData.gender == "male" ? (
                    <span>18%</span>
                  ) : (
                    <span>25%</span>
                  )}
                </span>
                <span className="hidden xl:block absolute left-1/2 bottom-[-30px] transform -translate-x-1/2 p-1 text-xs text-white z-10">
                  Fitness
                </span>
                {between(bfpData.bmi, bfpData.gender, 14, 18, 21, 25) && (
                  <div className="absolute flex flex-col justify-center items-center left-1/2 top-[-55px] transform -translate-x-1/2 gap-1">
                    <div className="text-lg font-bold text-white">
                      {bfpData.us_navy > 0 ? bfpData.us_navy : bfpData.bmi}%
                    </div>
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                )}
              </div>
              {/* Phần năm */}
              <div
                className={classNames("relative bg-[#FEDF89]", {
                  "w-[16%]": bfpData.gender === "male",
                  "w-[15%]": bfpData.gender === "female",
                })}
              >
                <span className="absolute bottom-[-5px] right-[-15px] p-1 text-xs text-Moss/700 font-extrabold z-10">
                  {bfpData.gender == "male" ? (
                    <span>25%</span>
                  ) : (
                    <span>32%</span>
                  )}
                </span>
                <span className="hidden xl:block absolute left-1/2 bottom-[-30px] transform -translate-x-1/2 p-1 text-xs text-white z-10">
                  Average
                </span>
                {between(bfpData.bmi, bfpData.gender, 18, 25, 25, 32) && (
                  <div className="absolute flex flex-col justify-center items-center left-1/2 top-[-55px] transform -translate-x-1/2 gap-1">
                    <div className="text-lg font-bold text-white">
                      {bfpData.us_navy > 0 ? bfpData.us_navy : bfpData.bmi}%
                    </div>
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                )}
              </div>
              {/* Phần sáu */}
              <div
                className={classNames("relative bg-[#FDA29B] rounded-r-lg", {
                  "w-[40%]": bfpData.gender === "male",
                  "w-[25%]": bfpData.gender === "female",
                })}
              >
                <span className="hidden xl:block absolute left-1/2 bottom-[-30px] transform -translate-x-1/2 p-1 text-xs text-white z-10">
                  Obese
                </span>
                {((bfpData.bmi >= 25 && bfpData.gender === "male") ||
                  (bfpData.bmi >= 32 && bfpData.gender === "female")) && (
                  <div className="absolute flex flex-col justify-center items-center left-1/2 top-[-55px] transform -translate-x-1/2 gap-1">
                    <div className="text-lg font-bold text-white">
                      {bfpData.us_navy > 0 ? bfpData.us_navy : bfpData.bmi}%
                    </div>
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-10 overflow-x-auto">
            <table className="table-auto border-collapse w-full">
              <tbody>
                {/* BMI Method */}
                <tr>
                  <td className="border border-white px-4 py-2 w-[70%]">
                    <div className="text-sm xl:text-base font-bold text-white">
                      Tỷ lệ mỡ cơ thể bạn (Dựa trên BMI)
                    </div>
                  </td>
                  <td className="border border-white px-4 py-2 w-[30%]">
                    <div className="text-xs xl:text-base font-bold text-white">
                      {bfpData.us_navy > 0 ? bfpData.us_navy : bfpData.bmi}%
                    </div>
                  </td>
                </tr>
                {/* Category */}
                <tr>
                  <td className="border border-white px-4 py-2 w-[70%]">
                    <div className="text-sm xl:text-base font-bold text-white">
                      Phân loại
                    </div>
                  </td>
                  <td className="border border-white px-4 py-2 w-[30%]">
                    <div className="text-xs xl:text-base font-bold text-white">
                      {bfpData.category}
                    </div>
                  </td>
                </tr>
                {bfpData.us_navy > 0 && (
                  <Fragment>
                    {/* US Navy Method */}
                    <tr>
                      <td className="border border-white px-4 py-2 w-[70%]">
                        <div className="text-sm xl:text-base font-bold text-white">
                          Tỷ lệ mỡ cơ thể (Theo công thức của Hải quân Hoa Kỳ)
                        </div>
                      </td>
                      <td className="border border-white px-4 py-2 w-[30%]">
                        <div className="text-xs xl:text-base font-bold text-white">
                          {bfpData.us_navy} %
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                )}
                {/* Body Fat Mass */}
                <tr>
                  <td className="border border-white px-4 py-2 w-[70%]">
                    <div className="text-sm xl:text-base font-bold text-white">
                      Khối lượng mỡ cơ thể (Fat Mass)
                    </div>
                  </td>
                  <td className="border border-white px-4 py-2 w-[30%]">
                    <div className="text-xs xl:text-base font-bold text-white">
                      {bfpData.fatMass} kg
                    </div>
                  </td>
                </tr>
                {/* Lean Body Mass */}
                <tr>
                  <td className="border border-white px-4 py-2 w-[70%]">
                    <div className="text-sm xl:text-base font-bold text-white">
                      Khối lượng cơ thể không bao gồm mỡ (Lean Mass)
                    </div>
                  </td>
                  <td className="border border-white px-4 py-2 w-[30%]">
                    <div className="text-xs xl:text-base font-bold text-white">
                      {bfpData.leanMass} kg
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-sm text-white italic">
            {bfpData.us_navy < 0 ? (
              <span>
                (*) Trên đây là kết quả được tính dựa trên BMI của bạn. Ngoài ra
                để hiển thị kết quả theo công thức của hải quân Hoa Kỳ, phần
                input bạn vui lòng nhập đủ các thông tin về vòng cổ, vòng eo,
                vòng hông, cân nặng, chiều cao và độ tuổi.
              </span>
            ) : (
              <span>
                (*) Trên đây là kết quả được tính dựa trên công thức của hải
                quân Hoa Kỳ.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BFPChart;

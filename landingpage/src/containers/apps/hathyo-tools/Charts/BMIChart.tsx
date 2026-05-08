"use client";
import { ToolResult } from "@/types/health-tools";
import React, { useEffect, useState } from "react";
import GaugeComponent from "react-gauge-component";

interface Props {
  healthResult: ToolResult | null;
}

const BMIChart = ({ healthResult }: Props) => {
  const [overallAssessment, setOverallAssessment] = useState<string | null>(
    null
  );
  const [BMI, setBMIData] = useState<number>(0);
  const [detailAssessment, setDetailAssessment] = useState<string | null>(null);

  const between = (bmi: number, min: number, max: number) => {
    return bmi >= min && bmi < max;
  };

  const bmi_rate_conversion = (bmi: number) => {
    let bmi_rate = 0;
    const rate_conversion = (
      bmi: number,
      min_bmi: number,
      max_bmi: number,
      min_rate: number,
      max_rate: number
    ) => {
      return (
        min_rate +
        ((bmi - min_bmi) / (max_bmi - min_bmi)) * (max_rate - min_rate)
      );
    };
    if (between(bmi, 0, 18.5)) {
      bmi_rate = rate_conversion(bmi, 0, 18.5, 0, 20);
    } else if (between(bmi, 18.5, 25)) {
      bmi_rate = rate_conversion(bmi, 18.5, 25, 20, 40);
    } else if (between(bmi, 25, 30)) {
      bmi_rate = rate_conversion(bmi, 25, 30, 40, 60);
    } else if (between(bmi, 30, 35)) {
      bmi_rate = rate_conversion(bmi, 30, 35, 60, 80);
    } else {
      bmi_rate = 100;
    }
    return bmi_rate;
  };

  useEffect(() => {
    if (!healthResult || healthResult == null) return;
    const bmiData = healthResult.bmi_result?.bmi;
    setBMIData(bmiData ?? 0);
  }, [healthResult]);

  useEffect(() => {
    const assessments = [
      { min: 0, max: 16, overall: "Thiếu cân", detail: "Gầy độ III" },
      { min: 16, max: 17, overall: "Thiếu cân", detail: "Gầy độ II" },
      { min: 17, max: 18.5, overall: "Thiếu cân", detail: "Gầy độ I" },
      { min: 18.5, max: 25, overall: "Bình thường", detail: "Bình thường" },
      { min: 25, max: 30, overall: "Thừa cân", detail: "Thừa cân" },
      { min: 30, max: 35, overall: "Béo phì", detail: "Béo phì độ I" },
      { min: 35, max: 40, overall: "Béo phì nặng", detail: "Béo phì độ II" },
      {
        min: 40,
        max: Infinity,
        overall: "Béo phì nặng",
        detail: "Béo phì độ III",
      },
    ];

    const assessment = assessments.find(
      ({ min, max }) => BMI >= min && BMI < max
    );

    if (assessment) {
      setOverallAssessment(assessment.overall);
      setDetailAssessment(assessment.detail);
    }
  }, [BMI]);

  const showLabel = (value: number) => {
    switch (value) {
      case 10:
        return "Thiếu cân";
      case 30:
        return "Cân đối";
      case 50:
        return "Thừa cân";
      case 70:
        return "Béo phì";
      case 90:
        return "Béo phì nặng";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col pb-5 bg-Moss/900 justify-center items-center shadow-Shadow/md rounded-xl">
        <div className="mb-10 w-full h-auto">
          <GaugeComponent
            value={bmi_rate_conversion(BMI)}
            type="semicircle"
            labels={{
              valueLabel: {
                hide: true,
              },
              tickLabels: {
                type: "outer",
                ticks: [
                  { value: 10 },
                  { value: 30 },
                  { value: 50 },
                  { value: 70 },
                  { value: 90 },
                ],
                hideMinMax: true,
                defaultTickValueConfig: {
                  formatTextValue: showLabel,
                  style: {
                    fontSize: "10px",
                    fill: "#ffffff",
                    textShadow:
                      "black 1px 1px 0px, black 0px 0px 2.5em, black 0px 0px 0.2em",
                  },
                },
                defaultTickLineConfig: {
                  length: 1,
                },
              },
            }}
            arc={{
              cornerRadius: 5,
              colorArray: [
                "#FECDCA",
                "#E6F4D7",
                "#FEF0C7",
                "#E9D7FE",
                "#FECDCA",
              ],
              subArcs: [{}, {}, {}, {}, {}],
              padding: 0.02,
              width: 0.4,
            }}
            pointer={{
              elastic: true,
              animationDelay: 0,
              color: "#F6D47C",
              width: 5,
            }}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center py-4">
          <h5 className="heading-5 text-Moss/200 font-bold">
            {overallAssessment} !
          </h5>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-row body-sm-semibold text-white gap-2">
              <span>Chỉ số BMI của bạn là:</span>
              <strong className="text-Moss/200">{BMI.toFixed(2)}</strong>
            </div>
            <div className="flex flex-row body-sm-medium text-white text-center gap-2">
              <span>Chỉ số BMI ở trên cho thấy bạn:</span>
              <strong className="text-Moss/200">{detailAssessment}</strong>
            </div>
          </div>
        </div>

        <div className="mb-10 overflow-x-auto">
          <table className="table-auto border-collapse w-full rounded-lg">
            <tbody>
              <tr>
                <td className="border border-white px-4 py-2w-7/12">
                  <div className="body-sm-medium text-white">
                    Khoảng BMI khỏe mạnh
                  </div>
                </td>
                <td className="border border-white px-4 py-2w-5/12">
                  <div className="body-sm-semibold text-white">
                    18.5 kg/m<sup>2</sup> - 25 kg/m<sup>2</sup>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-white px-4 py-2w-7/12">
                  <div className="body-sm-medium text-white">
                    Khoảng cân nặng được coi là khỏe mạnh phù hợp với chiều cao
                    bạn
                  </div>
                </td>
                <td className="border border-white px-4 py-2w-5/12">
                  <div className="body-sm-semibold text-white">
                    {healthResult?.health_weight_result?.minWeight} kg -{" "}
                    {healthResult?.health_weight_result?.maxWeight} kg
                  </div>
                </td>
              </tr>
              {/* Body Fat Mass */}
              <tr>
                <td className="border border-white px-4 py-2w-7/12">
                  <div className="body-sm-medium text-white">BMI Prime</div>
                </td>
                <td className="border border-white px-4 py-2w-5/12">
                  <div className="body-sm-semibold text-white">
                    {healthResult?.bmi_result?.bmi_prime}
                  </div>
                </td>
              </tr>
              {/* Lean Body Mass */}
              <tr>
                <td className="border border-white px-4 py-2w-7/12">
                  <div className="body-sm-medium text-white">
                    Ponderal Index
                  </div>
                </td>
                <td className="border border-white px-4 py-2w-5/12">
                  <div className="body-sm-semibold text-white">
                    {healthResult?.bmi_result?.pi} kg/m<sup>3</sup>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BMIChart;

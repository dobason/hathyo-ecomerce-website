import BFPChart from "./BFPChart";
import BMIChart from "./BMIChart";
import Button from "@/components/Button";
import { toolInputsConfig } from "../ToolInputsConfig";
import { ToolResult } from "@/types/health-tools";

interface Props {
  healthResult: ToolResult | null;
  toolSelected: keyof typeof toolInputsConfig;
  setHealthResult: React.Dispatch<React.SetStateAction<ToolResult | null>>;
  setToolSelected: React.Dispatch<
    React.SetStateAction<keyof typeof toolInputsConfig | null>
  >;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChartResult({
  toolSelected,
  healthResult,
  setHealthResult,
  setToolSelected,
  setShowResult,
}: Props) {
  console.log("toolSelected", toolSelected, healthResult);
  const renderContent = (tool: keyof typeof toolInputsConfig) => {
    switch (tool) {
      case "bfp_calculator":
        return <BFPChart healthResult={healthResult} />;
      case "bmi_calculator":
        return <BMIChart healthResult={healthResult} />;
      case "bmr_calculator":
        return "";
      case "tdee_calculator":
        return "";
      case "calories_calculator":
        return "";
      case "calories_burn_calculator":
        return "";
      case "health_weight_calculator":
        return "";
      case "ibw_calculator":
        return "";
      case "lbm_calculator":
        return "";
      case "bfp_calculator":
        return "";
      case "pace_calculator":
        return "";
      case "rm_calculator":
        return "";
      default:
        return null;
    }
  };
  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center gap-8">
        <h5 className="heading-5 text-white">Thông tin sức khỏe của bạn</h5>
        <div className="xl:w-10/12 flex flex-col py-10 bg-Moss/900 justify-center items-center shadow-Shadow/md rounded-xl">
          <div className="w-full h-auto px-5">
            {renderContent(toolSelected)}
          </div>
          <div className="xl:w-10/12 w-full flex justify-center">
            <Button
              type="secondary"
              htmlType="button"
              className="xl:w-2/3 w-full flex justify-center"
              onClick={() => {
                setShowResult(false);
                setToolSelected(null);
                setHealthResult(null);
              }}
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartResult;

import { toolInputsConfig } from "../ToolInputsConfig";
import BMIContent from "./BMI";
import BMRContent from "./BMR";
import BFPContent from "./BFP";
import TDEEContent from "./TDEE";
import CICContent from "./CIC";
import CBContent from "./CB";
import HWContent from "./HW";
import IBWContent from "./IBW";
import LBMContent from "./LBM";
import PCContent from "./PC";
import RMContent from "./RM";
import Updating from "./Updating";

interface Props {
  toolSelected: keyof typeof toolInputsConfig;
}

function ToolContents({ toolSelected }: Props) {
  const renderContent = (tool: keyof typeof toolInputsConfig) => {
    switch (tool) {
      case "bfp_calculator":
        return <BFPContent />;
      case "bmi_calculator":
        return <BMIContent />;
      case "bmr_calculator":
        return <BMRContent />;
      case "tdee_calculator":
        return <TDEEContent />;
      case "calories_calculator":
        return <CICContent />;
      case "calories_burn_calculator":
        return <CBContent />;
      case "health_weight_calculator":
        return <HWContent />;
      case "ibw_calculator":
        return <IBWContent />;
      case "lbm_calculator":
        return <LBMContent />;
      case "pace_calculator":
        return <PCContent />;
      case "rm_calculator":
        return <RMContent />;
      default:
        return <Updating />;
    }
  };
  return <div className="container">{renderContent(toolSelected)}</div>;
}

export default ToolContents;

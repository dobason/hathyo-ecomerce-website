import {
  UserInfo,
  PointsPage,
  PaceUnit,
  ToolResult,
} from "@/types/health-tools";
import { RMCalculator } from "./Fitness/RMCalculator";
import { BFPCalculator } from "./Fitness/BFPCalculator";
import { BMICalculator } from "./Fitness/BMICalculator";
import { BMRCalculator } from "./Fitness/BMRCalculator";
import { IBWCalculator } from "./Fitness/IBWCalculator";
import { LBMCalculator } from "./Fitness/LBMCalculator";
import { PaceCalculator } from "./Fitness/PaceCalculator";
import { CaloriesBurnCalculator } from "./Fitness/CaloriesBurnCalculator";
import { CaloriesCalculator } from "./Fitness/CaloriesCalculator";
import { HealthyWeightCalculator } from "./Fitness/HealthyWeightCalculator";
import { TDEECalculator } from "./Fitness/TDEECalculator";
import { BACCalculator } from "./Other/BACCalculator";
import { BSACalculator } from "./Other/BSACalculator";
import { CarbonHydrateCalculator } from "./Other/CarbonHydrateCalculator";
import { FatIntakeCalculator } from "./Other/FatIntakeCalculator";
import { GFRCalculator } from "./Other/GFRCalculator";
import { MacroCalculator } from "./Other/MacroCalculator";
import { ProteinCalculator } from "./Other/ProteinCalculator";
import { WHRCalculator } from "./Other/WHRCalculator";

export class HealthTools {
  private userInfo: UserInfo;
  private _bmi_calculator?: BMICalculator;
  private _bfp_calculator?: BFPCalculator;
  private _bmr_calculator?: BMRCalculator;
  private _calories_calculator?: CaloriesCalculator;
  private _calories_burn_calculator?: CaloriesBurnCalculator;
  private _health_weight_calculator?: HealthyWeightCalculator;
  private _ibw_calculator?: IBWCalculator;
  private _lbm_calculator?: LBMCalculator;
  private _pace_calculator?: PaceCalculator;
  private _rm_calculator?: RMCalculator;
  private _tdee_calculator?: TDEECalculator;
  private _bac_calculator?: BACCalculator;
  private _bsa_calculator?: BSACalculator;
  private _carbonhydrate_calculator?: CarbonHydrateCalculator;
  private _fat_intake_calculator?: FatIntakeCalculator;
  private _gfr_calculator?: GFRCalculator;
  private _macro_calculator?: MacroCalculator;
  private _protein_calculator?: ProteinCalculator;
  private _whr_calculator?: WHRCalculator;

  constructor(userInfo: UserInfo) {
    this.userInfo = userInfo;
  }

  // Lazy initialization for each calculator
  private get bmi_calculator() {
    if (!this._bmi_calculator) {
      this._bmi_calculator = new BMICalculator(
        this.userInfo.weight,
        this.userInfo.height
      );
    }
    return this._bmi_calculator;
  }

  private get bfp_calculator() {
    if (!this._bfp_calculator) {
      this._bfp_calculator = new BFPCalculator(
        this.userInfo.age,
        this.userInfo.height,
        this.userInfo.weight,
        this.userInfo.gender,
        this.userInfo.hipCircumference ?? 0,
        this.userInfo.neckCircumference ?? 0,
        this.userInfo.waistCircumference ?? 0,
        this.bmi_calculator.calculateBMIFormula()
      );
    }
    return this._bfp_calculator;
  }

  private get bmr_calculator() {
    if (!this._bmr_calculator) {
      this._bmr_calculator = new BMRCalculator(
        this.userInfo.age,
        this.userInfo.weight,
        this.userInfo.height,
        this.userInfo.gender,
        this.bfp_calculator.calculateByUSNavyMethod(),
        this.bfp_calculator.calculateByBMI(),
        this.userInfo.bfp_formula ?? "bmi"
      );
    }
    return this._bmr_calculator;
  }

  private get calories_burn_calculator() {
    if (!this._calories_burn_calculator) {
      this._calories_burn_calculator = new CaloriesBurnCalculator(
        this.userInfo.met ?? 1,
        this.userInfo.duration ?? 1,
        this.userInfo.weight
      );
    }
    return this._calories_burn_calculator;
  }

  private get health_weight_calculator() {
    if (!this._health_weight_calculator) {
      this._health_weight_calculator = new HealthyWeightCalculator(
        this.userInfo.height
      );
    }
    return this._health_weight_calculator;
  }

  private get ibw_calculator() {
    if (!this._ibw_calculator) {
      this._ibw_calculator = new IBWCalculator(
        this.userInfo.height,
        this.userInfo.gender
      );
    }
    return this._ibw_calculator;
  }

  private get lbm_calculator() {
    if (!this._lbm_calculator) {
      this._lbm_calculator = new LBMCalculator(
        this.userInfo.height,
        this.userInfo.weight,
        this.userInfo.gender
      );
    }
    return this._lbm_calculator;
  }

  private get pace_calculator() {
    if (!this._pace_calculator) {
      this._pace_calculator = new PaceCalculator(
        this.userInfo.time_run ?? "00:00:00",
        this.userInfo.distance_run ?? 0
      );
    }
    return this._pace_calculator;
  }

  private get rm_calculator() {
    if (!this._rm_calculator) {
      this._rm_calculator = new RMCalculator(
        this.userInfo.weight,
        this.userInfo.repeat_in_rep_max ?? 1
      );
    }
    return this._rm_calculator;
  }

  private get tdee_calculator() {
    if (!this._tdee_calculator) {
      this._tdee_calculator = new TDEECalculator(
        this.userInfo.bmr_formula ?? "katch_mc_ardle",
        this.userInfo.bfp_formula ?? "bmi",
        this.bmr_calculator,
        this.userInfo.activityLevel ?? 1.2
      );
    }
    return this._tdee_calculator;
  }

  private get calories_calculator() {
    if (!this._calories_calculator) {
      this._calories_calculator = new CaloriesCalculator(
        this.tdee_calculator.calculate()
      );
    }
    return this._calories_calculator;
  }

  private get bac_calculator() {
    if (!this._bac_calculator) {
      this._bac_calculator = new BACCalculator(
        this.userInfo.drinks ?? [
          {
            type: "Beer",
            amount: 2,
            size: "12oz/330ml bar cup (small)",
            abv: 5,
          },
        ],
        this.userInfo.gender,
        this.userInfo.weight,
        this.userInfo.timeSinceFirstDrink ?? 1
      );
    }
    return this._bac_calculator;
  }

  private get bsa_calculator() {
    if (!this._bsa_calculator) {
      this._bsa_calculator = new BSACalculator(
        this.userInfo.height,
        this.userInfo.weight
      );
    }
    return this._bsa_calculator;
  }

  private get carbonhydrate_calculator() {
    if (!this._carbonhydrate_calculator) {
      this._carbonhydrate_calculator = new CarbonHydrateCalculator(
        this.tdee_calculator
      );
    }
    return this._carbonhydrate_calculator;
  }

  private get fat_intake_calculator() {
    if (!this._fat_intake_calculator) {
      this._fat_intake_calculator = new FatIntakeCalculator(
        this.tdee_calculator
      );
    }
    return this._fat_intake_calculator;
  }

  private get gfr_calculator() {
    if (!this._gfr_calculator) {
      this._gfr_calculator = new GFRCalculator(
        this.userInfo.age,
        this.userInfo.gender,
        {
          race: this.userInfo.race,
          height: this.userInfo.height,
          creatinine: this.userInfo.creatinine,
        }
      );
    }
    return this._gfr_calculator;
  }

  private get macro_calculator() {
    if (!this._macro_calculator) {
      this._macro_calculator = new MacroCalculator(
        this.userInfo.goal_macro,
        this.tdee_calculator
      );
    }
    return this._macro_calculator;
  }

  private get protein_calculator() {
    if (!this._protein_calculator) {
      this._protein_calculator = new ProteinCalculator(
        this.userInfo.weight,
        this.userInfo.activityLevelText
      );
    }
    return this._protein_calculator;
  }

  private get whr_calculator() {
    if (!this._whr_calculator) {
      this._whr_calculator = new WHRCalculator(
        this.userInfo.bustSize,
        this.userInfo.waistSize,
        this.userInfo.highHipSize,
        this.userInfo.hipSize
      );
    }
    return this._whr_calculator;
  }

  public getHealthToolsResults(
    points_break_in_race?: PointsPage,
    time_run?: string,
    from_unit_pace?: PaceUnit,
    to_unit_pace?: PaceUnit
  ): ToolResult {
    return {
      user_infor: this.userInfo,
      rm_result: this.rm_calculator.calculateAll(),
      bmi_result: this.bmi_calculator.calculateAll(),
      bfp_result: this.bfp_calculator.calculateAll(),
      ibw_result: this.ibw_calculator.calculateAll(),
      lbm_result: this.lbm_calculator.calculateAll(),
      bmr_result: this.bmr_calculator.calculateAll(),
      calories_result: this.calories_calculator.calculate(),
      tdee_result: this.tdee_calculator.calculate(),
      calories_burn_result: this.calories_burn_calculator.calculate(),
      health_weight_result: this.health_weight_calculator.calculate(),
      pace_result: this.pace_calculator.calculateAll(
        points_break_in_race,
        time_run,
        from_unit_pace,
        to_unit_pace
      ),
      bac_result: this.bac_calculator.calculate(),
      bsa_result: this.bsa_calculator.calculateAll(),
      carbonhydrate_result: this.carbonhydrate_calculator.calculateAll(),
      fat_intake_result: this.fat_intake_calculator.calculate(),
      gfr_result: this.gfr_calculator.calculateAll(),
      macro_result: this.macro_calculator.calculateAll(),
      protein_result: this.protein_calculator.calculate(),
      whr_result: this.whr_calculator.calculateAll(),
    };
  }
}

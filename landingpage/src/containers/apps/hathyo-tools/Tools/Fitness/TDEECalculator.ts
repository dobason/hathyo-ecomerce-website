import { BMRCalculator } from "./BMRCalculator";
import { ActivityLevel, BMRFormular, BFPFormular } from "@/types/health-tools";

export class TDEECalculator {
  private bmr_formula: BMRFormular;
  private bfp_formula: BFPFormular;
  private bmr_calculator: BMRCalculator;
  private activityLevel: ActivityLevel;

  constructor(
    bmr_formula: BMRFormular,
    bfp_formula: BFPFormular,
    bmr_calculator: BMRCalculator,
    activityLevel: ActivityLevel
  ) {
    this.bmr_calculator = bmr_calculator;
    this.activityLevel = activityLevel;
    this.bmr_formula = bmr_formula;
    this.bfp_formula = bfp_formula;
  }

  private _getBMRByFormula(
    bmr_formula: BMRFormular = "mifflin_st_jeor",
    bfp_formula: BFPFormular = "bmi"
  ) {
    if (bmr_formula == "mifflin_st_jeor") {
      return this.bmr_calculator.calculateByMifflinFormula();
    } else if (bmr_formula == "revised_harris_benedict") {
      return this.bmr_calculator.calculateByRevisedHarrisFormula();
    } else {
      return this.bmr_calculator.calculateByKatchMcArdleFormula(bfp_formula);
    }
  }

  public calculate() {
    const BMR = this._getBMRByFormula(this.bmr_formula, this.bfp_formula);
    return Math.round(BMR * this.activityLevel * 100) / 100;
  }
}

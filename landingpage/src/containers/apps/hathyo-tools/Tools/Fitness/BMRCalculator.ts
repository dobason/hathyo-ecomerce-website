import { BFPFormular, Gender } from "@/types/health-tools";

export class BMRCalculator {
  private age: number;
  private weight: number;
  private height: number;
  private gender: Gender;
  private bfp_us_navy: number;
  private bfp_bmi: number;
  private bfp_formula: BFPFormular;

  constructor(
    age: number,
    weight: number,
    height: number,
    gender: Gender,
    bfp_us_navy: number,
    bfp_bmi: number,
    bfp_formula: BFPFormular
  ) {
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.gender = gender;
    this.bfp_us_navy = bfp_us_navy;
    this.bfp_bmi = bfp_bmi;
    this.bfp_formula = bfp_formula;
  }

  public calculateByMifflinFormula() {
    return (
      Math.round(
        (10 * this.weight! +
          6.25 * this.height! -
          5 * this.age +
          (this.gender === "male" ? 5 : -161)) *
          100
      ) / 100
    );
  }

  public calculateByRevisedHarrisFormula() {
    if (this.gender === "male") {
      return (
        Math.round(
          (13.397 * this.weight +
            4.799 * this.height -
            5.677 * this.age +
            88.362) *
            100
        ) / 100
      );
    } else {
      return (
        Math.round(
          (9.247 * this.weight +
            3.098 * this.height -
            4.33 * this.age +
            447.593) *
            100
        ) / 100
      );
    }
  }

  public calculateByKatchMcArdleFormula(bfp_formula: string): number {
    let BFP = 0;
    if (bfp_formula == "us-navy") {
      BFP = this.bfp_us_navy;
    } else if ((bfp_formula = "bmi")) {
      BFP = this.bfp_bmi;
    } else {
      throw Error("Wrong BFP formula");
    }

    return Math.round((370 + 21.6 * (1 - BFP) * this.weight) * 100) / 100;
  }

  public calculateAll() {
    return {
      mifflin_st_jeor: this.calculateByMifflinFormula(),
      revised_harris_benedict: this.calculateByRevisedHarrisFormula(),
      katch_mc_ardle: this.calculateByKatchMcArdleFormula(this.bfp_formula),
    };
  }
}

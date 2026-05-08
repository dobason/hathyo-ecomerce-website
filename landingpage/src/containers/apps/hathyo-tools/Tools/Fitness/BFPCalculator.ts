import { Gender } from "@/types/health-tools";

export class BFPCalculator {
  private bmi: number;
  private age: number;
  private height: number;
  private weight: number;
  private gender: Gender;
  private hipCircumference: number;
  private neckCircumference: number;
  private waistCircumference: number;

  constructor(
    age: number,
    height: number,
    weight: number,
    gender: Gender,
    hipCircumference: number,
    neckCircumference: number,
    waistCircumference: number,
    bmi: number
  ) {
    this.bmi = bmi;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.gender = gender;
    this.hipCircumference = hipCircumference;
    this.neckCircumference = neckCircumference;
    this.waistCircumference = waistCircumference;
  }
  private _between(x: number, min: number, max: number) {
    return x >= min && x < max;
  }

  public calculateByUSNavyMethod(): number {
    if (this.gender === "male") {
      const bodyDensity =
        1.0324 -
        0.19077 *
          Math.log10(
            Number(this.waistCircumference) - Number(this.neckCircumference)
          ) +
        0.15456 * Math.log10(this.height);

      return Math.round((495 / bodyDensity - 450) * 100) / 100;
    } else if (this.gender === "female") {
      if (!this.hipCircumference) {
        throw new Error("Hip circumference is required");
      }

      const bodyDensity =
        1.29579 -
        0.35004 *
          Math.log10(
            Number(this.waistCircumference) +
              Number(this.hipCircumference) -
              Number(this.neckCircumference)
          ) +
        0.221 * Math.log10(this.height);

      return Math.round((495 / bodyDensity - 450) * 100) / 100;
    } else {
      return NaN;
    }
  }

  public calculateByBMI(): number {
    if (this._between(this.age, 2, 20)) {
      if (this.gender === "male") {
        return Math.round((1.51 * this.bmi + 0.7 * this.age - 2.2) * 100) / 100;
      } else if (this.gender === "female") {
        return Math.round((1.51 * this.bmi + 0.7 * this.age + 1.4) * 100) / 100;
      } else {
        return NaN;
      }
    } else if (this._between(this.age, 21, 100)) {
      if (this.gender === "male") {
        return (
          Math.round((1.2 * this.bmi + 0.23 * this.age - 16.2) * 100) / 100
        );
      } else if (this.gender === "female") {
        return Math.round((1.2 * this.bmi + 0.23 * this.age - 5.4) * 100) / 100;
      } else {
        return NaN;
      }
    } else {
      return NaN;
    }
  }

  public matchCategories(): string {
    const bfp_bmi = this.calculateByBMI();
    if (this.gender == "male") {
      if (this._between(bfp_bmi, 2, 6)) {
        return "Cực kỳ thấp (Essential fat)";
      } else if (this._between(bfp_bmi, 6, 14)) {
        return "Rất thấp (Athletes)";
      } else if (this._between(bfp_bmi, 14, 18)) {
        return "Thấp (Fitness)";
      } else if (this._between(bfp_bmi, 18, 25)) {
        return "Trung bình (Average)";
      } else if (bfp_bmi > 25) {
        return "Rất cao (Obese)";
      }
    } else {
      if (this._between(bfp_bmi, 10, 14)) {
        return "Cực kỳ thấp (Essential fat)";
      } else if (this._between(bfp_bmi, 14, 21)) {
        return "Rất thấp (Athletes)";
      } else if (this._between(bfp_bmi, 21, 25)) {
        return "Thấp (Fitness)";
      } else if (this._between(bfp_bmi, 25, 32)) {
        return "Trung bình (Average)";
      } else if (bfp_bmi > 32) {
        return "Rất cao (Obese)";
      }
    }
    return "Unknown";
  }

  public calculateFatMass(): number {
    if (this.calculateByUSNavyMethod() > 0) {
      return (
        Math.round(this.weight * (this.calculateByUSNavyMethod() / 100) * 100) /
        100
      );
    } else {
      return (
        Math.round(this.weight * (this.calculateByBMI() / 100) * 100) / 100
      );
    }
  }

  public calculateLeanMass(): number {
    return Math.round((this.weight - this.calculateFatMass()) * 100) / 100;
  }

  public calculateAll() {
    return {
      us_navy: this.calculateByUSNavyMethod(),
      bmi: this.calculateByBMI(),
      category: this.matchCategories(),
      fatMass: this.calculateFatMass(),
      leanMass: this.calculateLeanMass(),
    };
  }
}

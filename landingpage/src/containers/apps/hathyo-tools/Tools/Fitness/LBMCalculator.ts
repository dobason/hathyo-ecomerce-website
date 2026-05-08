import { Gender } from "@/types/health-tools";

export class LBMCalculator {
  private height: number;
  private weight: number;
  private gender: Gender;

  constructor(height: number, weight: number, gender: Gender) {
    this.height = height;
    this.weight = weight;
    this.gender = gender;
  }

  private _calculateECV(): number {
    return (
      0.0215 * Math.pow(this.weight, 0.6469) * Math.pow(this.height, 0.7236)
    );
  }

  public calculateByBoerFormula(): number {
    if (this.gender === "male") {
      return (
        Math.round((0.407 * this.weight + 0.267 * this.height - 19.2) * 100) /
        100
      );
    } else {
      return (
        Math.round((0.252 * this.weight + 0.473 * this.height - 48.3) * 100) /
        100
      );
    }
  }

  public calculateByJamesFormula(): number {
    if (this.gender === "male") {
      return (
        Math.round(
          (1.1 * this.weight - 128 * (this.weight / this.height) ** 2) * 100
        ) / 100
      );
    } else {
      return (
        Math.round(
          (1.07 * this.weight - 148 * (this.weight / this.height) ** 2) * 100
        ) / 100
      );
    }
  }

  public calculateByHumeFormula(): number {
    if (this.gender === "male") {
      return (
        Math.round(
          (0.3281 * this.weight + 0.33929 * this.height - 29.5336) * 100
        ) / 100
      );
    } else {
      return (
        Math.round(
          (0.29569 * this.weight + 0.41813 * this.height - 43.2933) * 100
        ) / 100
      );
    }
  }

  public calculateForChildren() {
    const eECV = this._calculateECV();
    const eLBM = 3.8 * eECV;

    return Math.round(eLBM * 100) / 100;
  }

  public calculateAll() {
    return {
      eLBM_boer: this.calculateByBoerFormula(),
      eLBM_hume: this.calculateByHumeFormula(),
      eLBM_james: this.calculateByJamesFormula(),
      eLBM_children: this.calculateForChildren(),
    };
  }
}

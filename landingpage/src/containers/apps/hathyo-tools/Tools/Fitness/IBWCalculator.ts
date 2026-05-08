import { Gender } from "@/types/health-tools";

export class IBWCalculator {
  private height: number;
  private gender: Gender;

  constructor(height: number, gender: Gender) {
    this.height = height;
    this.gender = gender;
  }

  private _convertHeightToInches(height: number): number {
    return height / 2.54;
  }

  private _calculateFormula(
    maleBase: number,
    maleFactor: number,
    femaleBase: number,
    femaleFactor: number
  ): number {
    const heightInInches = this._convertHeightToInches(this.height);
    const adjustment = heightInInches - 60;

    if (this.gender === "male") {
      return Math.round((maleBase + maleFactor * adjustment) * 100) / 100;
    } else {
      return Math.round((femaleBase + femaleFactor * adjustment) * 100) / 100;
    }
  }

  public calculateByHamwiFormula(): number {
    return this._calculateFormula(48, 2.7, 45.5, 2.2);
  }
  public calculateByDevineFormula(): number {
    return this._calculateFormula(50, 2.3, 45.5, 2.3);
  }
  public calculateByRobinsonFormula(): number {
    return this._calculateFormula(52, 1.9, 49, 1.7);
  }
  public calculateByMillerFormula(): number {
    return this._calculateFormula(56.2, 1.41, 51.3, 1.36);
  }

  public calculateAll() {
    return {
      g_j_hamwi: this.calculateByHamwiFormula(),
      b_j_devine: this.calculateByDevineFormula(),
      j_d_robinson: this.calculateByRobinsonFormula(),
      d_r_miller: this.calculateByMillerFormula(),
    };
  }
}

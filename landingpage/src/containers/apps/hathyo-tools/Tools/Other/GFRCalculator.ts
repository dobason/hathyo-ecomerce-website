import { Gender, Race } from "@/types/health-tools";

export class GFRCalculator {
  age: number;
  race?: Race;
  height?: number;
  gender: Gender;
  creatinine?: number;

  constructor(
    age: number,
    gender: Gender,
    options: { race?: Race; height?: number; creatinine?: number } = {}
  ) {
    this.age = age;
    this.gender = gender;
    // this.race = options.race;
    this.height = options.height;
    this.creatinine = options.creatinine;
  }

  public calculateGFRAdult() {
    if (!this.creatinine) {
      return null;
    }
    const kappa = this.gender === "female" ? 0.7 : 0.9;
    const alpha = this.gender === "female" ? -0.329 : -0.411;
    const C_gender = this.gender === "female" ? 1.018 : 1.0;
    const C_race = this.race === "black" ? 1.159 : 1.0;

    const GFR =
      141 *
      Math.pow(Math.min(this.creatinine! / kappa, 1), alpha) *
      Math.pow(Math.max(this.creatinine! / kappa, 1), -1.209) *
      Math.pow(0.993, this.age) *
      C_gender *
      C_race;

    return Math.round(GFR * 100) / 100;
  }

  public calculateGFRChildren() {
    if (!this.height || !this.creatinine) {
      return null;
    }
    let k: number;
    if (this.age < 1) {
      k = 0.33; // Trẻ sơ sinh đủ tháng
    } else if (this.age < 13) {
      k = 0.45; // Trẻ dưới 13 tuổi
    } else if (this.gender === "female") {
      k = 0.55; // Nữ từ 13-18 tuổi
    } else {
      k = 0.7; // Nam từ 13-18 tuổi
    }

    const GFR = (k * this.height!) / this.creatinine!;

    return Math.round(GFR * 100) / 100;
  }

  public calculateAll() {
    return {
      adult: this.calculateGFRAdult(),
      children: this.calculateGFRChildren(),
    };
  }
}

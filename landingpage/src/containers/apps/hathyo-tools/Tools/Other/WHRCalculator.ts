export class WHRCalculator {
  bustSize: number; // Kích thước ngực (cm)
  waistSize: number; // Kích thước eo (cm)
  highHipSize: number; // Kích thước hông trên (cm)
  hipSize: number; // Kích thước hông (cm)

  constructor(
    bustSize: number = 0,
    waistSize: number = 0,
    highHipSize: number = 0,
    hipSize: number = 0
  ) {
    this.bustSize = bustSize;
    this.waistSize = waistSize;
    this.highHipSize = highHipSize;
    this.hipSize = hipSize;
  }

  // Tính WHR (Waist-to-Hip Ratio)
  public calculateWHR(): number {
    return Math.round((this.waistSize / this.hipSize) * 100) / 100;
  }

  // Tính BWR (Bust-to-Waist Ratio)
  public calculateBWR(): number {
    return Math.round((this.bustSize / this.waistSize) * 100) / 100;
  }

  // Tính HHR (High Hip-to-Hip Ratio)
  public calculateHHR(): number {
    return Math.round((this.highHipSize / this.hipSize) * 100) / 100;
  }

  public calculateCategory(): {
    whr: number;
    bwr: number;
    hhr: number;
    category: string;
  } {
    const whr = this.calculateWHR();
    const bwr = this.calculateBWR();
    const hhr = this.calculateHHR();

    let category = "Banana";

    if (whr >= 0.9 && bwr <= 1.2) {
      category = "Apple";
    } else if (whr < 0.8 && bwr >= 1.5) {
      category = "Hourglass";
    } else if (whr < 0.8 && hhr < 1.0) {
      category = "Pear";
    }

    return { whr, bwr, hhr, category };
  }

  public calculateAll() {
    return {
      whr: this.calculateWHR(),
      bwr: this.calculateBWR(),
      hhr: this.calculateHHR(),
      category: this.calculateCategory(),
    };
  }
}

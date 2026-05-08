export class BMICalculator {
  private weight: number;
  private height: number;

  constructor(weight: number, height: number) {
    this.weight = weight;
    this.height = height;
  }

  public calculateBMIFormula(): number {
    return (
      Math.round((this.weight / Math.pow(this.height / 100, 2)) * 100) / 100
    );
  }

  public calculateBMIPrime(): number {
    const bmi = this.calculateBMIFormula();
    return Math.round((bmi / 25) * 100) / 100;
  }

  public calculatePonderalIndex(): number {
    return (
      Math.round((this.weight / Math.pow(this.height / 100, 3)) * 100) / 100
    );
  }

  public getCategory(): string {
    const bmi = this.calculateBMIFormula();

    if (bmi < 16) return "Gầy độ III";
    if (bmi >= 16 && bmi < 17) return "Gầy độ II";
    if (bmi >= 17 && bmi < 18.5) return "Gầy độ I";
    if (bmi >= 18.5 && bmi < 25) return "Bình thường";
    if (bmi >= 25 && bmi < 30) return "Thừa cân";
    if (bmi >= 30 && bmi < 35) return "Béo phì độ I";
    if (bmi >= 35 && bmi < 40) return "Béo phì độ II";
    return "Béo phì độ III";
  }

  public calculateAll() {
    return {
      bmi: this.calculateBMIFormula(),
      bmi_category: this.getCategory(),
      pi: this.calculatePonderalIndex(),
      bmi_prime: this.calculateBMIPrime(),
    };
  }
}

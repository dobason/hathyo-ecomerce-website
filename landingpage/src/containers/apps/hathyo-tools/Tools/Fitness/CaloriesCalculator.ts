export class CaloriesCalculator {
  private tdee: number;

  constructor(tdee: number) {
    this.tdee = tdee;
  }

  public calculate() {
    const maintainCalories = Math.round(this.tdee);
    const mildLossCalories = Math.round(this.tdee - 250);
    const moderateLossCalories = Math.round(this.tdee - 500);
    const extremeLossCalories = Math.round(this.tdee - 1000);

    return {
      "Maintain weight": {
        calories: maintainCalories,
        percentage: "100%",
      },
      "Mild weight loss (0.25 kg/week)": {
        calories: mildLossCalories,
        percentage: `${((mildLossCalories / maintainCalories) * 100).toFixed(
          2
        )}%`,
      },
      "Weight loss (0.5 kg/week)": {
        calories: moderateLossCalories,
        percentage: `${(
          (moderateLossCalories / maintainCalories) *
          100
        ).toFixed(2)}%`,
      },
      "Extreme weight loss (1 kg/week)": {
        calories: extremeLossCalories,
        percentage: `${((extremeLossCalories / maintainCalories) * 100).toFixed(
          2
        )}%`,
      },
    };
  }
}

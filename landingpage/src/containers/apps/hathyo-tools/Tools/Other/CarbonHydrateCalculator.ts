import { TDEECalculator } from "../Fitness/TDEECalculator";

export class CarbonHydrateCalculator {
  private tdeeCalculator: TDEECalculator;

  constructor(tdeeCalculator: TDEECalculator) {
    this.tdeeCalculator = tdeeCalculator;
  }

  private _calculateCarbonHydrate(calorieAdjustment: number = 0) {
    const carbPercentages = [40, 55, 65, 75];
    const tdee = this.tdeeCalculator.calculate();
    const dailyCalories = tdee + calorieAdjustment;

    const carbohydrates = carbPercentages.reduce((acc, percentage) => {
      const carbGrams = (dailyCalories * (percentage / 100)) / 4;
      acc[`${percentage}%`] = Math.round(carbGrams);
      return acc;
    }, {} as Record<string, number>);

    return {
      dailyCalories: Math.round(dailyCalories),
      carbohydrates,
    };
  }

  public calculateForWeightMaintenance() {
    return this._calculateCarbonHydrate();
  }

  public calculateForLoss0_5KgPerWeek() {
    return this._calculateCarbonHydrate(-500);
  }

  public calculateForLoss1KgPerWeek() {
    return this._calculateCarbonHydrate(-1000);
  }

  public calculateForGain0_5KgPerWeek() {
    return this._calculateCarbonHydrate(500);
  }

  public calculateForGain1KgPerWeek() {
    return this._calculateCarbonHydrate(1000);
  }

  public calculateAll() {
    return {
      weight_maintenance: this.calculateForWeightMaintenance(),
      loss_0_5kg_per_week: this.calculateForLoss0_5KgPerWeek(),
      loss_1kg_per_week: this.calculateForLoss1KgPerWeek(),
      gain_0_5kg_per_week: this.calculateForGain0_5KgPerWeek(),
      gain_1kg_per_week: this.calculateForGain1KgPerWeek(),
    };
  }
}

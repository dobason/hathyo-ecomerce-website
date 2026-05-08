import { TDEECalculator } from "../Fitness/TDEECalculator";

type Goal =
  | "Weight Maintenance"
  | "Lose 0.5 kg/week"
  | "Lose 1 kg/week"
  | "Gain 0.5 kg/week"
  | "Gain 1 kg/week";

export class FatIntakeCalculator {
  private tdeeCalculator: TDEECalculator;

  constructor(tdeeCalculator: TDEECalculator) {
    this.tdeeCalculator = tdeeCalculator;
  }

  public calculate() {
    const tdee = this.tdeeCalculator.calculate();

    const goals: { goal: Goal; calorieAdjustment: number }[] = [
      { goal: "Weight Maintenance", calorieAdjustment: 0 },
      { goal: "Lose 0.5 kg/week", calorieAdjustment: -500 },
      { goal: "Lose 1 kg/week", calorieAdjustment: -1000 },
      { goal: "Gain 0.5 kg/week", calorieAdjustment: 500 },
      { goal: "Gain 1 kg/week", calorieAdjustment: 1000 },
    ];

    return goals.map(({ goal, calorieAdjustment }) => {
      const dailyCalories = tdee + calorieAdjustment;

      const fatCalories = {
        min: dailyCalories * 0.2,
        max: dailyCalories * 0.35,
      };

      const dailyFat = {
        min: fatCalories.min / 9,
        max: fatCalories.max / 9,
      };

      // Saturated Fat Allowance
      const saturatedFat = {
        max10: (dailyCalories * 0.1) / 9,
        max7: (dailyCalories * 0.07) / 9,
      };

      return {
        goal,
        dailyCalories: Math.round(dailyCalories),
        dailyFat: {
          min: Math.round(dailyFat.min),
          max: Math.round(dailyFat.max),
        },
        saturatedFat: {
          max10: Math.round(saturatedFat.max10),
          max7: Math.round(saturatedFat.max7),
        },
      };
    });
  }
}

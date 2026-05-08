import { TDEECalculator } from "../Fitness/TDEECalculator";
import { MacroGoal } from "@/types/health-tools";

export class MacroCalculator {
  private goal: MacroGoal;
  private tdeeCalculator: TDEECalculator;

  constructor(
    goal: MacroGoal = "maintain weight",
    tdeeCalculator: TDEECalculator
  ) {
    this.goal = goal;
    this.tdeeCalculator = tdeeCalculator;
  }

  private _adjustedCalories() {
    const tdee = this.tdeeCalculator.calculate();
    let calories: number;

    switch (this.goal) {
      case "maintain weight":
        calories = tdee;
        break;
      case "mild weight loss (0.25kg/week)":
        calories = tdee - 250;
        break;
      case "weight loss (0.5kg/week)":
        calories = tdee - 500;
        break;
      case "extreme weight loss (1kg/week)":
        calories = tdee - 1000;
        break;
      case "mild weight gain (0.25kg/week)":
        calories = tdee + 250;
        break;
      case "weight gain (0.5kg/week)":
        calories = tdee + 500;
        break;
      case "extreme weight gain (1kg/week)":
        calories = tdee + 1000;
        break;
      default:
        calories = 0;
    }

    return calories;
  }

  private _calculateMacros(
    calories: number,
    fatRatio: number,
    carbRatio: number,
    proteinRatio: number
  ) {
    const carbs = (calories * (carbRatio / 100)) / 4;
    const protein = (calories * (proteinRatio / 100)) / 4;
    const fat = (calories * (fatRatio / 100)) / 9;

    // Tính Sugar và Saturated Fat
    const sugar = carbs * 0.15; // 15% của Carbs
    const saturatedFat = fat * 0.35; // 35% của Fat

    return {
      carbs: Math.round(carbs),
      protein: Math.round(protein),
      fat: Math.round(fat),
      sugar: Math.round(sugar),
      saturatedFat: Math.round(saturatedFat),
      foodEnergy: Math.round(calories * 4.184),
    };
  }

  public calculateMacrosWithGoal() {
    const calories = this._adjustedCalories();

    const macroRatios: Record<
      MacroGoal,
      { carbs: number; protein: number; fat: number }
    > = {
      "maintain weight": { carbs: 50, protein: 25, fat: 25 },
      "mild weight loss (0.25kg/week)": { carbs: 45, protein: 30, fat: 25 },
      "weight loss (0.5kg/week)": { carbs: 40, protein: 30, fat: 30 },
      "extreme weight loss (1kg/week)": { carbs: 35, protein: 40, fat: 25 },
      "mild weight gain (0.25kg/week)": { carbs: 50, protein: 25, fat: 25 },
      "weight gain (0.5kg/week)": { carbs: 55, protein: 20, fat: 25 },
      "extreme weight gain (1kg/week)": { carbs: 60, protein: 20, fat: 20 },
    };

    const {
      carbs: carbRatio,
      protein: proteinRatio,
      fat: fatRatio,
    } = macroRatios[this.goal];

    const carbs = (calories * (carbRatio / 100)) / 4;
    const protein = (calories * (proteinRatio / 100)) / 4;
    const fat = (calories * (fatRatio / 100)) / 9;

    const sugar = carbs * 0.15;
    const saturatedFat = fat * 0.35;

    return {
      carbs: Math.round(carbs),
      protein: Math.round(protein),
      fat: Math.round(fat),
      sugar: Math.round(sugar),
      saturatedFat: Math.round(saturatedFat),
      foodEnergy: Math.round(calories * 4.184),
    };
  }

  public calculateMacrosDietLowFat() {
    const calories = this._adjustedCalories();
    return this._calculateMacros(calories, 15, 55, 30);
  }

  public calculateMacrosDietLowCarbs() {
    const calories = this._adjustedCalories();
    return this._calculateMacros(calories, 40, 20, 40);
  }

  public calculateMacrosDietHighProtein() {
    const calories = this._adjustedCalories();
    return this._calculateMacros(calories, 30, 30, 40);
  }

  public calculateAll() {
    return {
      with_goal: this.calculateMacrosWithGoal(),
      low_fat: this.calculateMacrosDietLowFat(),
      low_carbs: this.calculateMacrosDietLowCarbs(),
      high_protein: this.calculateMacrosDietHighProtein(),
    };
  }
}

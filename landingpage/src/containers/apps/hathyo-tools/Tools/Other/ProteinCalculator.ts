import { ActivityLevelText } from "@/types/health-tools";

export class ProteinCalculator {
  private weight: number;
  private activityLevel: ActivityLevelText;

  constructor(weight: number, activityLevel: ActivityLevelText = "sedentary") {
    this.weight = weight;
    this.activityLevel = activityLevel;
  }

  public calculate() {
    const proteinFactors: Record<string, [number, number]> = {
      sedentary: [0.8, 1.0],
      light: [1.0, 1.2],
      moderate: [1.2, 1.6],
      active: [1.6, 2.0],
      "very active": [2.0, 2.2],
      "muscle gain": [2.0, 2.2],
      "weight loss": [1.8, 2.4],
    };

    const [minFactor, maxFactor] = proteinFactors[this.activityLevel];

    const proteinMin = this.weight * minFactor;
    const proteinMax = this.weight * maxFactor;

    // Tính calo từ protein
    const proteinCalories = {
      min: proteinMin * 4, // 1g protein = 4 cal
      max: proteinMax * 4,
    };

    return {
      proteinMin: Math.round(proteinMin),
      proteinMax: Math.round(proteinMax),
      proteinCalories: {
        min: Math.round(proteinCalories.min),
        max: Math.round(proteinCalories.max),
      },
    };
  }
}

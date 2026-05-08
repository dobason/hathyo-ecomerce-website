import { RepeatedInRepMax } from "@/types/health-tools";

export class RMCalculator {
  private weight: number;
  private reps: RepeatedInRepMax;

  constructor(weight: number, reps: RepeatedInRepMax) {
    this.weight = weight;
    this.reps = reps;
  }

  public calculateEpleyFormula(): number {
    return Math.round(this.weight * (1 + 30 / this.reps) * 100) / 100;
  }

  public calculateBrzyckiFormula(): number {
    return Math.round(this.weight * (36 / (37 - this.reps)) * 100) / 100;
  }

  public calculateMcGlothinFormula(): number {
    return Math.round(this.weight * Math.pow(this.reps, 0.1) * 100) / 100;
  }

  public calculateAll() {
    return {
      epley: this.calculateEpleyFormula(),
      brzycki: this.calculateEpleyFormula(),
      lombardi: this.calculateMcGlothinFormula(),
    };
  }
}

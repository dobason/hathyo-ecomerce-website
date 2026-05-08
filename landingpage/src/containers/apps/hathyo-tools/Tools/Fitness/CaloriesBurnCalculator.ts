import { MET } from "@/types/health-tools";

export class CaloriesBurnCalculator {
  private met: MET;
  private duration: number;
  private weight: number;

  constructor(met: MET, duration: number, weight: number) {
    this.met = met;
    this.weight = weight;
    this.duration = duration;
  }

  public calculate() {
    return (
      Math.round(((this.met * this.weight * this.duration) / 200) * 100) / 100
    );
  }
}

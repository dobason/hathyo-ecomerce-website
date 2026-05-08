export class HealthyWeightCalculator {
  private height: number;

  constructor(height: number) {
    this.height = height;
  }

  public calculate() {
    const heightInMeters = this.height / 100;

    const minWeight = 18.5 * heightInMeters ** 2;
    const maxWeight = 24.9 * heightInMeters ** 2;

    return {
      minWeight: Math.round(minWeight * 100) / 100,
      maxWeight: Math.round(maxWeight * 100) / 100,
    };
  }
}

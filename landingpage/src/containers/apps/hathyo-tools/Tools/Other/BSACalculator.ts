export class BSACalculator {
  height: number; // Chiều cao (cm)
  weight: number; // Cân nặng (kg)

  constructor(height: number, weight: number) {
    this.height = height;
    this.weight = weight;
  }

  // Mosteller Formula
  public calculateMosteller(): number {
    return (
      Math.round(
        0.016667 * Math.pow(this.height, 0.5) * Math.pow(this.weight, 0.5) * 100
      ) / 100
    );
  }

  // Du Bois Formula
  public calculateDuBois(): number {
    return (
      Math.round(
        0.007184 *
          Math.pow(this.height, 0.725) *
          Math.pow(this.weight, 0.425) *
          100
      ) / 100
    );
  }

  // Haycock Formula
  public calculateHaycock(): number {
    return (
      Math.round(
        0.024265 *
          Math.pow(this.height, 0.3964) *
          Math.pow(this.weight, 0.5378) *
          100
      ) / 100
    );
  }

  // Gehan & George Formula
  public calculateGehanGeorge(): number {
    return (
      Math.round(
        0.0235 *
          Math.pow(this.height, 0.42246) *
          Math.pow(this.weight, 0.51456) *
          100
      ) / 100
    );
  }

  // Boyd Formula
  public calculateBoyd(): number {
    const logWeight = Math.log10(this.weight);
    return (
      Math.round(
        0.0333 *
          Math.pow(this.weight, 0.6157 - 0.0188 * logWeight) *
          Math.pow(this.height, 0.3) *
          100
      ) / 100
    );
  }

  // Fujimoto Formula
  public calculateFujimoto(): number {
    return (
      Math.round(
        0.008883 *
          Math.pow(this.height, 0.663) *
          Math.pow(this.weight, 0.444) *
          100
      ) / 100
    );
  }

  // Takahira Formula
  public calculateTakahira(): number {
    return (
      Math.round(
        0.007241 *
          Math.pow(this.height, 0.725) *
          Math.pow(this.weight, 0.425) *
          100
      ) / 100
    );
  }

  public calculateAll(): Record<string, number> {
    return {
      Mosteller: this.calculateMosteller(),
      Du_Bois: this.calculateDuBois(),
      Haycock: this.calculateHaycock(),
      Gehan_George: this.calculateGehanGeorge(),
      Boyd: this.calculateBoyd(),
      Fujimoto: this.calculateFujimoto(),
      Takahira: this.calculateTakahira(),
    };
  }
}

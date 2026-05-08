import { Gender, DrinkSize, Drink } from "@/types/health-tools";

export class BACCalculator {
  drinks: Drink[];
  gender: Gender;
  weight: number;
  timeSinceFirstDrink: number;

  constructor(
    drinks: Drink[],
    gender: Gender,
    weight: number,
    timeSinceFirstDrink: number
  ) {
    this.drinks = drinks;
    this.gender = gender;
    this.weight = weight;
    this.timeSinceFirstDrink = timeSinceFirstDrink;
  }

  private _convertSizeToMl(size: DrinkSize): number {
    const sizeMap: Record<DrinkSize, number> = {
      "250ml bottle": 250,
      "12oz/330ml bottle": 330,
      "16oz/500ml bottle": 500,
      "250ml bar cup": 250,
      "12oz/330ml bar cup (small)": 330,
      "16oz/500ml bar cup": 500,
      "20oz/600ml bar cup (tall)": 600,
      "12oz/330ml can": 330,
      "16oz/500ml can": 500,
      "20oz/600ml can": 600,
      "1 liter": 1000,
    };
    return sizeMap[size];
  }

  private _calculateTotalAlcohol(drinks: Drink[]): Record<string, number> {
    const alcoholByType: Record<string, number> = {};

    drinks.forEach((drink) => {
      const drinkSizeMl = this._convertSizeToMl(drink.size);
      const alcoholConsumed =
        drink.amount * drinkSizeMl * (drink.abv / 100) * 0.789;

      // Tổng hợp theo loại đồ uống
      if (alcoholByType[drink.type]) {
        alcoholByType[drink.type] += alcoholConsumed;
      } else {
        alcoholByType[drink.type] = alcoholConsumed;
      }
    });

    return alcoholByType;
  }

  public calculate(): { bac: number; details: Record<string, number> } {
    const alcoholByType = this._calculateTotalAlcohol(this.drinks);

    // Tổng lượng cồn tiêu thụ (g)
    const totalAlcohol = Object.values(alcoholByType).reduce(
      (sum, value) => sum + value,
      0
    );

    // Trọng lượng cơ thể (g)
    const bodyWeight = this.weight * 1000;

    // Widmark Factor
    const widmarkFactor = this.gender === "male" ? 0.68 : 0.55;

    // Elimination Rate
    const eliminationRate = this.gender === "male" ? 0.015 : 0.017;

    // Tính BAC
    const bac =
      totalAlcohol / (bodyWeight * widmarkFactor) -
      eliminationRate * this.timeSinceFirstDrink;

    return {
      bac: Math.max(Math.round(bac * 10000) / 10000, 0),
      details: alcoholByType,
    };
  }
}

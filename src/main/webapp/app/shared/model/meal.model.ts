export interface IMeal {
  id?: number;
  mealName?: string;
  mealDesc?: string;
}

export class Meal implements IMeal {
  constructor(public id?: number, public mealName?: string, public mealDesc?: string) {}
}

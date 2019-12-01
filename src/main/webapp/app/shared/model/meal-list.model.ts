import { IRecipe } from 'app/shared/model/recipe.model';
import { IMeal } from 'app/shared/model/meal.model';

export interface IMealList {
  id?: number;
  recipe?: IRecipe;
  meal?: IMeal;
}

export class MealList implements IMealList {
  constructor(public id?: number, public recipe?: IRecipe, public meal?: IMeal) {}
}

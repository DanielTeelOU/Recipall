import { IRecipe } from 'app/shared/model/recipe.model';
import { IIngredient } from 'app/shared/model/ingredient.model';

export interface IIngredientList {
  id?: number;
  amount?: number;
  unit?: string;
  recipe?: IRecipe;
  ingredient?: IIngredient;
}

export class IngredientList implements IIngredientList {
  constructor(public id?: number, public amount?: number, public unit?: string, public recipe?: IRecipe, public ingredient?: IIngredient) {}
}

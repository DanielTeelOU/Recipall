import { IUser } from 'app/core/user/user.model';
import { IRecipe } from 'app/shared/model/recipe.model';

export interface IRecipeList {
  id?: number;
  user?: IUser;
  recipe?: IRecipe;
}

export class RecipeList implements IRecipeList {
  constructor(public id?: number, public user?: IUser, public recipe?: IRecipe) {}
}

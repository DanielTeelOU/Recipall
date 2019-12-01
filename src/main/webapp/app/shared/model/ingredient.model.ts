import { IIngredient } from 'app/shared/model/ingredient.model';

export interface IIngredient {
  id?: number;
  name?: string;
  imageURL?: string;
  ingredients?: IIngredient[];
  ingredient?: IIngredient;
}

export class Ingredient implements IIngredient {
  constructor(
    public id?: number,
    public name?: string,
    public imageURL?: string,
    public ingredients?: IIngredient[],
    public ingredient?: IIngredient
  ) {}
}

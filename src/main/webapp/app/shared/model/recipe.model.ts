import { Moment } from 'moment';

export interface IRecipe {
  id?: number;
  time?: number;
  difficulty?: number;
  rating?: number;
  steps?: string;
  creationDate?: Moment;
  description?: string;
  name?: string;
  score?: number;
}

export class Recipe implements IRecipe {
  constructor(
    public id?: number,
    public time?: number,
    public difficulty?: number,
    public rating?: number,
    public steps?: string,
    public creationDate?: Moment,
    public description?: string,
    public name?: string,
    public score?: number
  ) {}
}

import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IRecipe } from 'app/shared/model/recipe.model';

export interface IComment {
  id?: number;
  commentInfo?: string;
  date?: Moment;
  score?: number;
  user?: IUser;
  recipe?: IRecipe;
}

export class Comment implements IComment {
  constructor(
    public id?: number,
    public commentInfo?: string,
    public date?: Moment,
    public score?: number,
    public user?: IUser,
    public recipe?: IRecipe
  ) {}
}

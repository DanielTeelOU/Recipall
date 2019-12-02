import { IUser } from 'app/core/user/user.model';

export interface IMeal {
  id?: number;
  mealName?: string;
  mealDesc?: string;
  user?: IUser;
}

export class Meal implements IMeal {
  constructor(public id?: number, public mealName?: string, public mealDesc?: string, public user?: IUser) {}
}

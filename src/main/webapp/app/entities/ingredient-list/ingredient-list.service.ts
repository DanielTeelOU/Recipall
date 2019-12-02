import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IIngredientList } from 'app/shared/model/ingredient-list.model';

type EntityResponseType = HttpResponse<IIngredientList>;
type EntityArrayResponseType = HttpResponse<IIngredientList[]>;

@Injectable({ providedIn: 'root' })
export class IngredientListService {
  public resourceUrl = SERVER_API_URL + 'api/ingredient-lists';
  public resourceByRecipeUrl = SERVER_API_URL + 'api/ingredient-lists/byrecipe';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/ingredient-lists';

  constructor(protected http: HttpClient) {}

  create(ingredientList: IIngredientList): Observable<EntityResponseType> {
    return this.http.post<IIngredientList>(this.resourceUrl, ingredientList, { observe: 'response' });
  }

  update(ingredientList: IIngredientList): Observable<EntityResponseType> {
    return this.http.put<IIngredientList>(this.resourceUrl, ingredientList, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IIngredientList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIngredientList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryByRecipe(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IIngredientList[]>(`${this.resourceByRecipeUrl}/${id}`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIngredientList[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}

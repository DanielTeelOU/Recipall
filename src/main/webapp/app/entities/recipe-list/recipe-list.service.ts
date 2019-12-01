import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRecipeList } from 'app/shared/model/recipe-list.model';

type EntityResponseType = HttpResponse<IRecipeList>;
type EntityArrayResponseType = HttpResponse<IRecipeList[]>;

@Injectable({ providedIn: 'root' })
export class RecipeListService {
  public resourceUrl = SERVER_API_URL + 'api/recipe-lists';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/recipe-lists';

  constructor(protected http: HttpClient) {}

  create(recipeList: IRecipeList): Observable<EntityResponseType> {
    return this.http.post<IRecipeList>(this.resourceUrl, recipeList, { observe: 'response' });
  }

  update(recipeList: IRecipeList): Observable<EntityResponseType> {
    return this.http.put<IRecipeList>(this.resourceUrl, recipeList, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRecipeList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRecipeList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRecipeList[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}

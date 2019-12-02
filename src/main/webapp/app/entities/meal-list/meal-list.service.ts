import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMealList } from 'app/shared/model/meal-list.model';

type EntityResponseType = HttpResponse<IMealList>;
type EntityArrayResponseType = HttpResponse<IMealList[]>;

@Injectable({ providedIn: 'root' })
export class MealListService {
  public resourceUrl = SERVER_API_URL + 'api/meal-lists';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/meal-lists';

  constructor(protected http: HttpClient) {}

  create(mealList: IMealList): Observable<EntityResponseType> {
    return this.http.post<IMealList>(this.resourceUrl, mealList, { observe: 'response' });
  }

  update(mealList: IMealList): Observable<EntityResponseType> {
    return this.http.put<IMealList>(this.resourceUrl, mealList, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMealList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMealList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMealList[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IngredientList } from 'app/shared/model/ingredient-list.model';
import { IngredientListService } from './ingredient-list.service';
import { IngredientListComponent } from './ingredient-list.component';
import { IngredientListDetailComponent } from './ingredient-list-detail.component';
import { IngredientListUpdateComponent } from './ingredient-list-update.component';
import { IIngredientList } from 'app/shared/model/ingredient-list.model';

@Injectable({ providedIn: 'root' })
export class IngredientListResolve implements Resolve<IIngredientList> {
  constructor(private service: IngredientListService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIngredientList> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((ingredientList: HttpResponse<IngredientList>) => ingredientList.body));
    }
    return of(new IngredientList());
  }
}

export const ingredientListRoute: Routes = [
  {
    path: '',
    component: IngredientListComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'IngredientLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: IngredientListDetailComponent,
    resolve: {
      ingredientList: IngredientListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'IngredientLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: IngredientListUpdateComponent,
    resolve: {
      ingredientList: IngredientListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'IngredientLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: IngredientListUpdateComponent,
    resolve: {
      ingredientList: IngredientListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'IngredientLists'
    },
    canActivate: [UserRouteAccessService]
  }
];

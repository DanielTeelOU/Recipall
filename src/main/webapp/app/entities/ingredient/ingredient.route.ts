import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from 'app/shared/model/ingredient.model';
import { IngredientService } from './ingredient.service';
import { IngredientComponent } from './ingredient.component';
import { IngredientDetailComponent } from './ingredient-detail.component';
import { IngredientUpdateComponent } from './ingredient-update.component';
import { IIngredient } from 'app/shared/model/ingredient.model';

@Injectable({ providedIn: 'root' })
export class IngredientResolve implements Resolve<IIngredient> {
  constructor(private service: IngredientService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIngredient> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((ingredient: HttpResponse<Ingredient>) => ingredient.body));
    }
    return of(new Ingredient());
  }
}

export const ingredientRoute: Routes = [
  {
    path: '',
    component: IngredientComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ingredients'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: IngredientDetailComponent,
    resolve: {
      ingredient: IngredientResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ingredients'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: IngredientUpdateComponent,
    resolve: {
      ingredient: IngredientResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ingredients'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: IngredientUpdateComponent,
    resolve: {
      ingredient: IngredientResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Ingredients'
    },
    canActivate: [UserRouteAccessService]
  }
];

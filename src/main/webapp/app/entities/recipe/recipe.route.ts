import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Recipe } from 'app/shared/model/recipe.model';
import { RecipeService } from './recipe.service';
import { RecipeComponent } from './recipe.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeUpdateComponent } from './recipe-update.component';
import { RecipeDeletePopupComponent } from './recipe-delete-dialog.component';
import { IRecipe } from 'app/shared/model/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeResolve implements Resolve<IRecipe> {
  constructor(private service: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecipe> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Recipe>) => response.ok),
        map((recipe: HttpResponse<Recipe>) => recipe.body)
      );
    }
    return of(new Recipe());
  }
}

export const recipeRoute: Routes = [
  {
    path: '',
    component: RecipeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Recipes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RecipeDetailComponent,
    resolve: {
      recipe: RecipeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Recipes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RecipeUpdateComponent,
    resolve: {
      recipe: RecipeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Recipes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RecipeUpdateComponent,
    resolve: {
      recipe: RecipeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Recipes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const recipePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RecipeDeletePopupComponent,
    resolve: {
      recipe: RecipeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Recipes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];

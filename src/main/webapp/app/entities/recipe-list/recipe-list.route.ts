import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecipeList } from 'app/shared/model/recipe-list.model';
import { RecipeListService } from './recipe-list.service';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeListDetailComponent } from './recipe-list-detail.component';
import { RecipeListUpdateComponent } from './recipe-list-update.component';
import { IRecipeList } from 'app/shared/model/recipe-list.model';

@Injectable({ providedIn: 'root' })
export class RecipeListResolve implements Resolve<IRecipeList> {
  constructor(private service: RecipeListService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRecipeList> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((recipeList: HttpResponse<RecipeList>) => recipeList.body));
    }
    return of(new RecipeList());
  }
}

export const recipeListRoute: Routes = [
  {
    path: '',
    component: RecipeListComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RecipeLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RecipeListDetailComponent,
    resolve: {
      recipeList: RecipeListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RecipeLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RecipeListUpdateComponent,
    resolve: {
      recipeList: RecipeListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RecipeLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RecipeListUpdateComponent,
    resolve: {
      recipeList: RecipeListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'RecipeLists'
    },
    canActivate: [UserRouteAccessService]
  }
];

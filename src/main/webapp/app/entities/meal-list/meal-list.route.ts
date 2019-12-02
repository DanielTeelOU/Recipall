import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MealList } from 'app/shared/model/meal-list.model';
import { MealListService } from './meal-list.service';
import { MealListComponent } from './meal-list.component';
import { MealListDetailComponent } from './meal-list-detail.component';
import { MealListUpdateComponent } from './meal-list-update.component';
import { IMealList } from 'app/shared/model/meal-list.model';

@Injectable({ providedIn: 'root' })
export class MealListResolve implements Resolve<IMealList> {
  constructor(private service: MealListService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMealList> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((mealList: HttpResponse<MealList>) => mealList.body));
    }
    return of(new MealList());
  }
}

export const mealListRoute: Routes = [
  {
    path: '',
    component: MealListComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MealLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MealListDetailComponent,
    resolve: {
      mealList: MealListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MealLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MealListUpdateComponent,
    resolve: {
      mealList: MealListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MealLists'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MealListUpdateComponent,
    resolve: {
      mealList: MealListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MealLists'
    },
    canActivate: [UserRouteAccessService]
  }
];

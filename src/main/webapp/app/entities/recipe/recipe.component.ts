import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IRecipe } from 'app/shared/model/recipe.model';
import { AccountService } from 'app/core/auth/account.service';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'jhi-recipe',
  templateUrl: './recipe.component.html'
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipes: IRecipe[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected recipeService: RecipeService,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.recipeService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IRecipe[]>) => res.ok),
          map((res: HttpResponse<IRecipe[]>) => res.body)
        )
        .subscribe((res: IRecipe[]) => (this.recipes = res));
      return;
    }
    this.recipeService
      .query()
      .pipe(
        filter((res: HttpResponse<IRecipe[]>) => res.ok),
        map((res: HttpResponse<IRecipe[]>) => res.body)
      )
      .subscribe((res: IRecipe[]) => {
        this.recipes = res;
        this.currentSearch = '';
      });
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRecipes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRecipe) {
    return item.id;
  }

  registerChangeInRecipes() {
    this.eventSubscriber = this.eventManager.subscribe('recipeListModification', response => this.loadAll());
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRecipeList } from 'app/shared/model/recipe-list.model';
import { RecipeListService } from './recipe-list.service';
import { RecipeListDeleteDialogComponent } from './recipe-list-delete-dialog.component';

@Component({
  selector: 'jhi-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeLists: IRecipeList[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected recipeListService: RecipeListService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.recipeListService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IRecipeList[]>) => (this.recipeLists = res.body));
      return;
    }
    this.recipeListService.query().subscribe((res: HttpResponse<IRecipeList[]>) => {
      this.recipeLists = res.body;
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
    this.registerChangeInRecipeLists();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRecipeList) {
    return item.id;
  }

  registerChangeInRecipeLists() {
    this.eventSubscriber = this.eventManager.subscribe('recipeListListModification', () => this.loadAll());
  }

  delete(recipeList: IRecipeList) {
    const modalRef = this.modalService.open(RecipeListDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.recipeList = recipeList;
  }
}

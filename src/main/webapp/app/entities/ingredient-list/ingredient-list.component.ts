import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IIngredientList } from 'app/shared/model/ingredient-list.model';
import { IngredientListService } from './ingredient-list.service';
import { IngredientListDeleteDialogComponent } from './ingredient-list-delete-dialog.component';

@Component({
  selector: 'jhi-ingredient-list',
  templateUrl: './ingredient-list.component.html'
})
export class IngredientListComponent implements OnInit, OnDestroy {
  ingredientLists: IIngredientList[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected ingredientListService: IngredientListService,
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
      this.ingredientListService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IIngredientList[]>) => (this.ingredientLists = res.body));
      return;
    }
    this.ingredientListService.query().subscribe((res: HttpResponse<IIngredientList[]>) => {
      this.ingredientLists = res.body;
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
    this.registerChangeInIngredientLists();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IIngredientList) {
    return item.id;
  }

  registerChangeInIngredientLists() {
    this.eventSubscriber = this.eventManager.subscribe('ingredientListListModification', () => this.loadAll());
  }

  delete(ingredientList: IIngredientList) {
    const modalRef = this.modalService.open(IngredientListDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ingredientList = ingredientList;
  }
}

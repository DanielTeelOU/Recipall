import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMealList } from 'app/shared/model/meal-list.model';
import { MealListService } from './meal-list.service';
import { MealListDeleteDialogComponent } from './meal-list-delete-dialog.component';

@Component({
  selector: 'jhi-meal-list',
  templateUrl: './meal-list.component.html'
})
export class MealListComponent implements OnInit, OnDestroy {
  mealLists: IMealList[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected mealListService: MealListService,
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
      this.mealListService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IMealList[]>) => (this.mealLists = res.body));
      return;
    }
    this.mealListService.query().subscribe((res: HttpResponse<IMealList[]>) => {
      this.mealLists = res.body;
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
    this.registerChangeInMealLists();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMealList) {
    return item.id;
  }

  registerChangeInMealLists() {
    this.eventSubscriber = this.eventManager.subscribe('mealListListModification', () => this.loadAll());
  }

  delete(mealList: IMealList) {
    const modalRef = this.modalService.open(MealListDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mealList = mealList;
  }
}

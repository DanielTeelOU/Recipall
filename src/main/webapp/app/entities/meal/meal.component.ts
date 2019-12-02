import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMeal } from 'app/shared/model/meal.model';
import { MealService } from './meal.service';
import { MealDeleteDialogComponent } from './meal-delete-dialog.component';

@Component({
  selector: 'jhi-meal',
  templateUrl: './meal.component.html'
})
export class MealComponent implements OnInit, OnDestroy {
  meals: IMeal[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected mealService: MealService,
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
      this.mealService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IMeal[]>) => (this.meals = res.body));
      return;
    }
    this.mealService.query().subscribe((res: HttpResponse<IMeal[]>) => {
      this.meals = res.body;
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
    this.registerChangeInMeals();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMeal) {
    return item.id;
  }

  registerChangeInMeals() {
    this.eventSubscriber = this.eventManager.subscribe('mealListModification', () => this.loadAll());
  }

  delete(meal: IMeal) {
    const modalRef = this.modalService.open(MealDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.meal = meal;
  }
}

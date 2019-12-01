import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IIngredient } from 'app/shared/model/ingredient.model';
import { IngredientService } from './ingredient.service';
import { IngredientDeleteDialogComponent } from './ingredient-delete-dialog.component';

@Component({
  selector: 'jhi-ingredient',
  templateUrl: './ingredient.component.html'
})
export class IngredientComponent implements OnInit, OnDestroy {
  ingredients: IIngredient[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected ingredientService: IngredientService,
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
      this.ingredientService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IIngredient[]>) => (this.ingredients = res.body));
      return;
    }
    this.ingredientService.query().subscribe((res: HttpResponse<IIngredient[]>) => {
      this.ingredients = res.body;
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
    this.registerChangeInIngredients();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IIngredient) {
    return item.id;
  }

  registerChangeInIngredients() {
    this.eventSubscriber = this.eventManager.subscribe('ingredientListModification', () => this.loadAll());
  }

  delete(ingredient: IIngredient) {
    const modalRef = this.modalService.open(IngredientDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ingredient = ingredient;
  }
}

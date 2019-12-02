import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealList } from 'app/shared/model/meal-list.model';

@Component({
  selector: 'jhi-meal-list-detail',
  templateUrl: './meal-list-detail.component.html'
})
export class MealListDetailComponent implements OnInit {
  mealList: IMealList;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mealList }) => {
      this.mealList = mealList;
    });
  }

  previousState() {
    window.history.back();
  }
}

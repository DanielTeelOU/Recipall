import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIngredientList } from 'app/shared/model/ingredient-list.model';

@Component({
  selector: 'jhi-ingredient-list-detail',
  templateUrl: './ingredient-list-detail.component.html'
})
export class IngredientListDetailComponent implements OnInit {
  ingredientList: IIngredientList;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ingredientList }) => {
      this.ingredientList = ingredientList;
    });
  }

  previousState() {
    window.history.back();
  }
}

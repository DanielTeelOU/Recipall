import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecipeList } from 'app/shared/model/recipe-list.model';

@Component({
  selector: 'jhi-recipe-list-detail',
  templateUrl: './recipe-list-detail.component.html'
})
export class RecipeListDetailComponent implements OnInit {
  recipeList: IRecipeList;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ recipeList }) => {
      this.recipeList = recipeList;
    });
  }

  previousState() {
    window.history.back();
  }
}

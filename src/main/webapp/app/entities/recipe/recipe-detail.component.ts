import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecipe } from 'app/shared/model/recipe.model';
import { IIngredientList } from 'app/shared/model/ingredient-list.model';
import { ingredientListRoute } from 'app/entities/ingredient-list/ingredient-list.route';

@Component({
  selector: 'jhi-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
  recipe: IRecipe;
  ingredientList: IIngredientList;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ recipe, ingredientList }) => {
      this.recipe = recipe;
      this.ingredientList = ingredientList;
    });
  }

  previousState() {
    window.history.back();
  }
}

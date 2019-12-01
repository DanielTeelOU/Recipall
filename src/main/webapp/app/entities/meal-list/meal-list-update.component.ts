import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IMealList, MealList } from 'app/shared/model/meal-list.model';
import { MealListService } from './meal-list.service';
import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from 'app/entities/recipe/recipe.service';
import { IMeal } from 'app/shared/model/meal.model';
import { MealService } from 'app/entities/meal/meal.service';

@Component({
  selector: 'jhi-meal-list-update',
  templateUrl: './meal-list-update.component.html'
})
export class MealListUpdateComponent implements OnInit {
  isSaving: boolean;

  recipes: IRecipe[];

  meals: IMeal[];

  editForm = this.fb.group({
    id: [],
    recipe: [],
    meal: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mealListService: MealListService,
    protected recipeService: RecipeService,
    protected mealService: MealService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ mealList }) => {
      this.updateForm(mealList);
    });
    this.recipeService
      .query()
      .subscribe((res: HttpResponse<IRecipe[]>) => (this.recipes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.mealService
      .query()
      .subscribe((res: HttpResponse<IMeal[]>) => (this.meals = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(mealList: IMealList) {
    this.editForm.patchValue({
      id: mealList.id,
      recipe: mealList.recipe,
      meal: mealList.meal
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const mealList = this.createFromForm();
    if (mealList.id !== undefined) {
      this.subscribeToSaveResponse(this.mealListService.update(mealList));
    } else {
      this.subscribeToSaveResponse(this.mealListService.create(mealList));
    }
  }

  private createFromForm(): IMealList {
    return {
      ...new MealList(),
      id: this.editForm.get(['id']).value,
      recipe: this.editForm.get(['recipe']).value,
      meal: this.editForm.get(['meal']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMealList>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackRecipeById(index: number, item: IRecipe) {
    return item.id;
  }

  trackMealById(index: number, item: IMeal) {
    return item.id;
  }
}

import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IIngredientList, IngredientList } from 'app/shared/model/ingredient-list.model';
import { IngredientListService } from './ingredient-list.service';
import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from 'app/entities/recipe/recipe.service';
import { IIngredient } from 'app/shared/model/ingredient.model';
import { IngredientService } from 'app/entities/ingredient/ingredient.service';

@Component({
  selector: 'jhi-ingredient-list-update',
  templateUrl: './ingredient-list-update.component.html'
})
export class IngredientListUpdateComponent implements OnInit {
  isSaving: boolean;

  recipes: IRecipe[];

  ingredients: IIngredient[];

  editForm = this.fb.group({
    id: [],
    amount: [null, [Validators.required]],
    unit: [null, [Validators.required]],
    recipe: [null, Validators.required],
    ingredient: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ingredientListService: IngredientListService,
    protected recipeService: RecipeService,
    protected ingredientService: IngredientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ingredientList }) => {
      this.updateForm(ingredientList);
    });
    this.recipeService
      .query()
      .subscribe((res: HttpResponse<IRecipe[]>) => (this.recipes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.ingredientService
      .query()
      .subscribe(
        (res: HttpResponse<IIngredient[]>) => (this.ingredients = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(ingredientList: IIngredientList) {
    this.editForm.patchValue({
      id: ingredientList.id,
      amount: ingredientList.amount,
      unit: ingredientList.unit,
      recipe: ingredientList.recipe,
      ingredient: ingredientList.ingredient
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ingredientList = this.createFromForm();
    if (ingredientList.id !== undefined) {
      this.subscribeToSaveResponse(this.ingredientListService.update(ingredientList));
    } else {
      this.subscribeToSaveResponse(this.ingredientListService.create(ingredientList));
    }
  }

  private createFromForm(): IIngredientList {
    return {
      ...new IngredientList(),
      id: this.editForm.get(['id']).value,
      amount: this.editForm.get(['amount']).value,
      unit: this.editForm.get(['unit']).value,
      recipe: this.editForm.get(['recipe']).value,
      ingredient: this.editForm.get(['ingredient']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIngredientList>>) {
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

  trackIngredientById(index: number, item: IIngredient) {
    return item.id;
  }
}

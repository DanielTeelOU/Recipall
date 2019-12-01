import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IIngredient, Ingredient } from 'app/shared/model/ingredient.model';
import { IngredientService } from './ingredient.service';

@Component({
  selector: 'jhi-ingredient-update',
  templateUrl: './ingredient-update.component.html'
})
export class IngredientUpdateComponent implements OnInit {
  isSaving: boolean;

  ingredients: IIngredient[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    imageURL: [],
    ingredient: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ingredientService: IngredientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ingredient }) => {
      this.updateForm(ingredient);
    });
    this.ingredientService
      .query()
      .subscribe(
        (res: HttpResponse<IIngredient[]>) => (this.ingredients = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(ingredient: IIngredient) {
    this.editForm.patchValue({
      id: ingredient.id,
      name: ingredient.name,
      imageURL: ingredient.imageURL,
      ingredient: ingredient.ingredient
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ingredient = this.createFromForm();
    if (ingredient.id !== undefined) {
      this.subscribeToSaveResponse(this.ingredientService.update(ingredient));
    } else {
      this.subscribeToSaveResponse(this.ingredientService.create(ingredient));
    }
  }

  private createFromForm(): IIngredient {
    return {
      ...new Ingredient(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      imageURL: this.editForm.get(['imageURL']).value,
      ingredient: this.editForm.get(['ingredient']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIngredient>>) {
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

  trackIngredientById(index: number, item: IIngredient) {
    return item.id;
  }
}

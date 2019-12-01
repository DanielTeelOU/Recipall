import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMeal, Meal } from 'app/shared/model/meal.model';
import { MealService } from './meal.service';

@Component({
  selector: 'jhi-meal-update',
  templateUrl: './meal-update.component.html'
})
export class MealUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    mealName: [],
    mealDesc: []
  });

  constructor(protected mealService: MealService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ meal }) => {
      this.updateForm(meal);
    });
  }

  updateForm(meal: IMeal) {
    this.editForm.patchValue({
      id: meal.id,
      mealName: meal.mealName,
      mealDesc: meal.mealDesc
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const meal = this.createFromForm();
    if (meal.id !== undefined) {
      this.subscribeToSaveResponse(this.mealService.update(meal));
    } else {
      this.subscribeToSaveResponse(this.mealService.create(meal));
    }
  }

  private createFromForm(): IMeal {
    return {
      ...new Meal(),
      id: this.editForm.get(['id']).value,
      mealName: this.editForm.get(['mealName']).value,
      mealDesc: this.editForm.get(['mealDesc']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeal>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}

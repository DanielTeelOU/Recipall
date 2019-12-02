import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMeal, Meal } from 'app/shared/model/meal.model';
import { MealService } from './meal.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-meal-update',
  templateUrl: './meal-update.component.html'
})
export class MealUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    mealName: [],
    mealDesc: [],
    user: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected mealService: MealService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ meal }) => {
      this.updateForm(meal);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(meal: IMeal) {
    this.editForm.patchValue({
      id: meal.id,
      mealName: meal.mealName,
      mealDesc: meal.mealDesc,
      user: meal.user
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
      mealDesc: this.editForm.get(['mealDesc']).value,
      user: this.editForm.get(['user']).value
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
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}

import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IRecipe, Recipe } from 'app/shared/model/recipe.model';
import { RecipeService } from './recipe.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-recipe-update',
  templateUrl: './recipe-update.component.html'
})
export class RecipeUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    time: [],
    difficulty: [],
    rating: [],
    steps: [null, [Validators.required]],
    creationDate: [],
    description: [null, [Validators.required]],
    name: [null, [Validators.required]],
    score: [],
    user: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected recipeService: RecipeService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ recipe }) => {
      this.updateForm(recipe);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(recipe: IRecipe) {
    this.editForm.patchValue({
      id: recipe.id,
      time: recipe.time,
      difficulty: recipe.difficulty,
      rating: recipe.rating,
      steps: recipe.steps,
      creationDate: recipe.creationDate != null ? recipe.creationDate.format(DATE_TIME_FORMAT) : null,
      description: recipe.description,
      name: recipe.name,
      score: recipe.score,
      user: recipe.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const recipe = this.createFromForm();
    if (recipe.id !== undefined) {
      this.subscribeToSaveResponse(this.recipeService.update(recipe));
    } else {
      this.subscribeToSaveResponse(this.recipeService.create(recipe));
    }
  }

  private createFromForm(): IRecipe {
    return {
      ...new Recipe(),
      id: this.editForm.get(['id']).value,
      time: this.editForm.get(['time']).value,
      difficulty: this.editForm.get(['difficulty']).value,
      rating: this.editForm.get(['rating']).value,
      steps: this.editForm.get(['steps']).value,
      creationDate:
        this.editForm.get(['creationDate']).value != null ? moment(this.editForm.get(['creationDate']).value, DATE_TIME_FORMAT) : undefined,
      description: this.editForm.get(['description']).value,
      name: this.editForm.get(['name']).value,
      score: this.editForm.get(['score']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipe>>) {
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

import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IRecipeList, RecipeList } from 'app/shared/model/recipe-list.model';
import { RecipeListService } from './recipe-list.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from 'app/entities/recipe/recipe.service';

@Component({
  selector: 'jhi-recipe-list-update',
  templateUrl: './recipe-list-update.component.html'
})
export class RecipeListUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  recipes: IRecipe[];

  editForm = this.fb.group({
    id: [],
    user: [null, Validators.required],
    recipe: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected recipeListService: RecipeListService,
    protected userService: UserService,
    protected recipeService: RecipeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ recipeList }) => {
      this.updateForm(recipeList);
    });
    this.userService
      .query()
      .subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.recipeService
      .query()
      .subscribe((res: HttpResponse<IRecipe[]>) => (this.recipes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(recipeList: IRecipeList) {
    this.editForm.patchValue({
      id: recipeList.id,
      user: recipeList.user,
      recipe: recipeList.recipe
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const recipeList = this.createFromForm();
    if (recipeList.id !== undefined) {
      this.subscribeToSaveResponse(this.recipeListService.update(recipeList));
    } else {
      this.subscribeToSaveResponse(this.recipeListService.create(recipeList));
    }
  }

  private createFromForm(): IRecipeList {
    return {
      ...new RecipeList(),
      id: this.editForm.get(['id']).value,
      user: this.editForm.get(['user']).value,
      recipe: this.editForm.get(['recipe']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipeList>>) {
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

  trackRecipeById(index: number, item: IRecipe) {
    return item.id;
  }
}

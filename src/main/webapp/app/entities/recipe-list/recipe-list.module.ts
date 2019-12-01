import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipallSharedModule } from 'app/shared/shared.module';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeListDetailComponent } from './recipe-list-detail.component';
import { RecipeListUpdateComponent } from './recipe-list-update.component';
import { RecipeListDeleteDialogComponent } from './recipe-list-delete-dialog.component';
import { recipeListRoute } from './recipe-list.route';

@NgModule({
  imports: [RecipallSharedModule, RouterModule.forChild(recipeListRoute)],
  declarations: [RecipeListComponent, RecipeListDetailComponent, RecipeListUpdateComponent, RecipeListDeleteDialogComponent],
  entryComponents: [RecipeListDeleteDialogComponent]
})
export class RecipallRecipeListModule {}

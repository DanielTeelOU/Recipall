import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipallSharedModule } from 'app/shared/shared.module';
import { RecipeComponent } from './recipe.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeUpdateComponent } from './recipe-update.component';
import { RecipeDeletePopupComponent, RecipeDeleteDialogComponent } from './recipe-delete-dialog.component';
import { recipeRoute, recipePopupRoute } from './recipe.route';

const ENTITY_STATES = [...recipeRoute, ...recipePopupRoute];

@NgModule({
  imports: [RecipallSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [RecipeComponent, RecipeDetailComponent, RecipeUpdateComponent, RecipeDeleteDialogComponent, RecipeDeletePopupComponent],
  entryComponents: [RecipeDeleteDialogComponent]
})
export class RecipallRecipeModule {}

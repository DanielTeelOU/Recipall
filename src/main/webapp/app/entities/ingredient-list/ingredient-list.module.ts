import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipallSharedModule } from 'app/shared/shared.module';
import { IngredientListComponent } from './ingredient-list.component';
import { IngredientListDetailComponent } from './ingredient-list-detail.component';
import { IngredientListUpdateComponent } from './ingredient-list-update.component';
import { IngredientListDeleteDialogComponent } from './ingredient-list-delete-dialog.component';
import { ingredientListRoute } from './ingredient-list.route';

@NgModule({
  imports: [RecipallSharedModule, RouterModule.forChild(ingredientListRoute)],
  declarations: [
    IngredientListComponent,
    IngredientListDetailComponent,
    IngredientListUpdateComponent,
    IngredientListDeleteDialogComponent
  ],
  entryComponents: [IngredientListDeleteDialogComponent]
})
export class RecipallIngredientListModule {}

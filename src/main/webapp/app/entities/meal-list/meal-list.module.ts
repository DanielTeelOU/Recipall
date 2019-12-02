import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipallSharedModule } from 'app/shared/shared.module';
import { MealListComponent } from './meal-list.component';
import { MealListDetailComponent } from './meal-list-detail.component';
import { MealListUpdateComponent } from './meal-list-update.component';
import { MealListDeleteDialogComponent } from './meal-list-delete-dialog.component';
import { mealListRoute } from './meal-list.route';

@NgModule({
  imports: [RecipallSharedModule, RouterModule.forChild(mealListRoute)],
  declarations: [MealListComponent, MealListDetailComponent, MealListUpdateComponent, MealListDeleteDialogComponent],
  entryComponents: [MealListDeleteDialogComponent]
})
export class RecipallMealListModule {}

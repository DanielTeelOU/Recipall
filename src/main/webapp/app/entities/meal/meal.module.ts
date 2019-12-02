import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipallSharedModule } from 'app/shared/shared.module';
import { MealComponent } from './meal.component';
import { MealDetailComponent } from './meal-detail.component';
import { MealUpdateComponent } from './meal-update.component';
import { MealDeletePopupComponent, MealDeleteDialogComponent } from './meal-delete-dialog.component';
import { mealRoute, mealPopupRoute } from './meal.route';

const ENTITY_STATES = [...mealRoute, ...mealPopupRoute];

@NgModule({
  imports: [RecipallSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MealComponent, MealDetailComponent, MealUpdateComponent, MealDeleteDialogComponent, MealDeletePopupComponent],
  entryComponents: [MealDeleteDialogComponent]
})
export class RecipallMealModule {}

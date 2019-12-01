import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'recipe',
        loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipallRecipeModule)
      },
      {
        path: 'recipe-list',
        loadChildren: () => import('./recipe-list/recipe-list.module').then(m => m.RecipallRecipeListModule)
      },
      {
        path: 'comment',
        loadChildren: () => import('./comment/comment.module').then(m => m.RecipallCommentModule)
      },
      {
        path: 'ingredient-list',
        loadChildren: () => import('./ingredient-list/ingredient-list.module').then(m => m.RecipallIngredientListModule)
      },
      {
        path: 'ingredient',
        loadChildren: () => import('./ingredient/ingredient.module').then(m => m.RecipallIngredientModule)
      },
      {
        path: 'meal-list',
        loadChildren: () => import('./meal-list/meal-list.module').then(m => m.RecipallMealListModule)
      },
      {
        path: 'meal',
        loadChildren: () => import('./meal/meal.module').then(m => m.RecipallMealModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class RecipallEntityModule {}

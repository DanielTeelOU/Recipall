import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecipe } from 'app/shared/model/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  templateUrl: './recipe-delete-dialog.component.html'
})
export class RecipeDeleteDialogComponent {
  recipe: IRecipe;

  constructor(protected recipeService: RecipeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.recipeService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'recipeListModification',
        content: 'Deleted an recipe'
      });
      this.activeModal.dismiss(true);
    });
  }
}

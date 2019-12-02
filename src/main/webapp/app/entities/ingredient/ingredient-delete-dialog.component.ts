import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIngredient } from 'app/shared/model/ingredient.model';
import { IngredientService } from './ingredient.service';

@Component({
  templateUrl: './ingredient-delete-dialog.component.html'
})
export class IngredientDeleteDialogComponent {
  ingredient: IIngredient;

  constructor(
    protected ingredientService: IngredientService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ingredientService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'ingredientListModification',
        content: 'Deleted an ingredient'
      });
      this.activeModal.dismiss(true);
    });
  }
}

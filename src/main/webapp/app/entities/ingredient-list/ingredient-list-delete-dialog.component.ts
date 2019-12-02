import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IIngredientList } from 'app/shared/model/ingredient-list.model';
import { IngredientListService } from './ingredient-list.service';

@Component({
  templateUrl: './ingredient-list-delete-dialog.component.html'
})
export class IngredientListDeleteDialogComponent {
  ingredientList: IIngredientList;

  constructor(
    protected ingredientListService: IngredientListService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ingredientListService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'ingredientListListModification',
        content: 'Deleted an ingredientList'
      });
      this.activeModal.dismiss(true);
    });
  }
}

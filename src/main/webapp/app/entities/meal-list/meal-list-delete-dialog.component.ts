import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMealList } from 'app/shared/model/meal-list.model';
import { MealListService } from './meal-list.service';

@Component({
  templateUrl: './meal-list-delete-dialog.component.html'
})
export class MealListDeleteDialogComponent {
  mealList: IMealList;

  constructor(protected mealListService: MealListService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mealListService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'mealListListModification',
        content: 'Deleted an mealList'
      });
      this.activeModal.dismiss(true);
    });
  }
}

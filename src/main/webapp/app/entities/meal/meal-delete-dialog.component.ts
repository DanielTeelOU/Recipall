import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMeal } from 'app/shared/model/meal.model';
import { MealService } from './meal.service';

@Component({
  templateUrl: './meal-delete-dialog.component.html'
})
export class MealDeleteDialogComponent {
  meal: IMeal;

  constructor(protected mealService: MealService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.mealService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'mealListModification',
        content: 'Deleted an meal'
      });
      this.activeModal.dismiss(true);
    });
  }
}

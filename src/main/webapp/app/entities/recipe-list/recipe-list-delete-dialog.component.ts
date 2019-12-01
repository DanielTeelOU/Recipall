import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecipeList } from 'app/shared/model/recipe-list.model';
import { RecipeListService } from './recipe-list.service';

@Component({
  templateUrl: './recipe-list-delete-dialog.component.html'
})
export class RecipeListDeleteDialogComponent {
  recipeList: IRecipeList;

  constructor(
    protected recipeListService: RecipeListService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.recipeListService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'recipeListListModification',
        content: 'Deleted an recipeList'
      });
      this.activeModal.dismiss(true);
    });
  }
}

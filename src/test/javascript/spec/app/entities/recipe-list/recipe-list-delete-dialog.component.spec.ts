import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RecipallTestModule } from '../../../test.module';
import { RecipeListDeleteDialogComponent } from 'app/entities/recipe-list/recipe-list-delete-dialog.component';
import { RecipeListService } from 'app/entities/recipe-list/recipe-list.service';

describe('Component Tests', () => {
  describe('RecipeList Management Delete Component', () => {
    let comp: RecipeListDeleteDialogComponent;
    let fixture: ComponentFixture<RecipeListDeleteDialogComponent>;
    let service: RecipeListService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipallTestModule],
        declarations: [RecipeListDeleteDialogComponent]
      })
        .overrideTemplate(RecipeListDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecipeListDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipeListService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});

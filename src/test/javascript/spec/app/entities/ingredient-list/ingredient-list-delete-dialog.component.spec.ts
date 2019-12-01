import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RecipallTestModule } from '../../../test.module';
import { IngredientListDeleteDialogComponent } from 'app/entities/ingredient-list/ingredient-list-delete-dialog.component';
import { IngredientListService } from 'app/entities/ingredient-list/ingredient-list.service';

describe('Component Tests', () => {
  describe('IngredientList Management Delete Component', () => {
    let comp: IngredientListDeleteDialogComponent;
    let fixture: ComponentFixture<IngredientListDeleteDialogComponent>;
    let service: IngredientListService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipallTestModule],
        declarations: [IngredientListDeleteDialogComponent]
      })
        .overrideTemplate(IngredientListDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IngredientListDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IngredientListService);
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

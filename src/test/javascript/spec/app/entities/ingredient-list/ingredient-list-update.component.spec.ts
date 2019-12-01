import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RecipallTestModule } from '../../../test.module';
import { IngredientListUpdateComponent } from 'app/entities/ingredient-list/ingredient-list-update.component';
import { IngredientListService } from 'app/entities/ingredient-list/ingredient-list.service';
import { IngredientList } from 'app/shared/model/ingredient-list.model';

describe('Component Tests', () => {
  describe('IngredientList Management Update Component', () => {
    let comp: IngredientListUpdateComponent;
    let fixture: ComponentFixture<IngredientListUpdateComponent>;
    let service: IngredientListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipallTestModule],
        declarations: [IngredientListUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(IngredientListUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IngredientListUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IngredientListService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new IngredientList(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new IngredientList();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

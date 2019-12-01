import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RecipallTestModule } from '../../../test.module';
import { MealListUpdateComponent } from 'app/entities/meal-list/meal-list-update.component';
import { MealListService } from 'app/entities/meal-list/meal-list.service';
import { MealList } from 'app/shared/model/meal-list.model';

describe('Component Tests', () => {
  describe('MealList Management Update Component', () => {
    let comp: MealListUpdateComponent;
    let fixture: ComponentFixture<MealListUpdateComponent>;
    let service: MealListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipallTestModule],
        declarations: [MealListUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MealListUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealListUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealListService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MealList(123);
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
        const entity = new MealList();
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

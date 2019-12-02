import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RecipallTestModule } from '../../../test.module';
import { RecipeListUpdateComponent } from 'app/entities/recipe-list/recipe-list-update.component';
import { RecipeListService } from 'app/entities/recipe-list/recipe-list.service';
import { RecipeList } from 'app/shared/model/recipe-list.model';

describe('Component Tests', () => {
  describe('RecipeList Management Update Component', () => {
    let comp: RecipeListUpdateComponent;
    let fixture: ComponentFixture<RecipeListUpdateComponent>;
    let service: RecipeListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipallTestModule],
        declarations: [RecipeListUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RecipeListUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecipeListUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipeListService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RecipeList(123);
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
        const entity = new RecipeList();
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

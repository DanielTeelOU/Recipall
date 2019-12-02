import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RecipallTestModule } from '../../../test.module';
import { IngredientListComponent } from 'app/entities/ingredient-list/ingredient-list.component';
import { IngredientListService } from 'app/entities/ingredient-list/ingredient-list.service';
import { IngredientList } from 'app/shared/model/ingredient-list.model';

describe('Component Tests', () => {
  describe('IngredientList Management Component', () => {
    let comp: IngredientListComponent;
    let fixture: ComponentFixture<IngredientListComponent>;
    let service: IngredientListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipallTestModule],
        declarations: [IngredientListComponent],
        providers: []
      })
        .overrideTemplate(IngredientListComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(IngredientListComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(IngredientListService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new IngredientList(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ingredientLists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

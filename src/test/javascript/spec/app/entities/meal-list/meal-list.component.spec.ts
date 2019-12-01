import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RecipallTestModule } from '../../../test.module';
import { MealListComponent } from 'app/entities/meal-list/meal-list.component';
import { MealListService } from 'app/entities/meal-list/meal-list.service';
import { MealList } from 'app/shared/model/meal-list.model';

describe('Component Tests', () => {
  describe('MealList Management Component', () => {
    let comp: MealListComponent;
    let fixture: ComponentFixture<MealListComponent>;
    let service: MealListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipallTestModule],
        declarations: [MealListComponent],
        providers: []
      })
        .overrideTemplate(MealListComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealListComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealListService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MealList(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mealLists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

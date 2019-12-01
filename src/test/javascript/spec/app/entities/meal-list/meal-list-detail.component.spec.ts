import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RecipallTestModule } from '../../../test.module';
import { MealListDetailComponent } from 'app/entities/meal-list/meal-list-detail.component';
import { MealList } from 'app/shared/model/meal-list.model';

describe('Component Tests', () => {
  describe('MealList Management Detail Component', () => {
    let comp: MealListDetailComponent;
    let fixture: ComponentFixture<MealListDetailComponent>;
    const route = ({ data: of({ mealList: new MealList(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipallTestModule],
        declarations: [MealListDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MealListDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MealListDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mealList).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

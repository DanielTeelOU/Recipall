import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RecipallTestModule } from '../../../test.module';
import { IngredientListDetailComponent } from 'app/entities/ingredient-list/ingredient-list-detail.component';
import { IngredientList } from 'app/shared/model/ingredient-list.model';

describe('Component Tests', () => {
  describe('IngredientList Management Detail Component', () => {
    let comp: IngredientListDetailComponent;
    let fixture: ComponentFixture<IngredientListDetailComponent>;
    const route = ({ data: of({ ingredientList: new IngredientList(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipallTestModule],
        declarations: [IngredientListDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(IngredientListDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IngredientListDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ingredientList).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

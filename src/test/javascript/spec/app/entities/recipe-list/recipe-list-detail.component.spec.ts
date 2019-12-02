import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RecipallTestModule } from '../../../test.module';
import { RecipeListDetailComponent } from 'app/entities/recipe-list/recipe-list-detail.component';
import { RecipeList } from 'app/shared/model/recipe-list.model';

describe('Component Tests', () => {
  describe('RecipeList Management Detail Component', () => {
    let comp: RecipeListDetailComponent;
    let fixture: ComponentFixture<RecipeListDetailComponent>;
    const route = ({ data: of({ recipeList: new RecipeList(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipallTestModule],
        declarations: [RecipeListDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RecipeListDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecipeListDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.recipeList).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

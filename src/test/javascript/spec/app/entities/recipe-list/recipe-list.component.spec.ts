import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RecipallTestModule } from '../../../test.module';
import { RecipeListComponent } from 'app/entities/recipe-list/recipe-list.component';
import { RecipeListService } from 'app/entities/recipe-list/recipe-list.service';
import { RecipeList } from 'app/shared/model/recipe-list.model';

describe('Component Tests', () => {
  describe('RecipeList Management Component', () => {
    let comp: RecipeListComponent;
    let fixture: ComponentFixture<RecipeListComponent>;
    let service: RecipeListService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RecipallTestModule],
        declarations: [RecipeListComponent],
        providers: []
      })
        .overrideTemplate(RecipeListComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecipeListComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipeListService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RecipeList(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.recipeLists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

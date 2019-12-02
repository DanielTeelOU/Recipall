import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  RecipeListComponentsPage,
  /* RecipeListDeleteDialog,
   */ RecipeListUpdatePage
} from './recipe-list.page-object';

const expect = chai.expect;

describe('RecipeList e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recipeListComponentsPage: RecipeListComponentsPage;
  let recipeListUpdatePage: RecipeListUpdatePage;
  /* let recipeListDeleteDialog: RecipeListDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RecipeLists', async () => {
    await navBarPage.goToEntity('recipe-list');
    recipeListComponentsPage = new RecipeListComponentsPage();
    await browser.wait(ec.visibilityOf(recipeListComponentsPage.title), 5000);
    expect(await recipeListComponentsPage.getTitle()).to.eq('Recipe Lists');
  });

  it('should load create RecipeList page', async () => {
    await recipeListComponentsPage.clickOnCreateButton();
    recipeListUpdatePage = new RecipeListUpdatePage();
    expect(await recipeListUpdatePage.getPageTitle()).to.eq('Create or edit a Recipe List');
    await recipeListUpdatePage.cancel();
  });

  /*  it('should create and save RecipeLists', async () => {
        const nbButtonsBeforeCreate = await recipeListComponentsPage.countDeleteButtons();

        await recipeListComponentsPage.clickOnCreateButton();
        await promise.all([
            recipeListUpdatePage.userSelectLastOption(),
            recipeListUpdatePage.recipeSelectLastOption(),
        ]);
        await recipeListUpdatePage.save();
        expect(await recipeListUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await recipeListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last RecipeList', async () => {
        const nbButtonsBeforeDelete = await recipeListComponentsPage.countDeleteButtons();
        await recipeListComponentsPage.clickOnLastDeleteButton();

        recipeListDeleteDialog = new RecipeListDeleteDialog();
        expect(await recipeListDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Recipe List?');
        await recipeListDeleteDialog.clickOnConfirmButton();

        expect(await recipeListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

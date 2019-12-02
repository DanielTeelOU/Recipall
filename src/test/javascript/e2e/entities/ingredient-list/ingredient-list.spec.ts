import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  IngredientListComponentsPage,
  /* IngredientListDeleteDialog,
   */ IngredientListUpdatePage
} from './ingredient-list.page-object';

const expect = chai.expect;

describe('IngredientList e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ingredientListComponentsPage: IngredientListComponentsPage;
  let ingredientListUpdatePage: IngredientListUpdatePage;
  /* let ingredientListDeleteDialog: IngredientListDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load IngredientLists', async () => {
    await navBarPage.goToEntity('ingredient-list');
    ingredientListComponentsPage = new IngredientListComponentsPage();
    await browser.wait(ec.visibilityOf(ingredientListComponentsPage.title), 5000);
    expect(await ingredientListComponentsPage.getTitle()).to.eq('Ingredient Lists');
  });

  it('should load create IngredientList page', async () => {
    await ingredientListComponentsPage.clickOnCreateButton();
    ingredientListUpdatePage = new IngredientListUpdatePage();
    expect(await ingredientListUpdatePage.getPageTitle()).to.eq('Create or edit a Ingredient List');
    await ingredientListUpdatePage.cancel();
  });

  /*  it('should create and save IngredientLists', async () => {
        const nbButtonsBeforeCreate = await ingredientListComponentsPage.countDeleteButtons();

        await ingredientListComponentsPage.clickOnCreateButton();
        await promise.all([
            ingredientListUpdatePage.setAmountInput('5'),
            ingredientListUpdatePage.setUnitInput('unit'),
            ingredientListUpdatePage.recipeSelectLastOption(),
            ingredientListUpdatePage.ingredientSelectLastOption(),
        ]);
        expect(await ingredientListUpdatePage.getAmountInput()).to.eq('5', 'Expected amount value to be equals to 5');
        expect(await ingredientListUpdatePage.getUnitInput()).to.eq('unit', 'Expected Unit value to be equals to unit');
        await ingredientListUpdatePage.save();
        expect(await ingredientListUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await ingredientListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last IngredientList', async () => {
        const nbButtonsBeforeDelete = await ingredientListComponentsPage.countDeleteButtons();
        await ingredientListComponentsPage.clickOnLastDeleteButton();

        ingredientListDeleteDialog = new IngredientListDeleteDialog();
        expect(await ingredientListDeleteDialog.getDialogTitle())
            .to.eq('Are you sure you want to delete this Ingredient List?');
        await ingredientListDeleteDialog.clickOnConfirmButton();

        expect(await ingredientListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

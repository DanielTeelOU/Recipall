import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { IngredientComponentsPage, IngredientDeleteDialog, IngredientUpdatePage } from './ingredient.page-object';

const expect = chai.expect;

describe('Ingredient e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ingredientComponentsPage: IngredientComponentsPage;
  let ingredientUpdatePage: IngredientUpdatePage;
  let ingredientDeleteDialog: IngredientDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Ingredients', async () => {
    await navBarPage.goToEntity('ingredient');
    ingredientComponentsPage = new IngredientComponentsPage();
    await browser.wait(ec.visibilityOf(ingredientComponentsPage.title), 5000);
    expect(await ingredientComponentsPage.getTitle()).to.eq('Ingredients');
  });

  it('should load create Ingredient page', async () => {
    await ingredientComponentsPage.clickOnCreateButton();
    ingredientUpdatePage = new IngredientUpdatePage();
    expect(await ingredientUpdatePage.getPageTitle()).to.eq('Create or edit a Ingredient');
    await ingredientUpdatePage.cancel();
  });

  it('should create and save Ingredients', async () => {
    const nbButtonsBeforeCreate = await ingredientComponentsPage.countDeleteButtons();

    await ingredientComponentsPage.clickOnCreateButton();
    await promise.all([
      ingredientUpdatePage.setNameInput('name'),
      ingredientUpdatePage.setImageURLInput('imageURL'),
      ingredientUpdatePage.ingredientSelectLastOption()
    ]);
    expect(await ingredientUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await ingredientUpdatePage.getImageURLInput()).to.eq('imageURL', 'Expected ImageURL value to be equals to imageURL');
    await ingredientUpdatePage.save();
    expect(await ingredientUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await ingredientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Ingredient', async () => {
    const nbButtonsBeforeDelete = await ingredientComponentsPage.countDeleteButtons();
    await ingredientComponentsPage.clickOnLastDeleteButton();

    ingredientDeleteDialog = new IngredientDeleteDialog();
    expect(await ingredientDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Ingredient?');
    await ingredientDeleteDialog.clickOnConfirmButton();

    expect(await ingredientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

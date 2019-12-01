import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MealListComponentsPage, MealListDeleteDialog, MealListUpdatePage } from './meal-list.page-object';

const expect = chai.expect;

describe('MealList e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mealListComponentsPage: MealListComponentsPage;
  let mealListUpdatePage: MealListUpdatePage;
  let mealListDeleteDialog: MealListDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MealLists', async () => {
    await navBarPage.goToEntity('meal-list');
    mealListComponentsPage = new MealListComponentsPage();
    await browser.wait(ec.visibilityOf(mealListComponentsPage.title), 5000);
    expect(await mealListComponentsPage.getTitle()).to.eq('Meal Lists');
  });

  it('should load create MealList page', async () => {
    await mealListComponentsPage.clickOnCreateButton();
    mealListUpdatePage = new MealListUpdatePage();
    expect(await mealListUpdatePage.getPageTitle()).to.eq('Create or edit a Meal List');
    await mealListUpdatePage.cancel();
  });

  it('should create and save MealLists', async () => {
    const nbButtonsBeforeCreate = await mealListComponentsPage.countDeleteButtons();

    await mealListComponentsPage.clickOnCreateButton();
    await promise.all([mealListUpdatePage.recipeSelectLastOption(), mealListUpdatePage.mealSelectLastOption()]);
    await mealListUpdatePage.save();
    expect(await mealListUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mealListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MealList', async () => {
    const nbButtonsBeforeDelete = await mealListComponentsPage.countDeleteButtons();
    await mealListComponentsPage.clickOnLastDeleteButton();

    mealListDeleteDialog = new MealListDeleteDialog();
    expect(await mealListDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Meal List?');
    await mealListDeleteDialog.clickOnConfirmButton();

    expect(await mealListComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

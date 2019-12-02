import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RecipeComponentsPage, RecipeDeleteDialog, RecipeUpdatePage } from './recipe.page-object';

const expect = chai.expect;

describe('Recipe e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recipeComponentsPage: RecipeComponentsPage;
  let recipeUpdatePage: RecipeUpdatePage;
  let recipeDeleteDialog: RecipeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Recipes', async () => {
    await navBarPage.goToEntity('recipe');
    recipeComponentsPage = new RecipeComponentsPage();
    await browser.wait(ec.visibilityOf(recipeComponentsPage.title), 5000);
    expect(await recipeComponentsPage.getTitle()).to.eq('Recipes');
  });

  it('should load create Recipe page', async () => {
    await recipeComponentsPage.clickOnCreateButton();
    recipeUpdatePage = new RecipeUpdatePage();
    expect(await recipeUpdatePage.getPageTitle()).to.eq('Create or edit a Recipe');
    await recipeUpdatePage.cancel();
  });

  it('should create and save Recipes', async () => {
    const nbButtonsBeforeCreate = await recipeComponentsPage.countDeleteButtons();

    await recipeComponentsPage.clickOnCreateButton();
    await promise.all([
      recipeUpdatePage.setTimeInput('5'),
      recipeUpdatePage.setDifficultyInput('5'),
      recipeUpdatePage.setRatingInput('5'),
      recipeUpdatePage.setStepsInput('steps'),
      recipeUpdatePage.setCreationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      recipeUpdatePage.setDescriptionInput('description'),
      recipeUpdatePage.setNameInput('name'),
      recipeUpdatePage.setScoreInput('5')
    ]);
    expect(await recipeUpdatePage.getTimeInput()).to.eq('5', 'Expected time value to be equals to 5');
    expect(await recipeUpdatePage.getDifficultyInput()).to.eq('5', 'Expected difficulty value to be equals to 5');
    expect(await recipeUpdatePage.getRatingInput()).to.eq('5', 'Expected rating value to be equals to 5');
    expect(await recipeUpdatePage.getStepsInput()).to.eq('steps', 'Expected Steps value to be equals to steps');
    expect(await recipeUpdatePage.getCreationDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected creationDate value to be equals to 2000-12-31'
    );
    expect(await recipeUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await recipeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await recipeUpdatePage.getScoreInput()).to.eq('5', 'Expected score value to be equals to 5');
    await recipeUpdatePage.save();
    expect(await recipeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await recipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Recipe', async () => {
    const nbButtonsBeforeDelete = await recipeComponentsPage.countDeleteButtons();
    await recipeComponentsPage.clickOnLastDeleteButton();

    recipeDeleteDialog = new RecipeDeleteDialog();
    expect(await recipeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Recipe?');
    await recipeDeleteDialog.clickOnConfirmButton();

    expect(await recipeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

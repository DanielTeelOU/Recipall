import { element, by, ElementFinder } from 'protractor';

export class MealListComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-meal-list div table .btn-danger'));
  title = element.all(by.css('jhi-meal-list div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class MealListUpdatePage {
  pageTitle = element(by.id('jhi-meal-list-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  recipeSelect = element(by.id('field_recipe'));
  mealSelect = element(by.id('field_meal'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async recipeSelectLastOption() {
    await this.recipeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async recipeSelectOption(option) {
    await this.recipeSelect.sendKeys(option);
  }

  getRecipeSelect(): ElementFinder {
    return this.recipeSelect;
  }

  async getRecipeSelectedOption() {
    return await this.recipeSelect.element(by.css('option:checked')).getText();
  }

  async mealSelectLastOption() {
    await this.mealSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mealSelectOption(option) {
    await this.mealSelect.sendKeys(option);
  }

  getMealSelect(): ElementFinder {
    return this.mealSelect;
  }

  async getMealSelectedOption() {
    return await this.mealSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class MealListDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-mealList-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-mealList'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

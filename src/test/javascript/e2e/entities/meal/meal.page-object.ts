import { element, by, ElementFinder } from 'protractor';

export class MealComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-meal div table .btn-danger'));
  title = element.all(by.css('jhi-meal div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class MealUpdatePage {
  pageTitle = element(by.id('jhi-meal-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  mealNameInput = element(by.id('field_mealName'));
  mealDescInput = element(by.id('field_mealDesc'));
  userSelect = element(by.id('field_user'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setMealNameInput(mealName) {
    await this.mealNameInput.sendKeys(mealName);
  }

  async getMealNameInput() {
    return await this.mealNameInput.getAttribute('value');
  }

  async setMealDescInput(mealDesc) {
    await this.mealDescInput.sendKeys(mealDesc);
  }

  async getMealDescInput() {
    return await this.mealDescInput.getAttribute('value');
  }

  async userSelectLastOption(timeout?: number) {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class MealDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-meal-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-meal'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

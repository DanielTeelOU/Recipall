import { element, by, ElementFinder } from 'protractor';

export class MealComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-meal div table .btn-danger'));
  title = element.all(by.css('jhi-meal div h2#page-heading span')).first();

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

export class MealUpdatePage {
  pageTitle = element(by.id('jhi-meal-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  mealNameInput = element(by.id('field_mealName'));
  mealDescInput = element(by.id('field_mealDesc'));

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

export class MealDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-meal-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-meal'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

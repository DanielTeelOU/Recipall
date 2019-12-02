import { element, by, ElementFinder } from 'protractor';

export class RecipeListComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-recipe-list div table .btn-danger'));
  title = element.all(by.css('jhi-recipe-list div h2#page-heading span')).first();

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

export class RecipeListUpdatePage {
  pageTitle = element(by.id('jhi-recipe-list-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  userSelect = element(by.id('field_user'));
  recipeSelect = element(by.id('field_recipe'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async userSelectLastOption() {
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

export class RecipeListDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-recipeList-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-recipeList'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

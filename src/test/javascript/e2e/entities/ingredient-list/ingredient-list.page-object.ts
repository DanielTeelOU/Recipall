import { element, by, ElementFinder } from 'protractor';

export class IngredientListComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ingredient-list div table .btn-danger'));
  title = element.all(by.css('jhi-ingredient-list div h2#page-heading span')).first();

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

export class IngredientListUpdatePage {
  pageTitle = element(by.id('jhi-ingredient-list-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  amountInput = element(by.id('field_amount'));
  unitInput = element(by.id('field_unit'));
  recipeSelect = element(by.id('field_recipe'));
  ingredientSelect = element(by.id('field_ingredient'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return await this.amountInput.getAttribute('value');
  }

  async setUnitInput(unit) {
    await this.unitInput.sendKeys(unit);
  }

  async getUnitInput() {
    return await this.unitInput.getAttribute('value');
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

  async ingredientSelectLastOption() {
    await this.ingredientSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async ingredientSelectOption(option) {
    await this.ingredientSelect.sendKeys(option);
  }

  getIngredientSelect(): ElementFinder {
    return this.ingredientSelect;
  }

  async getIngredientSelectedOption() {
    return await this.ingredientSelect.element(by.css('option:checked')).getText();
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

export class IngredientListDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ingredientList-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ingredientList'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

import { element, by, ElementFinder } from 'protractor';

export class IngredientComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-ingredient div table .btn-danger'));
  title = element.all(by.css('jhi-ingredient div h2#page-heading span')).first();

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

export class IngredientUpdatePage {
  pageTitle = element(by.id('jhi-ingredient-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  imageURLInput = element(by.id('field_imageURL'));
  ingredientSelect = element(by.id('field_ingredient'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setImageURLInput(imageURL) {
    await this.imageURLInput.sendKeys(imageURL);
  }

  async getImageURLInput() {
    return await this.imageURLInput.getAttribute('value');
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

export class IngredientDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-ingredient-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-ingredient'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

import { element, by, ElementFinder } from 'protractor';

export class RecipeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-recipe div table .btn-danger'));
  title = element.all(by.css('jhi-recipe div h2#page-heading span')).first();

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

export class RecipeUpdatePage {
  pageTitle = element(by.id('jhi-recipe-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  timeInput = element(by.id('field_time'));
  difficultyInput = element(by.id('field_difficulty'));
  ratingInput = element(by.id('field_rating'));
  stepsInput = element(by.id('field_steps'));
  creationDateInput = element(by.id('field_creationDate'));
  descriptionInput = element(by.id('field_description'));
  nameInput = element(by.id('field_name'));
  scoreInput = element(by.id('field_score'));
  userSelect = element(by.id('field_user'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setTimeInput(time) {
    await this.timeInput.sendKeys(time);
  }

  async getTimeInput() {
    return await this.timeInput.getAttribute('value');
  }

  async setDifficultyInput(difficulty) {
    await this.difficultyInput.sendKeys(difficulty);
  }

  async getDifficultyInput() {
    return await this.difficultyInput.getAttribute('value');
  }

  async setRatingInput(rating) {
    await this.ratingInput.sendKeys(rating);
  }

  async getRatingInput() {
    return await this.ratingInput.getAttribute('value');
  }

  async setStepsInput(steps) {
    await this.stepsInput.sendKeys(steps);
  }

  async getStepsInput() {
    return await this.stepsInput.getAttribute('value');
  }

  async setCreationDateInput(creationDate) {
    await this.creationDateInput.sendKeys(creationDate);
  }

  async getCreationDateInput() {
    return await this.creationDateInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setScoreInput(score) {
    await this.scoreInput.sendKeys(score);
  }

  async getScoreInput() {
    return await this.scoreInput.getAttribute('value');
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

export class RecipeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-recipe-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-recipe'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}

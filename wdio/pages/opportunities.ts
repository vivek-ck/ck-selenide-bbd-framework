import SalesForce from "./_salesforce"

class Opportunities extends SalesForce {
  get opportunitiesSearchField() { return $("//input[@aria-label='Search Recently Viewed list view.']") }
  get detailsTabButton() { return $("//a[contains(text(), 'Details')]") }
  get relationshipAssociateDropdown() { return $("//label[contains(text(), 'Relationship Associate')]/following-sibling::div//input") }
  get loanTypeDropdown() { return $("//button[contains(@aria-label, 'Loan Type')]") }
  get assetTypeDropdown() { return $("//button[contains(@aria-label, 'Asset Type')]") }
  get amountField() { return $("//input[@name='Amount']") }
  get termField() { return $("//input[@name='Term__c']") }
  get clientTypeDropdown() { return $("//button[contains(@aria-label, 'Client Type')]") }
  get transactionTypeDropdown() { return $("//button[contains(@aria-label, 'Transaction Type')]") }
  get loanUseDropdown() { return $("//button[contains(@aria-label, 'Loan Use')]") }
  get lenderDropdown() { return $("//button[contains(@aria-label, 'Lender')]") }
  get saveEditButton() { return $("//button[text()='Save']") }
  get editLoanTypeButton() { return $("//button[@title='Edit Loan Type']") }
  get markAsCurrentStageButton() { return $("//span[contains(text(), 'Mark as Current Stage')]") }
  get createApplicationButton() { return $("//button[text() = 'Create Application']//ancestor::li") }

  applicationsCountText(count: number = 1) {
    return $(`//span[text() = 'Applications']/following-sibling::span[text() = '(${count})']`);
  }

  applicationsListLink(linkIndex: number = 1) {
    return $(`(//h3/descendant::a/descendant::span[contains(text(), 'APP-')])[${linkIndex}]`);
  }

  oppuortunitiesStageButton(leadStatus: string) {
    return $(`//span[text() = '${leadStatus}']`);
  }

  async searchOpportunity(name: string): Promise<void> {
    await this.opportunitiesSearchField.setValue(`${name}\n`);
  }

  async openOpportunityWithName(name: string): Promise<void> {
    await browser.pause(2000);
    await this.searchOpportunity(name);
    await (await this.getElementContainingExactText(`${name}-`, 'a')).waitForDisplayed();
    await (await this.getElementContainingExactText(`${name}-`, 'a')).click();
    await (await this.getElementContainingExactText(`${name}-`, 'lightning-formatted-text')).waitForDisplayed();
  }

  async modifyNecessaryDetails(amount: string = '80000', termDuration: string = '12'): Promise<void> {
    await browser.pause(4000);
    await browser.refresh();
    await this.detailsTabButton.click();
    await (await this.getElementContainingPartialText('Please make sure the mandatory fields are filled up', 'span')).waitForExist();

    await this.jsClick(await this.editLoanTypeButton);
    await this.saveEditButton.waitForExist({ timeout: 20000 });

    await this.amountField.setValue(amount);
    await this.termField.setValue(termDuration);

    await (await this.relationshipAssociateDropdown).waitForClickable();
    await this.relationshipAssociateDropdown.click();
    await this.relationshipAssociateDropdown.setValue('Niladri Acharya - RA');

    await (await this.getElementWithAttribute('title', 'Niladri Acharya - RA', 'lightning-base-combobox-formatted-text')).waitForDisplayed();
    await (await this.getElementWithAttribute('title', 'Niladri Acharya - RA', 'lightning-base-combobox-formatted-text')).click();

    await this.dropDownSelectByText(await this.loanTypeDropdown, 'Business Equipment Loan');
    await this.dropDownLazySelect(await this.assetTypeDropdown);
    await this.dropDownLazySelect(await this.clientTypeDropdown);
    await this.dropDownLazySelect(await this.transactionTypeDropdown);
    await this.dropDownLazySelect(await this.loanUseDropdown);
    await this.dropDownLazySelect(await this.lenderDropdown);

    await this.saveEditButton.click();
  }

  async setOppuortunityStatus(oppStatus: string): Promise<void> {
    await browser.pause(4000);
    await this.jsClick(await this.oppuortunitiesStageButton(oppStatus));
    await browser.pause(2000);
    switch (oppStatus) {
      case 'New':
        // Add the respective operation
        break;
      case 'Converted':
        // Add the respective operation
        break;
      default:
        await this.jsClick(await this.markAsCurrentStageButton);
    }
  }

  async createApplication(): Promise<void> {
    await this.setOppuortunityStatus('Preparing application');
    await browser.pause(2000);
    await this.createApplicationButton.click();
    await browser.pause(2000);
    await this.waitUntilElementDisappears(await this.getElementContainingExactText('Create Application', 'h2'), 40000);

    await this.waitForPageLoad();
    await browser.pause(2000);
    await this.applicationsCountText(2).waitForExist();
  }

  async openApplication(applicationIndex: number = 1): Promise<void> {
    const applicationId = await this.applicationsListLink(applicationIndex).getText();
    this.dataStore.setData('applicationId', applicationId);
    await this.jsClick(await this.applicationsListLink(applicationIndex));
    await browser.pause(1000);
    await this.waitForPageLoad();
    await (await this.getIframeWithAttribute('title', 'accessibility title')).waitForExist();
    const iframe = await this.getIframeWithAttribute('title', 'accessibility title');
    await browser.switchToFrame(iframe);
    await this.reloadIfElementNotPresent(await this.getElementContainingExactText(applicationId, 'div'));
  }

  async createAndOpenApplication(): Promise<void> {
    await this.createApplication();
    await this.openApplication(2);
  }
}

export default new Opportunities()
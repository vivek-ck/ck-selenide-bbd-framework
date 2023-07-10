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

  applicationsCountText(count = 1) {
    return $(`//span[text() = 'Applications']/following-sibling::span[text() = '(${count})']`);
  }

  applicationsListLink(linkIndex = 1) {
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

  private getLoanType(loanType: string) {
    switch (loanType) {
      case 'ULOC':
        return 'Unsecured Line of Credit'
      case 'CPL':
        return 'Commercial'
      case 'BEL':
        return 'Business Equipment Loan'
    }
    return 'Business Equipment Loan'
  }

  private resolveLoanUse(loanUse: string): string {
    switch (loanUse) {
      case "Business use":
      case "Business Use":
        return "Business use"
      case "Personal use":
      case "Personal Use":
      case "Personal use (NCCC)":
        return "Personal use (NCCC)"
      default:
        console.log(`Invalid Loan Purpose '${loanUse}' did not match any cases, if new add the case. \nUsing: 'Business use'`)
    }
    return "Business use"
  }

  async modifyNecessaryDetails(
    {
      loanType = 'BEL', 
      amount = '80000', 
      termDuration = '12', 
      loanUse = 'Business use',
      assetType = 'OO Residential property'
    }
  ): Promise<void> {
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

    await this.dropDownSelectByText(await this.loanTypeDropdown, this.getLoanType(loanType));
    await this.dropDownSelectByText(await this.assetTypeDropdown, assetType);
    await this.dropDownLazySelect(await this.clientTypeDropdown);
    await this.dropDownSelectByText(await this.transactionTypeDropdown, 'Refinance');
    await this.dropDownSelectByText(await this.loanUseDropdown, this.resolveLoanUse(loanUse))
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

  async openApplication(applicationIndex = 1): Promise<void> {
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
import SalesForce from "./_salesForce.js";
import { Key } from "webdriverio";

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

    applicationsCountText(count = 1) { return $(`//span[text() = 'Applications']/following-sibling::span[text() = '(${count})']`) }
    applicationsListLink(linkIndex = 1) { return $(`(//h3/descendant::a/descendant::span[contains(text(), 'APP-')])[${linkIndex}]`) }
    oppuortunitiesStageButton(leadStatus) { return $(`//span[text() = '${leadStatus}']`) }

    async searchOpportunity(name) {
        await this.opportunitiesSearchField.setValue(`${name}\n`);
    }

    async openOpportunityWithName(name) {
        await browser.pause(2000);
        await this.searchOpportunity(name);
        await this.getElementContainingExactText(`${name}-`, 'a').waitForDisplayed();
        await this.getElementContainingExactText(`${name}-`, 'a').click();
        await this.getElementContainingExactText(`${name}-`, 'lightning-formatted-text').waitForDisplayed();
    }

    async modifyNecessaryDetails(amount = '80000', termDuration = '12') {
        await browser.pause(4000);
        //Without refresh Details Tab could have multiple entries with the same xpath.
        await browser.refresh();
        await this.detailsTabButton.click();
        await this.getElementContainingPartialText('Please make sure the mandatory fields are filled up', 'span').waitForExist();

        await this.jsClick(this.editLoanTypeButton);
        await this.saveEditButton.waitForExist({ timeout: 20000 });

        await this.amountField.setValue(amount);
        await this.termField.setValue(termDuration);

        //await (await this.getElementContainingExactText('Relationship Associate', 'label')).scrollIntoView({block: 'nearest'});
        await (await this.relationshipAssociateDropdown).waitForClickable();
        await this.relationshipAssociateDropdown.click();
        await this.relationshipAssociateDropdown.setValue("Niladri Acharya - RA");

        await this.getElementWithAttribute('title', 'Niladri Acharya - RA', 'lightning-base-combobox-formatted-text').waitForDisplayed();
        await this.getElementWithAttribute('title', 'Niladri Acharya - RA', 'lightning-base-combobox-formatted-text').click();

        await this.dropDownSelectByText(this.loanTypeDropdown, 'Business Equipment Loan');
        await this.dropDownLazySelect(this.assetTypeDropdown);
        await this.dropDownLazySelect(this.clientTypeDropdown);
        await this.dropDownLazySelect(this.transactionTypeDropdown);
        await this.dropDownLazySelect(this.loanUseDropdown);
        await this.dropDownLazySelect(this.lenderDropdown);

        await this.saveEditButton.click();
    }

    async setOppuortunityStatus(oppStatus) {
        await browser.pause(4000);
        await this.jsClick(this.oppuortunitiesStageButton(oppStatus));
        await browser.pause(2000);
        switch (oppStatus) {
            case 'New':
                await this.jsClick(this.markStatusAsCompleteButton);
                break;
            case 'Converted':
                await this.jsClick(this.selectConvertedStatusButton);
                break;
            default:
                await this.jsClick(this.markAsCurrentStageButton);
        }
    }

    async createApplication() {
        await this.setOppuortunityStatus("Preparing application");
        await browser.pause(1000);
        await this.createApplicationButton.click();
        await browser.pause('2000');
        //Waiting for application to be created
        await this.waitUntilElementDisappears(await this.getElementContainingExactText('Create Application', 'h2'));
        
        await this.waitForPageLoad();
        await browser.pause(4000);
        await browser.keys(Key.End);
        await this.applicationsCountText(2).waitForExist();
    }

    async openApplication(applicationIndex = 1) {
        let applicationId = await this.applicationsListLink(applicationIndex).getText();
        this.dataStore.setData('applicationId', await applicationId);
        await this.jsClick(await this.applicationsListLink(applicationIndex));
        await browser.pause(1000);
        await this.waitForPageLoad();
        await (await this.getIframeWithAttribute('title', "accessibility title")).waitForExist();
        let iframe = await this.getIframeWithAttribute('title', "accessibility title");
        await browser.switchToFrame(iframe);
        await this.reloadIfElementNotPresent(await this.getElementContainingExactText(applicationId, 'div'));
    }

    async createAndOpenApplication() {
        await this.createApplication();
        await this.openApplication(2);
    }
}

export default new Opportunities();
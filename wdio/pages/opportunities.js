import SalesForce from "./_salesforce.js";
import { Key } from "webdriverio";

class Opportunities extends SalesForce {
    get opportunitiesSearchField() { return $("//input[@aria-label='Search Recently Viewed list view.']") }
    get detailsTabButton() { return $("//a[contains(text(), 'Details')]") }
    get relationshipAssociateDropdown() { return $("//label[contains(text(), 'Relationship Associate')]/following-sibling::div/div") }
    get loanTypeDropdown() { return $("//button[@aria-label='Loan Type, --None--']") }
    get residentialLoanTypeDropdown() { return $("//button[@aria-label='Loan Type, Residential']") }
    get assetTypeDropdown() { return $("//button[@aria-label='Asset Type, --None--']") }
    get amountField() { return $("//input[@name='Amount']") }
    get termField() { return $("//input[@name='Term__c']") }
    get clientTypeDropdown() { return $("//button[@aria-label='Client Type, --None--']") }
    get transactionTypeDropdown() { return $("//button[@aria-label='Transaction Type, --None--']") }
    get loanUseDropdown() { return $("//button[@aria-label='Loan Use, --None--']") }
    get lenderDropdown() { return $("//button[@aria-label='Lender, --None--']") }
    get saveEditButton() { return $("//button[text()='Save']") }
    get editLoanTypeButton() { return $("//button[@title='Edit Loan Type']") }
    get markAsCurrentStageButton() { return $("//span[contains(text(), 'Mark as Current Stage')]") }
    get createApplicationButton() { return $("//button[text() = 'Create Application']//ancestor::li") }

    getOppuortunitiesStageButton(leadStatus) { return $(`//span[text() = '${leadStatus}']`) }




    async searchOpportunity(name) {
        await this.opportunitiesSearchField.setValue(name + '\n');
    }

    async openOpportunityWithName(name) {
        await this.searchOpportunity(name);
        await browser.pause(2000);
        await this.getElementContainingExactText(name + '-', 'a').click();
    }

    async modifyNecessaryDetails(amount = '80000', termDuration = '12') {
        await browser.pause(4000);
        //Without refresh Details Tab could have multiple entries with the same xpath.
        await browser.refresh();
        await browser.pause(2000);
        await this.detailsTabButton.click();
        await this.getElementContainingPartialText('Please make sure the mandatory fields are filled up', 'span').waitForExist({ timeout: 10000 });

        await this.jsClick(this.editLoanTypeButton);
        await this.saveEditButton.waitForExist({ timeout: 20000 });

        await this.amountField.setValue(amount);
        await this.termField.setValue(termDuration)

        await this.relationshipAssociateDropdown.click();
        await browser.pause(1000);
        await browser.keys([Key.ArrowDown]);
        await browser.keys([Key.Enter]);

        await this.dropDownLazySelect(this.loanTypeDropdown);
        await this.dropDownLazySelect(this.residentialLoanTypeDropdown);
        await this.dropDownLazySelect(this.assetTypeDropdown);
        await this.dropDownLazySelect(this.clientTypeDropdown);
        await this.dropDownLazySelect(this.transactionTypeDropdown);
        await this.dropDownLazySelect(this.loanUseDropdown);
        await this.dropDownLazySelect(this.lenderDropdown);

        await this.saveEditButton.click();
    }

    async setOppuortunityStatus(oppStatus) {
        await browser.pause(4000);
        await this.jsClick(this.getOppuortunitiesStageButton(oppStatus));
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
        await this.createApplicationButton.click()
    }
}

export default new Opportunities();
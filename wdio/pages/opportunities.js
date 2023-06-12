import SalesForce from "./_salesForce.js";
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

    applicationsCountText(count = 1) { return $(`//span[text() = 'Applications']/following-sibling::span[text() = '(${count})']`) }
    applicationsListLink(linkIndex = 1) { return $(`(//h3/descendant::a/descendant::span[contains(text(), 'APP-')])[${linkIndex}]`) }
    oppuortunitiesStageButton(leadStatus) { return $(`//span[text() = '${leadStatus}']`) }


    //iframe: accessibility title
    get ellipsisMenuButton() { return $("//div[@class = 'sk-navigation sk-navigation-dropdown sk-dropnav']") }
    get loanPurposeSearchButton() { return $("//div[text() = 'Loan Purpose']/parent::div/following-sibling::div/div") }
    get selectPurposeSearchField() { return $("//input[@placeholder = 'Search CL Purposes']") }

    ellipsisMenuItemWithText(text) { return $(`//div[@class = 'sk-dropnav-dropdown-item']//span[text() = '${text}']`) }       //Tripple vertical dots
    purposeSearchResultText(searchValue) { return $(`//div[contains(text() ,'${searchValue}')]/ancestor::td/preceding-sibling::td`) }       //chain icon for the search result






    async searchOpportunity(name) {
        await this.opportunitiesSearchField.setValue(`${name}\n`);
    }

    async openOpportunityWithName(name) {
        await this.searchOpportunity(name);
        await browser.pause(2000);
        await this.getElementContainingExactText(`${name}-`, 'a').click();
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
        // await this.setOppuortunityStatus("Preparing application");
        // await browser.pause(1000);
        // await this.createApplicationButton.click()
        await this.waitForPageLoad();
        await browser.pause(5000);
        await browser.keys(Key.End);
        await this.applicationsCountText(2).waitForExist();
    }

    async openApplication(applicationIndex = 1) {
        // Probably not needed as we are using jsClick
        // await this.applicationsListLink(applicationIndex).scrollIntoView({block:'center'});
        // await browser.pause(1000);
        let applicationId = await this.applicationsListLink(applicationIndex).getText();
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
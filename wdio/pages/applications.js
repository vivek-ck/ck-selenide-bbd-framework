import SalesForce from "./_salesForce.js";

class Application extends SalesForce {

    //iframe[@title = 'accessibility title'] {main}
    get loanEditButton() { return $("//div[@id='loan-edit-button']") }
    get repaymentTypeButton() { return $("//div[text() = 'Repayment Type']/../following-sibling::div") }
    get repaymentFrequencyDropdown() { return $("//div[text() = 'Repayment Frequency']/../following-sibling::div/select") }
    get rateTypeDropdown() { return $("//div[text() = 'Rate Type']/../following-sibling::div/select") }
    get generatePricing() { return $("//span[text() = 'Generate Pricing']") }
    get ownershipPercentage() { return $("//tr[@class='nx-item']//input[@inputmode='numeric']") }

    //iframe[@id ='party-iframe'] {child of "accessibility title"}
    get partyTypeButton() { return $("//div[text() = 'Party Type']/../following-sibling::div") }

    /**
     * 
     * @param {searchButtonType} type Use {searchButtonType} JSON for parameter
     * @returns searchButton element selector
     */
    searchButton(type) { return $(`//div[text() = '${type}']/parent::div/following-sibling::div/div[contains(@class, 'ui-icon-search')]`) }

    /**
     * Returns the chain icon element associated with the search result for a given loan purpose option text.
     *
     * @param searchValue The text used to search for the loan purpose option.
     * @return The chain icon element corresponding to the search result.
     */
    searchResultLink(searchValue) { return $(`//div[contains(text() ,'${searchValue}')]/ancestor::td/preceding-sibling::td`) }

    /**
     * Returns the label element associated with the given repayment type text.
     *
     * @param typeText The text representing the repayment type.
     * @return The label element corresponding to the repayment type.
     */
    typeOption(typeText) { return $(`//span[text() = '${typeText}']/ancestor::label`) }

    /**
     * Returns the next button element for the specified collateral page.
     *
     * @param page The page number for which to retrieve the next button.
     *             The default value is 1 if not provided.
     * @return The next button element for the specified page.
     */
    nextButton(page = 1) { return $(`(//span[text() = 'Next']/parent::div)[${page}]`) }

    /**
     * Returns the previous button element for the specified collateral page.
     *
     * @param page The page number for which to retrieve the previous button.
     *             The default value is 1 if not provided.
     * @return The previous button element for the specified page.
     */
    previousButton(page = 1) { return $(`(//span[text() = 'Previous']/parent::div)[${page}]`) }

    collateralInfoField(fieldName) { return $(`//div[text() = '${fieldName}']/parent::div/following-sibling::div//input`) }

    async searchApplicationWithId(applicationId) {
        await this.getElementWithAttribute('placeholder', 'Search this list...', 'input').setValue(`${applicationId}`);
    }

    async goToApplicationTabWithText(tabName) {
        let tabNameSelector = await $(`//div[text() = '${tabName}']//ancestor::li`);
        await tabNameSelector.waitForDisplayed();
        await tabNameSelector.click();
    }

    async openApplicationWithId(applicationId) {
        await this.searchApplicationWithId(applicationId);
        await browser.pause(2000);
        await this.getElementContainingExactText(`${applicationId}`, 'a').click();
        await (await this.getIframeWithAttribute('title', "accessibility title")).waitForExist({ timeout: 30000 });

        //Switching to Accessibility Title Iframe
        await browser.switchToFrame(await this.getIframeWithAttribute('title', "accessibility title"));
        await this.reloadIfElementNotPresent(await this.getElementContainingExactText(applicationId, 'div'));
    }

    async selectLoanPurpose(purposeText) {
        await this.searchButton(searchButtonType.LOAN_PURPOSE).click();
        await this.getElementWithAttribute('placeholder', 'Search CL Purposes', 'input').waitForDisplayed();
        await this.getElementWithAttribute('placeholder', 'Search CL Purposes', 'input').setValue(purposeText);
        await this.searchResultLink(purposeText).waitForDisplayed();
        await browser.pause(1000);
        await this.searchResultLink(purposeText).click();
        await browser.pause(1000);
    }

    async selectBorrowerRating(ratingText) {
        await this.jsClick(searchButton(searchButtonType.BORROWER_RATING));
        await this.searchResultLink(ratingText).waitForDisplayed();
        await this.searchResultLink(ratingText).click();
    }

    async selectCollateralType(collateralText) {
        await this.searchButton(searchButtonType.COLLATERAL_TYPE).click();
        await this.searchResultLink(collateralText).waitForDisplayed();
        await this.searchResultLink(collateralText).click();
    }

    async selectAccount(accountName) {
        await $("//tr[@class = 'nx-item']/td[3]/div/div").click();
        await this.searchResultLink(accountName).waitForDisplayed();
        await this.searchResultLink(accountName).click();
    }

    

    async editLoan(rateType = 'Fixed', loanPurpose = 'Goodwill', borrowerRating = 'A', repaymentFrequency = 'Monthly', repaymentType = 'IO') {
        await this.loanEditButton.click();
        await this.getElementWithAttribute('id', 'AppDetailTitleHeader', 'div').waitForExist();
        await this.rateTypeDropdown.selectByAttribute('value', rateType);
        await this.selectLoanPurpose(loanPurpose);
        await this.selectBorrowerRating(borrowerRating);
        await this.repaymentFrequencyDropdown.selectByAttribute('value', repaymentFrequency);
        await this.repaymentTypeButton.click();
        await this.typeOption(repaymentType).click();
        await this.getElementWithAttribute('class', 'ui-multiselect-close', 'a');
        await this.generatePricing.click();
        await this.getElementWithAttribute('id', 'pricing-button', 'div').waitForDisplayed({ timeout: 30000 });
        await this.getElementWithAttribute('id', 'pricingOptionCard', 'div').click();
        await this.getElementContainingExactText('Yes', 'span').click();
        await this.getElementContainingExactText('Pricing option is selected successfully.').waitForDisplayed({ timeout: 30000 });
        await this.getElementWithAttribute('title', 'Close', 'button').click();
    }

    async addNewCollateral(securityName = 'Testname', street = 'Test Street', suburb = 'Test Suburb', postal = '888888') {
        await this.goToApplicationTabWithText('Collateral');
        await this.reloadIfElementNotPresent(this.getElementContainingExactText('Add New Collateral', 'span'), 15, 2);

        await this.getElementContainingExactText('Add New Collateral', 'span').click();
        await this.getElementWithAttribute('pagename', 'PledgeCollaterals', 'div').waitForDisplayed();
        await this.getElementContainingExactText('New Collateral', 'span').click();
        await browser.pause(1000);
        await this.nextButton(1).click();

        await this.selectCollateralType('Asset Finance');
        await this.nextButton(2).click();

        await this.collateralInfoField('Security Name').setValue(securityName);
        await this.collateralInfoField('Street').setValue(street);
        await this.collateralInfoField('Suburb').setValue(suburb);
        await this.collateralInfoField('Postal Code').setValue(postal);
        await this.nextButton(3).click();

        await this.getElementWithAttribute('title', 'Add New Collateral Owner', 'i').click();
        await this.selectAccount('Dawson Daugherty');
        await this.ownershipPercentage.setValue('100');
        await this.nextButton(4).click();

        await this.getElementContainingExactText('Save', 'span').click();
        await this.getElementWithAttribute('data-tab', 'collateralNewTabs', 'li').waitForDisplayed({ timeout: 40000 })
    }

    async addParties(accountName, relationship = 'Individual Relationship', partyType = 'GUARANTOR') {
        await this.goToApplicationTabWithText('Loan');

        //Switching to Parties Iframe from Accessibility title Iframe
        await (await this.getIframeWithAttribute('id', 'party-iframe')).waitForExist();
        await browser.switchToFrame(await this.getIframeWithAttribute('id', 'party-iframe'));
        await this.getElementContainingExactText('Parties', 'h1').waitForExist();
        await this.getElementWithAttribute('title', 'Add Parties', 'div').click();

        //Switch to accessibility title iframe
        await browser.switchToParentFrame();
        await this.getElementContainingExactText('Add Party', 'span').waitForDisplayed();

        //Switch to ui Iframe under Add Party Modal
        let uiIframe = await $("//div[@aria-describedby='top-level-dialog']//iframe");
        await browser.switchToFrame(uiIframe);

        //Select Party
        await this.getElementContainingExactText('Existing Relationship', 'span').waitForDisplayed()
        await this.getElementContainingExactText('Existing Relationship', 'span').click();
        await browser.pause(1000);
        await this.nextButton(1).click();

        //Relationship
        await this.getElementContainingExactText(relationship, 'span').click();
        await this.searchButton(searchButtonType.ACCOUNT).click();
        await this.getElementWithAttribute('placeholder', 'Search Accounts', 'input').waitForDisplayed();
        await this.getElementWithAttribute('placeholder', 'Search Accounts', 'input').setValue(accountName);
        await this.searchResultLink(accountName).waitForDisplayed();
        await browser.pause(1000);
        await this.searchResultLink(accountName).click();
        await this.nextButton(2).waitForDisplayed();
        await this.nextButton(2).click();

        //Relationship Info
        //Nothing to modify here
        await this.nextButton(3).waitForDisplayed();
        await this.nextButton(3).click();

        //Role
        await this.partyTypeButton.waitForDisplayed();
        await this.partyTypeButton.click();
        await this.typeOption(partyType).click();
        await this.getElementWithAttribute('class', 'ui-icon ui-icon-circle-close', 'span').click();
        await this.nextButton(4).click()

        //Employment and Income
        //Nothing to modify here
        await this.nextButton(5).waitForDisplayed();
        await this.nextButton(5).click();

        //Assets and Liabilities
        //Nothing to modify here
        var nextStepButton = await $("(//span[text() = 'Next Step']/parent::div)[2]")
        await nextStepButton.waitForDisplayed();
        await nextStepButton.click();

        //"Moving to final step" loading next page
        await browser.pause(2000);
        await browser.waitUntil(async () => {
            const element = await this.getElementContainingExactText('Moving to final step');
            return !(await element.isDisplayed());
        }, {
            timeout: 20000
        });
        
        //Concent
        let electronicConcent = await $("//div[text() = 'Electronic Consent']/parent::div/following-sibling::div/input");
        let creditCheckConcent = await $("//div[text() = 'Credit Check Consent']/parent::div/following-sibling::div/input");
        let saveButton = await $("//div[@role='button']/span[text()= 'Save']");
        await electronicConcent.click();
        await creditCheckConcent.click();
        await saveButton.click();

        //Waiting for Party to be saved
        await browser.waitUntil(async () => {
            const element = await this.getElementContainingExactText('Saving Party');
            return !(await element.isDisplayed());
        }, {
            timeout: 20000
        });

        //Switch to Accessibility Title Iframe
        await browser.switchToParentFrame();
    }
}

const searchButtonType = {
    LOAN_PURPOSE: 'Loan Purpose',
    BORROWER_RATING: 'Borrower Rating',
    COLLATERAL_TYPE: 'Collateral Type',
    ACCOUNT: 'Account'
}

export default new Application();

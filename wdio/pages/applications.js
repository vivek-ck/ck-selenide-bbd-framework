import SalesForce from "./_salesForce.js";

class Application extends SalesForce {
    //iframe: accessibility title
    get loanEditButton() { return $("//div[@id='loan-edit-button']") }
    get repaymentTypeButton() { return $("//div[text() = 'Repayment Type']/../following-sibling::div") }
    get repaymentFrequencyDropdown() { return $("//div[text() = 'Repayment Frequency']/../following-sibling::div/select") }
    get rateTypeDropdown() { return $("//div[text() = 'Rate Type']/../following-sibling::div/select") }
    get selectPurposeSearchField() { return $("//input[@placeholder = 'Search CL Purposes']") }
    get generatePricing() { return $("//span[text() = 'Generate Pricing']") }
    get ownershipPercentage() { return $("//tr[@class='nx-item']//input[@inputmode='numeric']") }
    
    /**
     * 
     * @param {searchButtonType} type Use {searchButtonType} JSON for parameter
     * @returns searchButton element selector
     */
    searchButton(type) { return $(`//div[text() = '${type}']/parent::div/following-sibling::div/div`) }

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
    repaymentTypeOption(typeText) { return $(`//span[text() = '${typeText}']/ancestor::label`) }

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
        await (await $(`//div[text() = '${tabName}']//ancestor::li`)).click();
    }

    async openApplicationWithId(applicationId) {
        await this.searchApplicationWithId(applicationId);
        await browser.pause(2000);
        await this.getElementContainingExactText(`${applicationId}`, 'a').click();
        await (await this.getIframeWithAttribute('title', "accessibility title")).waitForExist({ timeout: 30000 });
        let iframe = await this.getIframeWithAttribute('title', "accessibility title");
        await browser.switchToFrame(iframe);
        await this.reloadIfElementNotPresent(await this.getElementContainingExactText(applicationId, 'div'));
    }

    async selectLoanPurpose(purposeText) {
        await this.searchButton(searchButtonType.LOAN_PURPOSE).click();
        await this.selectPurposeSearchField.waitForDisplayed();
        await this.selectPurposeSearchField.setValue(purposeText);
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
        await this.repaymentTypeOption(repaymentType).click();
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
        await this.getElementWithAttribute('data-tab', 'collateralNewTabs', 'li').waitForDisplayed({timeout: 40000})
    }

}

const searchButtonType = {
    LOAN_PURPOSE: 'Loan Purpose',
    BORROWER_RATING: 'Borrower Rating',
    COLLATERAL_TYPE: 'Collateral Type',
}

export default new Application();

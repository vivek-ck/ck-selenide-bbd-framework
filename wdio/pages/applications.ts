import SalesForce from "./_salesforce"

class Application extends SalesForce {

    //iframe[@title = 'accessibility title'] {main}
    get loanEditButton() { return $("//div[@id='loan-edit-button']") }
    get repaymentTypeButton() { return $("//div[text() = 'Repayment Type']/../following-sibling::div") }
    get repaymentFrequencyDropdown() { return $("//div[text() = 'Repayment Frequency']/../following-sibling::div/select") }
    get rateTypeDropdown() { return $("//div[text() = 'Rate Type']/../following-sibling::div/select") }
    get generatePricing() { return $("//span[text() = 'Generate Pricing']/parent::div") }
    get ownershipPercentage() { return $("//tr[@class='nx-item']//input[@inputmode='numeric']") }
    get saveNewButton() { return $("//textarea/ancestor::td/preceding-sibling::td//div[@title='Save New' or @title = 'Save' or @title='Save new']") }
    get originationHamburgerButton() { return $("//div[text()='Origination']/ancestor::div[@class='nx-queue-item-inner-with-icon']/preceding-sibling::div//i") }
    get balloonAmount() { return $("//div[text() = 'Balloon Amount']/../following-sibling::div/input") }
    get repaymentTermMonth() { return $("//div[text() = 'Term']/../following-sibling::div/input") }
    get loanAmount() { return $("//div[text() = 'Loan Amount /LOC Drawdown Amount']/../following-sibling::div/input") }
    get loanUseDropdown() { return $("//div[text() = 'Loan Use']/../following-sibling::div/select") }


    //iframe[@id ='party-iframe'] {child of "accessibility title"}
    // Returns the party type button element selector
    get partyTypeButton() { return $("//div[text() = 'Party Type']/../following-sibling::div") }

    /**
     * Returns the search button element selector for the specified type.
     *
     * @param {searchButtonType} type - Use {searchButtonType} JSON for parameter
     * @returns {string} - The searchButton element selector
     */
    searchButton(type: string) { return $(`//div[text() = '${type}']/parent::div/following-sibling::div/div[contains(@class, 'ui-icon-search')]`) }

    /**
     * Returns the chain icon element associated with the search result for a given loan purpose option text.
     * This takes cares of case sensitivity
     * 
     * @param {string} searchValue - The text used to search for the loan purpose option.
     * @returns {string} - The chain icon element corresponding to the search result.
     */
    searchResultLink(searchValue: string) { return $(`//div[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ', 'abcdefghijklmnopqrstuvwxyz '), '${searchValue.toLowerCase()}')]/ancestor::td/preceding-sibling::td`) }
    /**
     * Returns the label element associated with the given repayment type text.
     *
     * @param {string} typeText - The text representing the repayment type.
     * @returns {string} - The label element corresponding to the repayment type.
     */
    typeOption(typeText: string) { return $(`//span[text() = '${typeText}']/parent::*`) }

    /**
     * Returns the next button element for the specified collateral page.
     *
     * @param {number} page - The page number for which to retrieve the next button. The default value is 1 if not provided.
     * @returns {string} - The next button element for the specified page.
     */
    nextButton(page = 1) { return $(`(//span[text() = 'Next']/parent::div)[${page}]`) }

    /**
     * Returns the previous button element for the specified collateral page.
     *
     * @param {number} page - The page number for which to retrieve the previous button. The default value is 1 if not provided.
     * @returns {string} - The previous button element for the specified page.
     */
    previousButton(page = 1) { return $(`(//span[text() = 'Previous']/parent::div)[${page}]`) }

    /**
     * Returns the collateral info field element selector for the specified field name.
     *
     * @param {string} fieldName - The name of the collateral info field.
     * @returns {string} - The collateral info field element selector.
     */
    collateralInfoField(fieldName: string) { return $(`//div[text() = '${fieldName}']/parent::div/following-sibling::div//input`) }

    /**
     * Returns the approval condition checkbox element selector for the specified index.
     *
     * @param {number} index - The index of the approval condition checkbox.
     * @returns {string} - The approval condition checkbox element selector.
     */
    approvalConditionCheckBox(index: number) { return $(`(//span[text() = 'Approval Conditions']/../following-sibling::div//td[not(@style)])[${index}]`) }

    /**
     * Returns the settlement condition checkbox element selector for the specified index.
     *
     * @param {number} index - The index of the settlement condition checkbox.
     * @returns {string} - The settlement condition checkbox element selector.
     */
    settlementConditionCheckBox(index: number) { return $(`(//span[text() = 'Select settlement conditions']/../following-sibling::div//td[not(@style)])[${index}]`) }

    /**
     * Returns the add new question button element selector for the specified index.
     *
     * @param {number} index - The index of the add new question button.
     * @returns {string} - The add new question button element selector.
     */
    addNewQuestionButton(index: number) { return $(`(//th[@class="actioncolumn"]//i)[${index}]`) }

    /**
     * Returns the form checkbox element selector with the specified text.
     *
     * @param {string} text - The text associated with the form checkbox.
     * @returns {string} - The form checkbox element selector.
     */
    formCheckBoxWithText(text: string) { return $(`//div[text()='${text}']/ancestor::td/preceding-sibling::td//input`) }



    // Async methods
    async searchApplicationWithId(applicationId: string): Promise<void> {
        await (await this.getElementWithAttribute('placeholder', 'Search this list...', 'input')).setValue(`${applicationId}\n`)
    }

    async goToApplicationTabWithText(tabName: string): Promise<void> {
        const tabNameSelector = await $(`//div[text() = '${tabName}']//ancestor::li`)
        await this.reloadIfElementNotPresent(tabNameSelector)
        await tabNameSelector.waitForClickable()
        await tabNameSelector.click()
    }

    async openApplicationWithId(applicationId: string): Promise<void> {
        await this.searchApplicationWithId(applicationId)
        await browser.pause(2000)
        await (await this.getElementContainingExactText(`${applicationId}`, 'a')).click()
        await (await this.getIframeWithAttribute('title', "accessibility title")).waitForExist({ timeout: 30000 })

        // Switching to Accessibility Title Iframe
        await browser.switchToFrame(await this.getIframeWithAttribute('title', "accessibility title"))
        await this.reloadIfElementNotPresent(await this.getElementContainingExactText(applicationId, 'div'))
    }

    async selectLoanPurpose(purposeText: string): Promise<void> {
        await this.jsClick(await this.searchButton(searchButtonType.LOAN_PURPOSE))
        await (await this.getElementWithAttribute('placeholder', 'Search CL Purposes', 'input')).waitForDisplayed()
        await (await this.getElementWithAttribute('placeholder', 'Search CL Purposes', 'input')).setValue(purposeText)
        await this.searchResultLink(purposeText).waitForDisplayed()
        await browser.pause(1000)
        await this.searchResultLink(purposeText).click()
        await browser.pause(2000)
    }

    async selectBorrowerRating(ratingText: string): Promise<void> {
        await this.jsClick(await this.searchButton(searchButtonType.BORROWER_RATING))
        await (await this.searchResultLink(ratingText)).waitForDisplayed()
        await browser.pause(1000)
        await $(`//div[text() = '${ratingText}']/ancestor::td/preceding-sibling::td`).click()
        await browser.pause(2000)
    }

    async selectCollateralType(collateralText: string): Promise<void> {
        await this.searchButton(searchButtonType.COLLATERAL_TYPE).click()

        await this.searchResultLink(collateralText).waitForClickable()
        await browser.pause(1000)
        await this.searchResultLink(collateralText).click()
        await browser.pause(2000)
    }

    async selectAccount(accountName: string): Promise<void> {
        const searchAccount = await $("//span[text() = 'Account']/ancestor::table/tbody//div[contains(@class, 'ui-icon-search')]")
        await searchAccount.click()
        await this.searchResultLink(accountName).waitForClickable()
        await browser.pause(1000)
        await this.searchResultLink(accountName).click()
        await browser.pause(2000)
    }

    private resolveRepaymentType(repaymentType: string): string {
        switch (repaymentType) {
            case "P & I":
            case "P&I":
                return "P & I"
            case "IO":
            case "io":
            case "Io":
                return "IO"
            case "Revolving":
                return "Revolving"
            case "Balloon":
                return "Balloon"
            case "Capitalised interest":
            case "Capitalised Interest":
                return "Capitalised interest"
            case "Uncheck all":
            case "Uncheck All":
                return "Uncheck all"
            case "Check all":
            case "Check All":
                return "Check all"
            default:
                console.log(`Repayment Type '${repaymentType}' did not match any cases, if new add the case. \nUsing: 'Checking All'`)
        }
        return "Check all"
    }

    private async selectRepaymentType(repaymentTypes: string) {
        await this.repaymentTypeButton.click()
        await this.typeOption("Uncheck all").click()
        //The excel must have repaymentTypes seperated by '+' in case of multiple options
        for (let repaymentType of repaymentTypes.split('+')) {
            let type = this.resolveRepaymentType(repaymentType.trim())
            await this.typeOption(type).click()
            await browser.pause(500)
        }
    }

    async editLoan(
        {
            rateType = 'Fixed',
            balloonAmount = '10,000.00',
            loanPurpose = 'Goodwill',
            borrowerRating = 'A',
            repaymentFrequency = 'Monthly',
            repaymentTypes = 'Check all'
        }
    ): Promise<void> {
        await this.goToApplicationTabWithText('Loan')
        await this.loanEditButton.click()
        await (await this.getElementWithAttribute('id', 'AppDetailTitleHeader', 'div')).waitForDisplayed()
        await browser.pause(5000)

        await this.rateTypeDropdown.selectByAttribute('value', rateType)

        await this.balloonAmount.setValue(balloonAmount)

        await this.selectLoanPurpose(loanPurpose)

        await this.selectBorrowerRating(borrowerRating)

        await this.repaymentFrequencyDropdown.selectByAttribute('value', repaymentFrequency)

        await this.selectRepaymentType(repaymentTypes)

        await this.generatePricing.click()

        try {
            console.log("Checking if any Dialog box appears, for any change made.")
            let saveChangesYes = $("//div[@role='dialog']//span[text() = 'Yes']")
            await saveChangesYes.waitForDisplayed({ timeout: 5000 })
            await saveChangesYes.click()
        } catch {
            console.log("Dialog box didin't appear as no change was made. Probably...")
        }
        const pricingButton = await this.getElementWithAttribute('id', 'pricing-button', 'div')
        await pricingButton.waitForDisplayed({ timeout: 30000 })
        await pricingButton.click()

        const pricingCard = await this.getElementWithAttribute('id', 'pricingOptionCard', 'div')
        await pricingCard.waitForDisplayed({ timeout: 30000 })
        await pricingCard.click()

        await (await $("//span[text() = 'Do you confirm selection of the pricing offer?']/parent::div/..//span[text() = 'Yes']")).click()
        await (await this.getElementContainingExactText('Pricing option is selected successfully.')).waitForDisplayed({ timeout: 30000 })

        await this.forceReload()
        await browser.pause(5000)
    }

    async addNewCollateral(
        accountOwnerName: string,
        securityName = 'Testname',
        street = 'Test Street',
        suburb = 'Test Suburb',
        postal = '888888'
    ): Promise<void> {
        await this.goToApplicationTabWithText('Collateral')
        await this.reloadIfElementNotPresent(await this.getElementContainingExactText('Add New Collateral', 'span'), { timeoutSec: 15, retries: 2 })

        await (await this.getElementContainingExactText('Add New Collateral', 'span')).click()
        await (await this.getElementWithAttribute('pagename', 'PledgeCollaterals', 'div')).waitForDisplayed()
        await (await this.getElementContainingExactText('New Collateral', 'span')).click()
        await browser.pause(1000)
        await this.nextButton(1).click()

        await this.selectCollateralType('Asset Finance')
        await this.nextButton(2).click()

        await this.collateralInfoField('Security Name').setValue(securityName)
        await this.collateralInfoField('Street').setValue(street)
        await this.collateralInfoField('Suburb').setValue(suburb)
        await this.collateralInfoField('Postal Code').setValue(postal)
        await this.nextButton(3).click()

        const addNewCollateralOwnerButton = await this.getElementWithAttribute('title', 'Add New Collateral Owner', 'i')
        await addNewCollateralOwnerButton.waitForDisplayed()
        await browser.pause(1000)
        await this.jsClick(addNewCollateralOwnerButton)
        await browser.pause(2000)
        await this.selectAccount(accountOwnerName)
        await this.ownershipPercentage.setValue('100')
        await this.nextButton(4).click()
        await browser.pause(2000)

        await (await this.getElementContainingExactText('Save', 'span')).click()
        await this.waitUntilElementDisappears(await this.getElementContainingExactText('Save', 'span'), 30)
    }

    async addParties(accountName: string, relationship = 'Individual Relationship', partyType = 'GUARANTOR'): Promise<void> {
        await this.goToApplicationTabWithText('Loan')

        // Switching to Parties Iframe from Accessibility title Iframe
        await (await this.getIframeWithAttribute('id', 'party-iframe')).waitForExist()
        await browser.switchToFrame(await this.getIframeWithAttribute('id', 'party-iframe'))
        await (await this.getElementContainingExactText('Parties', 'h1')).waitForExist()
        await (await this.getElementWithAttribute('title', 'Add Parties', 'div')).click()

        // Switch to accessibility title iframe
        await browser.switchToParentFrame()
        await (await this.getElementContainingExactText('Add Party', 'span')).waitForDisplayed()

        // Switch to ui Iframe under Add Party Modal
        const uiIframe = await $("//div[@aria-describedby='top-level-dialog']//iframe")
        await browser.switchToFrame(uiIframe)

        // Select Party
        await (await this.getElementContainingExactText('Existing Relationship', 'span')).waitForDisplayed()
        await (await this.getElementContainingExactText('Existing Relationship', 'span')).click()
        await browser.pause(1000)
        await this.nextButton(1).click()

        // Relationship
        await (await this.getElementContainingExactText(relationship, 'span')).click()
        await this.searchButton(searchButtonType.ACCOUNT).click()
        await (await this.getElementWithAttribute('placeholder', 'Search Accounts', 'input')).waitForDisplayed()
        await (await this.getElementWithAttribute('placeholder', 'Search Accounts', 'input')).setValue(accountName)
        await this.searchResultLink(accountName).waitForDisplayed()
        await browser.pause(1000)
        await this.searchResultLink(accountName).click()
        await this.nextButton(2).waitForDisplayed()
        await this.nextButton(2).click()

        // Relationship Info
        // Nothing to modify here
        await this.nextButton(3).waitForDisplayed()
        await this.nextButton(3).click()

        // Role
        await this.partyTypeButton.waitForDisplayed()
        await this.partyTypeButton.click()
        await this.typeOption(partyType).click()
        await (await this.getElementWithAttribute('class', 'ui-icon ui-icon-circle-close', 'span')).click()
        await this.nextButton(4).click()

        // Employment and Income
        // Nothing to modify here
        await this.nextButton(5).waitForDisplayed()
        await this.nextButton(5).click()

        // Assets and Liabilities
        // Nothing to modify here
        const nextStepButton = await $("(//span[text() = 'Next Step']/parent::div)[2]")
        await nextStepButton.waitForDisplayed()
        await nextStepButton.click()

        // "Moving to final step" loading next page
        await browser.pause(5000)
        this.waitUntilElementDisappears(await this.getElementContainingExactText('Moving to final step'))

        // Consent
        const electronicConsent = await $("//div[text() = 'Electronic Consent']/parent::div/following-sibling::div/input")
        const creditCheckConsent = await $("//div[text() = 'Credit Check Consent']/parent::div/following-sibling::div/input")
        const saveButton = await $("//div[@role='button']/span[text()='Save']")
        await electronicConsent.click()
        await creditCheckConsent.click()
        await saveButton.click()

        // Waiting for Party to be saved
        this.waitUntilElementDisappears(await this.getElementContainingExactText('Saving Party'))

        // Switch to Accessibility Title Iframe
        await browser.switchToParentFrame()
    }

    async addCreditApprovalConditions(approvalCondition = 'Demo approval condition', conditionIndex = 1): Promise<void> {
        await this.goToApplicationTabWithText('Credit')
        await this.goToApplicationTabWithText('Credit Comment')
        await browser.pause(2000)
        await this.goToApplicationTabWithText('Add Approval Conditions')

        // The (+) button
        const addNewQuestionButton = await this.addNewQuestionButton(1)

        // Save button visibility check after clicking addNewQuestionButton
        await this.retryStrategy.retry(
            // Main method
            async () => {
                await addNewQuestionButton.waitForDisplayed({ timeout: 25000 })
                await addNewQuestionButton.click()
                await this.saveNewButton.waitForDisplayed({ timeout: 10000 })
            },

            // Before method
            async () => {
                await browser.pause(2000)
                await this.goToApplicationTabWithText('Add Approval Conditions')
            },

            // After method
            async () => {
                await browser.pause(2000)
                await this.goToApplicationTabWithText('Credit Comment')
            },

            // Number of retries
            3
        )

        // The input field
        const approvalConditionTextbox = await $("(//span[text()='Condition Statement']/ancestor::thead/following-sibling::tbody//textarea)[1]")
        await approvalConditionTextbox.waitForDisplayed()
        await approvalConditionTextbox.setValue(approvalCondition)

        // The save button
        await this.saveNewButton.click()

        // Predefined condition
        await this.waitUntilElementDisappears(await this.getElementContainingExactText('Adding approval condition'), 40)
        await (await this.getElementContainingExactText('Pre-defined approval conditions', 'span')).waitForClickable()
        await (await this.getElementContainingExactText('Pre-defined approval conditions', 'span')).click()
        await this.approvalConditionCheckBox(conditionIndex).waitForClickable()
        await this.approvalConditionCheckBox(conditionIndex).click()
        await (await this.getElementContainingExactText('Add Conditions', 'div')).waitForClickable()
        await (await this.getElementContainingExactText('Add Conditions', 'div')).click()
    }

    async addCreditSettlementConditions(approvalCondition = 'Demo Settlement condition', conditionIndex = 1): Promise<void> {
        await this.goToApplicationTabWithText('Credit')
        await this.goToApplicationTabWithText('Credit Comment')
        await browser.pause(2000)
        await this.goToApplicationTabWithText('Add Settlement Conditions')

        // The (+) button
        const addNewQuestionButton = await this.addNewQuestionButton(2)

        // Save button visibility check after clicking addNewQuestionButton
        await this.retryStrategy.retry(
            // Main method
            async () => {
                await addNewQuestionButton.waitForDisplayed({ timeout: 25000 })
                await browser.pause(2000)
                await addNewQuestionButton.click()
                await this.saveNewButton.waitForDisplayed({ timeout: 10000 })
            },

            // Before method
            async () => {
                await browser.pause(2000)
                await this.goToApplicationTabWithText('Add Settlement Conditions')
            },

            // After method
            async () => {
                await browser.pause(2000)
                await this.goToApplicationTabWithText('Credit Comment')
            },

            // Number of retries
            3
        )

        // The input field
        const settlementConditionTextbox = await $("(//span[text()='Condition Statement']/ancestor::thead/following-sibling::tbody//textarea)[1]")
        await settlementConditionTextbox.waitForDisplayed()
        await settlementConditionTextbox.setValue(approvalCondition)

        // The save button
        await this.saveNewButton.click()

        // Predefined condition
        await this.waitUntilElementDisappears(await this.getElementContainingExactText('Adding approval condition'), 40)
        await (await this.getElementContainingExactText('Pre-defined settlement conditions', 'span')).waitForClickable()
        await (await this.getElementContainingExactText('Pre-defined settlement conditions', 'span')).click()
        await this.settlementConditionCheckBox(conditionIndex).waitForDisplayed()
        await this.settlementConditionCheckBox(conditionIndex).click()
        await browser.pause(2000)
        await (await this.getElementContainingExactText('Add conditions', 'div')).click()
        await this.waitUntilElementDisappears(await this.getElementContainingExactText('Adding settlement condition'))
    }

    async addTaskList(): Promise<void> {
        await (await this.getElementWithAttribute('id', 'manage-stages', 'div')).click()
        await this.originationHamburgerButton.waitForClickable()
        await this.originationHamburgerButton.click()
        await this.formCheckBoxWithText('Privacy form sent to Borrower').waitForClickable()
        await this.formCheckBoxWithText('Privacy form sent to Borrower').click()
        await this.formCheckBoxWithText('Application Form Sent to Borrower').waitForClickable()
        await this.formCheckBoxWithText('Application Form Sent to Borrower').click()
    }

}


const searchButtonType = {
    LOAN_PURPOSE: 'Loan Purpose',
    BORROWER_RATING: 'Borrower Rating',
    COLLATERAL_TYPE: 'Collateral Type',
    ACCOUNT: 'Account'
}

export default new Application()

import SalesForce from "./_salesForce.js";

class Application extends SalesForce {

    //iframe[@title = 'accessibility title'] {main}
    get loanEditButton() { return $("//div[@id='loan-edit-button']") }
    get repaymentTypeButton() { return $("//div[text() = 'Repayment Type']/../following-sibling::div") }
    get repaymentFrequencyDropdown() { return $("//div[text() = 'Repayment Frequency']/../following-sibling::div/select") }
    get rateTypeDropdown() { return $("//div[text() = 'Rate Type']/../following-sibling::div/select") }
    get generatePricing() { return $("//span[text() = 'Generate Pricing']/parent::div") }
    get ownershipPercentage() { return $("//tr[@class='nx-item']//input[@inputmode='numeric']") }
    get saveNewButton() { return $("//textarea/ancestor::td/preceding-sibling::td//div[@title='Save New' or @title = 'Save']") }
    // get taskHamburgerButton() { return $("//div[text()='Origination']/ancestor::div[@class='nx-queue-item-inner-with-icon']/preceding-sibling::div//i") }
    // get privacyFormCheckbox() { return $("//div[text()='Privacy form sent to Borrower']/ancestor::td/preceding-sibling::td//input") }


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
    searchResultLink(searchValue) { return $(`//div[text() = '${searchValue}']/ancestor::td/preceding-sibling::td`) }

    /**
     * Returns the label element associated with the given repayment type text.
     *
     * @param typeText The text representing the repayment type.
     * @return The label element corresponding to the repayment type.
     */
    typeOption(typeText) { return $(`//span[text() = '${typeText}']/parent::*`) }

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


    approvalConditionCheckBox(index) { return $(`(//span[text() = 'Approval Conditions']/../following-sibling::div//td[not(@style)])[${index}]`) }

    settlementConditionCheckBox(index) { return $(`(//span[text() = 'Select settlement conditions']/../following-sibling::div//td[not(@style)])[${index}]`) }

    addNewQuestionButton(index) { return $(`(//th[@class="actioncolumn"]//i)[${index}]`) }
    
    formCheckBoxWithText(text) { return $(`//div[text()='${text}']/ancestor::td/preceding-sibling::td//input`) }
    taskHamburgerButtonWithText(text) { return $(`//div[text()='${text}']/ancestor::div[@class='nx-queue-item-inner-with-icon']/preceding-sibling::div//i`) }


    // Async methods
    async searchApplicationWithId(applicationId) {
        await this.getElementWithAttribute('placeholder', 'Search this list...', 'input').setValue(`${applicationId}\n`)
    }

    async goToApplicationTabWithText(tabName) {
        let tabNameSelector = await $(`//div[text() = '${tabName}']//ancestor::li`)
        await this.reloadIfElementNotPresent(tabNameSelector)
        await tabNameSelector.waitForClickable()
        await tabNameSelector.click()
    }

    async openApplicationWithId(applicationId) {
        await this.searchApplicationWithId(applicationId)
        await browser.pause(2000)
        await this.getElementContainingExactText(`${applicationId}`, 'a').click()
        await (await this.getIframeWithAttribute('title', "accessibility title")).waitForExist({ timeout: 30000 })

        //Switching to Accessibility Title Iframe
        await browser.switchToFrame(await this.getIframeWithAttribute('title', "accessibility title"))
        await this.reloadIfElementNotPresent(await this.getElementContainingExactText(applicationId, 'div'))
    }

    async selectLoanPurpose(purposeText) {
        await this.jsClick(await this.searchButton(searchButtonType.LOAN_PURPOSE))
        await this.getElementWithAttribute('placeholder', 'Search CL Purposes', 'input').waitForDisplayed()
        await this.getElementWithAttribute('placeholder', 'Search CL Purposes', 'input').setValue(purposeText)
        await this.searchResultLink(purposeText).waitForDisplayed()
        await browser.pause(1000)
        await this.searchResultLink(purposeText).click()
        await browser.pause(2000)
    }

    async selectBorrowerRating(ratingText) {
        await this.jsClick(this.searchButton(searchButtonType.BORROWER_RATING))
        await (await this.searchResultLink(ratingText)).waitForDisplayed()
        await browser.pause(1000)
        await this.searchResultLink(ratingText).click()
        await browser.pause(2000)
    }

    async selectCollateralType(collateralText) {
        await this.searchButton(searchButtonType.COLLATERAL_TYPE).click()

        await this.searchResultLink(collateralText).waitForClickable()
        await browser.pause(1000)
        await this.searchResultLink(collateralText).click()
        await browser.pause(2000)
    }

    async selectAccount(accountName) {
        let searchAccount = await $("//span[text() = 'Account']/ancestor::table/tbody//div[contains(@class, 'ui-icon-search')]")
        await searchAccount.click()
        await this.searchResultLink(accountName).waitForClickable()
        await browser.pause(1000)
        await this.searchResultLink(accountName).click()
        await browser.pause(2000)
    }

    async editLoan(rateType = 'Fixed', loanPurpose = 'Goodwill', borrowerRating = 'A', repaymentFrequency = 'Monthly', repaymentType = 'Check all') {
        await this.goToApplicationTabWithText('Loan')
        await this.loanEditButton.click()
        await this.getElementWithAttribute('id', 'AppDetailTitleHeader', 'div').waitForDisplayed()
        await browser.pause(5000)
        await this.rateTypeDropdown.selectByAttribute('value', rateType)
        await this.selectLoanPurpose(loanPurpose)
        await this.selectBorrowerRating(borrowerRating)
        await this.repaymentFrequencyDropdown.selectByAttribute('value', repaymentFrequency)
        await this.repaymentTypeButton.click()
        await this.typeOption(repaymentType).click()
        await this.generatePricing.click()
        let pricingButton = await this.getElementWithAttribute('id', 'pricing-button', 'div')
        await pricingButton.waitForDisplayed({ timeout: 30000 })
        await pricingButton.click()

        let pricingCard = await this.getElementWithAttribute('id', 'pricingOptionCard', 'div')
        await pricingCard.waitForDisplayed({ timeout: 30000 })
        await pricingCard.click()

        await this.getElementContainingExactText('Yes', 'span').click()
        await this.getElementContainingExactText('Pricing option is selected successfully.').waitForDisplayed({ timeout: 30000 })

        await this.forceReload()
        await browser.pause(5000)
    }

    async addNewCollateral(accountOwnerName, securityName = 'Testname', street = 'Test Street', suburb = 'Test Suburb', postal = '888888') {
        await this.goToApplicationTabWithText('Collateral')
        await this.reloadIfElementNotPresent(this.getElementContainingExactText('Add New Collateral', 'span'), { timeoutSec: 15, retries: 2 })

        await this.getElementContainingExactText('Add New Collateral', 'span').click()
        await this.getElementWithAttribute('pagename', 'PledgeCollaterals', 'div').waitForDisplayed()
        await this.getElementContainingExactText('New Collateral', 'span').click()
        await browser.pause(1000)
        await this.nextButton(1).click()

        await this.selectCollateralType('Asset Finance')
        await this.nextButton(2).click()

        await this.collateralInfoField('Security Name').setValue(securityName)
        await this.collateralInfoField('Street').setValue(street)
        await this.collateralInfoField('Suburb').setValue(suburb)
        await this.collateralInfoField('Postal Code').setValue(postal)
        await this.nextButton(3).click()

        let addNewCollateralOwnerButton = await this.getElementWithAttribute('title', 'Add New Collateral Owner', 'i')
        await addNewCollateralOwnerButton.waitForDisplayed()
        await browser.pause(1000)
        await this.jsClick(addNewCollateralOwnerButton)
        await browser.pause(2000)
        await this.selectAccount(accountOwnerName)
        await this.ownershipPercentage.setValue('100')
        await this.nextButton(4).click()
        await browser.pause(2000)

        await this.getElementContainingExactText('Save', 'span').click()
        await this.waitUntilElementDisappears(await this.getElementContainingExactText('Save', 'span'), 30)
    }

    async addParties(accountName, relationship = 'Individual Relationship', partyType = 'GUARANTOR') {
        await this.goToApplicationTabWithText('Loan')

        //Switching to Parties Iframe from Accessibility title Iframe
        await (await this.getIframeWithAttribute('id', 'party-iframe')).waitForExist()
        await browser.switchToFrame(await this.getIframeWithAttribute('id', 'party-iframe'))
        await this.getElementContainingExactText('Parties', 'h1').waitForExist()
        await this.getElementWithAttribute('title', 'Add Parties', 'div').click()

        //Switch to accessibility title iframe
        await browser.switchToParentFrame()
        await this.getElementContainingExactText('Add Party', 'span').waitForDisplayed()

        //Switch to ui Iframe under Add Party Modal
        let uiIframe = await $("//div[@aria-describedby='top-level-dialog']//iframe")
        await browser.switchToFrame(uiIframe)

        //Select Party
        await this.getElementContainingExactText('Existing Relationship', 'span').waitForDisplayed()
        await this.getElementContainingExactText('Existing Relationship', 'span').click()
        await browser.pause(1000)
        await this.nextButton(1).click()

        //Relationship
        await this.getElementContainingExactText(relationship, 'span').click()
        await this.searchButton(searchButtonType.ACCOUNT).click()
        await this.getElementWithAttribute('placeholder', 'Search Accounts', 'input').waitForDisplayed()
        await this.getElementWithAttribute('placeholder', 'Search Accounts', 'input').setValue(accountName)
        await this.searchResultLink(accountName).waitForDisplayed()
        await browser.pause(1000)
        await this.searchResultLink(accountName).click()
        await this.nextButton(2).waitForDisplayed()
        await this.nextButton(2).click()

        //Relationship Info
        //Nothing to modify here
        await this.nextButton(3).waitForDisplayed()
        await this.nextButton(3).click()

        //Role
        await this.partyTypeButton.waitForDisplayed()
        await this.partyTypeButton.click()
        await this.typeOption(partyType).click()
        await this.getElementWithAttribute('class', 'ui-icon ui-icon-circle-close', 'span').click()
        await this.nextButton(4).click()

        //Employment and Income
        //Nothing to modify here
        await this.nextButton(5).waitForDisplayed()
        await this.nextButton(5).click()

        //Assets and Liabilities
        //Nothing to modify here
        var nextStepButton = await $("(//span[text() = 'Next Step']/parent::div)[2]")
        await nextStepButton.waitForDisplayed()
        await nextStepButton.click()

        //"Moving to final step" loading next page
        await browser.pause(5000)
        this.waitUntilElementDisappears(await this.getElementContainingExactText('Moving to final step'))

        //Concent
        let electronicConcent = await $("//div[text() = 'Electronic Consent']/parent::div/following-sibling::div/input")
        let creditCheckConcent = await $("//div[text() = 'Credit Check Consent']/parent::div/following-sibling::div/input")
        let saveButton = await $("//div[@role='button']/span[text()= 'Save']")
        await electronicConcent.click()
        await creditCheckConcent.click()
        await saveButton.click()

        //Waiting for Party to be saved
        this.waitUntilElementDisappears(await this.getElementContainingExactText('Saving Party'))

        //Switch to Accessibility Title Iframe
        await browser.switchToParentFrame()
    }

    async addCreditApprovalConditions(approvalCondition = 'Demo approval condition', conditionIndex = 1) {
        await this.goToApplicationTabWithText('Credit')
        await this.goToApplicationTabWithText('Add Settlement Conditions')
        await browser.pause(2000)
        await this.goToApplicationTabWithText('Add Approval Conditions')

        //the (+) button
        let addNewQuestionButton = await this.addNewQuestionButton(1)

        // save button visibility check after clicking addNewQuestionButton
        await this.retryStrategy.retry(
            // Main method
            async () => {
                await addNewQuestionButton.waitForDisplayed({ timeout: 25000 })
                await addNewQuestionButton.click()
                await this.saveNewButton.waitForDisplayed({ timeout: 10000 })
            },

            // Before method
            async () => {
                await this.goToApplicationTabWithText('Credit')
                await browser.pause(2000)
                await this.goToApplicationTabWithText('Add Settlement Conditions')
                await browser.pause(2000)
                await this.goToApplicationTabWithText('Add Approval Conditions')
            },

            // After method
            async () => {
                this.forceReload()
            },

            // Number of retries
            3
        )

        //the input field
        let approvalConditionTextbox = await $("(//span[text()='Condition Statement']/ancestor::thead/following-sibling::tbody//textarea)[1]")
        await approvalConditionTextbox.waitForDisplayed()
        await approvalConditionTextbox.setValue(approvalCondition)

        //the save button
        await this.saveNewButton.click()

        //predefined condition
        await this.waitUntilElementDisappears(await this.getElementContainingExactText('Adding approval condition'), 40)
        await this.getElementContainingExactText('Pre-defined approval conditions', 'span').waitForClickable()
        await this.getElementContainingExactText('Pre-defined approval conditions', 'span').click()
        await this.approvalConditionCheckBox(conditionIndex).waitForClickable()
        await this.approvalConditionCheckBox(conditionIndex).click()
        await this.getElementContainingExactText('Add Conditions', 'div').waitForClickable()
        await this.getElementContainingExactText('Add Conditions', 'div').click()

    }
    async addCreditSettlementConditions(approvalCondition = 'Demo Settlement condition', conditionIndex = 1) {
        await this.goToApplicationTabWithText('Credit')
        await this.goToApplicationTabWithText('Add Approval Conditions')
        await browser.pause(2000)
        await this.goToApplicationTabWithText('Add Settlement Conditions')

        //the (+) button
        let addNewQuestionButton = await this.addNewQuestionButton(2)

        // save button visibility check after clicking addNewQuestionButton
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
                await this.goToApplicationTabWithText('Credit')
                await browser.pause(2000)
                await this.goToApplicationTabWithText('Add Approval Conditions')
                await browser.pause(2000)
                await this.goToApplicationTabWithText('Add Settlement Conditions')
            },

            // After method
            async () => {
                this.forceReload()
            },

            // Number of retries
            3
        )

        //the input field
        let settlementConditionTextbox = await $("(//span[text()='Condition Statement']/ancestor::thead/following-sibling::tbody//textarea)[1]")
        await settlementConditionTextbox.waitForDisplayed()
        await settlementConditionTextbox.setValue(approvalCondition)

        //the save button
        await this.saveNewButton.click()

        //predefined condition
        await this.waitUntilElementDisappears(await this.getElementContainingExactText('Adding approval condition'), 40)
        await this.getElementContainingExactText('Pre-defined settlement conditions', 'span').waitForClickable()
        await this.getElementContainingExactText('Pre-defined settlement conditions', 'span').click()
        await this.settlementConditionCheckBox(conditionIndex).waitForDisplayed()
        await this.settlementConditionCheckBox(conditionIndex).click()
        await browser.pause(2000)
        await this.getElementContainingExactText('Add conditions', 'div').click()
        await this.waitUntilElementDisappears(this.getElementContainingExactText('Adding settlement condition'))
    }

    async addTaskList(){
        await this.getElementWithAttribute('id', 'manage-stages', 'div').click()
        await this.taskHamburgerButtonWithText('Origination').waitForClickable()
        await this.taskHamburgerButtonWithText('Origination').click()
        await this.formCheckBoxWithText('Privacy form sent to Borrower').waitForClickable()
        await this.formCheckBoxWithText('Privacy form sent to Borrower').click()
        await this.formCheckBoxWithText('Application Form Sent to Borrower').waitForClickable()
        await this.formCheckBoxWithText('Application Form Sent to Borrower').click()
    }

    async newComment(){
        await this.goToApplicationTabWithText('Credit')
        await this.goToApplicationTabWithText('Credit Comment')
        await this.getElementContainingExactText('New Comment', 'span').waitForClickable()
        await this.getElementContainingExactText('New Comment', 'span').click()
    }

    async acceptAndOpenApplicationWithId(applicationId){
        await this.searchApplicationWithId(applicationId)
        await browser.pause(3000)
        await $('//a[@title="APP-0000001499"]/../../preceding-sibling::td[@class="slds-cell-edit cellContainer"]').waitForClickable()
        await $('//a[@title="APP-0000001499"]/../../preceding-sibling::td[@class="slds-cell-edit cellContainer"]').click()
        await this.getElementContainingExactText('Accept Application')
        await browser.pause(3000)
        await this.getElementContainingExactText(`${applicationId}`, 'a').click()
        await (await this.getIframeWithAttribute('title', "accessibility title")).waitForExist({ timeout: 30000 })
        await browser.switchToFrame(await this.getIframeWithAttribute('title', "accessibility title"))
        await this.reloadIfElementNotPresent(await this.getElementContainingExactText(applicationId, 'div'))
    }

    async creditEvaluation(){
        await this.getElementWithAttribute('id', 'manage-stages', 'div').click()
        await this.taskHamburgerButtonWithText('Credit Evaluation').waitForClickable()
        await this.taskHamburgerButtonWithText('Credit Evaluation').click()
        await browser.pause(3000)
        await this.formCheckBoxWithText('Credit Assessment Completed').waitForClickable()
        await this.formCheckBoxWithText('Credit Assessment Completed').click()
        await $('//span[text()="Save Task"]/preceding-sibling::span').waitForDisplayed()
        await $('//span[text()="Save Task"]/preceding-sibling::span').click()

    }

    async creditApproval(){
        await this.goToApplicationTabWithText('Approvals')
        await browser.pause(3000)
        await (await this.getIframeWithAttribute('id', "approval-dashboard-iframe")).waitForExist({ timeout: 30000 })
        await browser.switchToFrame(await this.getIframeWithAttribute('id', "approval-dashboard-iframe"))
        await browser.pause(3000)
        await this.getElementWithAttribute('class', 'sk-icon fa-edit  inline nx-skootable-buttonicon-visible', 'i').waitForDisplayed()
        await this.getElementWithAttribute('class', 'sk-icon fa-edit  inline nx-skootable-buttonicon-visible', 'i').click()
        await this.getElementWithAttribute('class', 'sk-icon fa-external-link  inline nx-skootable-buttonicon-visible', 'i').waitForDisplayed()
        await this.getElementWithAttribute('class', 'sk-icon fa-external-link  inline nx-skootable-buttonicon-visible', 'i').click()
        await browser.pause(5000)
        await browser.switchToParentFrame()
        let reviewCommentIframe = await $("//iframe[contains(@src, 'page=ApprovalReview')]")
        await reviewCommentIframe.waitForExist({ timeout: 30000 })
        await browser.switchToFrame(reviewCommentIframe)
        await $('//div[text()="Review Comments"]/../../following-sibling::div//textarea').waitForDisplayed()
        await $('//div[text()="Review Comments"]/../../following-sibling::div//textarea').setValue('Approved')
        await browser.pause(2000)
        // await this.getElementContainingExactText('Approve', 'span').waitForClickable()
        // await this.getElementContainingExactText('Approve', 'span').click()
        // await this.getElementWithAttribute('class', 'ui-button-icon-primary ui-icon fa-check-square-o sk-icon inline', 'span')
        await $('//span[@class="ui-button-icon-primary ui-icon fa-check-square-o sk-icon inline"]/..').waitForClickable()
        await $('//span[@class="ui-button-icon-primary ui-icon fa-check-square-o sk-icon inline"]/..').click()
    }
}

const searchButtonType = {
    LOAN_PURPOSE: 'Loan Purpose',
    BORROWER_RATING: 'Borrower Rating',
    COLLATERAL_TYPE: 'Collateral Type',
    ACCOUNT: 'Account'
}

export default new Application()

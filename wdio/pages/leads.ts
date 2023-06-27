import SalesForce from "./_salesforce"

class LeadsPage extends SalesForce {
    get createLeadButton() { return $("//a/div[@title='New']") }
    get salutationDropown() { return $("//label[contains(text(), 'Salutation')]/following-sibling::div") }
    get firstNameField() { return $("//input[@name='firstName']") }
    get lastNameField() { return $("//input[@name='lastName']") }
    get genderDropdown() { return $("//button[contains(@aria-label, 'Gender')]") }
    get borrowingInterestDropdown() { return $("//button[@aria-label='Borrowing Interest, --None--']") }
    get mobilePhoneField() { return $("//input[@name='MobilePhone']") }
    get emailField() { return $("//input[@name='Email']") }
    get stateProvinceInput() { return $("//input[@aria-label='State/Province']") }
    get newSouthWalesOption() { return $("//span[@title='New South Wales']/ancestor::lightning-base-combobox-item") }
    get leadOriginationDropdown() { return $("//button[@aria-label='Lead Origination, --None--']") }
    get leadCategoryDropdown() { return $("//button[@aria-label='Lead Category, --None--']") }
    get employmentStatusDropdown() { return $("//button[@aria-label='Employment Status, --None--']") }
    get professionDropdown() { return $("//button[@aria-label='Profession, --None--']") }
    get aphraNumberField() { return $("//input[@name='Aphra_Number__c']") }
    get pardotCommentsField() { return $("//label[contains(text(), 'Pardot Comments')]/following-sibling::div/textarea") }
    get saveEditButton() { return $("//button[@name='SaveEdit']") }
    get markAsCurrentStatusButton() { return $("//span[contains(text(), 'Mark as Current Status')]") }
    get markStatusAsCompleteButton() { return $("//span[contains(text(), 'Mark Status as Complete')]") }
    get selectConvertedStatusButton() { return $("//span[contains(text(), 'Select Converted Status')]") }
    get convertLeadPopupHeading() { return $("//h2[contains(text(), 'Convert Lead ')]") }
    get convertLeadPopupConvertButton() { return $("//button[contains(text(), 'Convert')]") }

    getleadStatusButton(leadStatus: string) { return $(`//span[text() = '${leadStatus}']`) }
    getSalutationOption(salutation: string) { return $(`//span[@title='${salutation}']/ancestor::lightning-base-combobox-item`) }
    getGenderOption(gender: string) { return $(`//span[@title='${gender}']/ancestor::lightning-base-combobox-item`) }
    getStateOption(state: string) { return $(`//span[@title='${state}']/ancestor::lightning-base-combobox-item`) }
    getPersonAccountLink(fullName: string) { return $(`//a[contains(text(), '${fullName}')]`) }
    getPersonOpportunityLink(fullName: string) { return $(`//a[contains(text(), '${fullName}-')]`) }

    async getRandomInt(max = 10): Promise<number> {
        return Math.floor(Math.random() * max)
      }
      
      async createNewLead({ firstName, lastName, email, salutation = 'Mr.', gender = 'Male', mobile = '', state = 'New South Wales' }: {
        firstName: string;
        lastName: string;
        email: string;
        salutation?: string;
        gender?: string;
        mobile?: string;
        state?: string;
      }): Promise<void> {
        let rndMobile = mobile;
        if (rndMobile === '') {
          const num = [4];
          for (let i = 1; i <= 8; ++i) {
            num.push(await this.getRandomInt())
          }
          rndMobile = num.join('')
        }
      
        await this.createLeadButton.click()
      
        await this.salutationDropown.click()
        await this.getSalutationOption(salutation).click()
      
        await this.firstNameField.setValue(firstName)
        await this.lastNameField.setValue(lastName)
      
        await this.jsClick(await this.genderDropdown)
        await this.getGenderOption(gender).click()
      
        await this.mobilePhoneField.setValue(await rndMobile)
        await this.emailField.setValue(email)
      
        await this.dropDownLazySelect(await this.borrowingInterestDropdown)
      
        await this.jsClick(await this.stateProvinceInput)
        await this.getStateOption(state).click()
      
        await this.dropDownLazySelect(await this.leadOriginationDropdown)
        await this.dropDownLazySelect(await this.leadCategoryDropdown)
        await this.dropDownLazySelect(await this.employmentStatusDropdown)
        await this.dropDownLazySelect(await this.professionDropdown)
      
        await this.aphraNumberField.setValue('abc123')
        await this.pardotCommentsField.setValue('No comments')
        await this.saveEditButton.click()
      
        const nameHeadingText = await $(`//lightning-formatted-name[contains(text(), '${firstName} ${lastName}')]`)
        await nameHeadingText.waitForExist({ timeout: 20000, timeoutMsg: `Element: //lightning-formatted-name[contains(text(), '${firstName} ${lastName}')] not found` })
      }
      
      async changeLeadStatus(leadStatus: string): Promise<void> {
        await browser.pause(4000)
        await this.jsClick(await this.getleadStatusButton(leadStatus))
        await browser.pause(4000)
        switch (leadStatus) {
          case 'New':
            await this.jsClick(await this.markStatusAsCompleteButton)
            break;
          case 'Converted':
            await this.jsClick(await this.selectConvertedStatusButton)
            break;
          default:
            await this.jsClick(await this.markAsCurrentStatusButton)
        }
      }
      
      async convertLead(): Promise<void> {
        await this.convertLeadPopupHeading.waitForDisplayed({ timeout: 15000 })
        await browser.pause(2000)
        await this.convertLeadPopupConvertButton.click()
      }
      
      async goToCreatedAccount(fullName: string): Promise<void> {
        await (await this.getElementContainingExactText('Your lead has been converted')).waitForDisplayed({ timeout: 40000, timeoutMsg: "Element with text: 'Your lead has been converted' was not found after 40 seconds." })
        await this.getPersonAccountLink(fullName).click()
      }      
}


export default new LeadsPage()
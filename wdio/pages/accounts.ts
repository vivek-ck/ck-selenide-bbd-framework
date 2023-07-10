import SalesForce from "./_salesforce";

class Account extends SalesForce {
    get accountSearchField() { return $("//input[@name='Account-search-input']") }
    get editBirthdateButton() { return $("//button[@title='Edit Birthdate']") }
    get saveEditButton() { return $("//button[text()='Save']") }
    get birthdateField() { return $("//input[@name='PersonBirthdate']") }
    get ageRangeDropdown() { return $("//button[@aria-label='Age Range, --None--']") }

    async searchAccount(name: string) {
        await this.accountSearchField.setValue(name + '\n')
    }

    async openAccountWithName(name: string) {
        await this.searchAccount(name)
        await browser.pause(2000)
        await (await this.getElementContainingExactText(name, 'a')).click()
    }

    async editBirthDate(date: string) {
        await this.jsClick(await this.editBirthdateButton)
        await this.saveEditButton.waitForExist({ timeout: 20000 })
        await this.birthdateField.setValue(date)
        await browser.pause(1000)
        await this.dropDownLazySelect(await this.ageRangeDropdown)
        await browser.pause(2000)
        await this.jsClick(await this.saveEditButton)
        await browser.pause(4000)
    }
}

export default new Account()
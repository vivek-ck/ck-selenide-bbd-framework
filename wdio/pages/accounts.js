import SalesForce from "./_salesforce.js";

class Account extends SalesForce {

    get accountSearchField() { return $("//input[@name='Account-search-input']") }
    get editBirthdateButton() { return $("//button[@title='Edit Birthdate']") }
    get saveEditButton() { return $("//button[text()='Save']") }
    get birthdateField() { return $("//input[@name='PersonBirthdate']") }
    get ageRangeDropdown() { return $("//button[@aria-label='Age Range, --None--']") }

    async searchAccount(name) {
        await this.accountSearchField.setValue(name+'\n');
    }

    async openAccountWithName(name) {
        await this.searchAccount(name);
        await browser.pause(2000);
        await this.getElementContainingExactText(name, 'a').click();
    }

    async editBirthDate(date) {
        await this.jsClick(await this.editBirthdateButton);
        await this.saveEditButton.waitForExist({timeout: 20000});
        await this.birthdateField.setValue(date);
        await this.dropDownLazySelect(this.ageRangeDropdown);
        await this.jsClick(this.saveEditButton);
    }
}

export default new Account();
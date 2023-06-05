import SalesForce from "./_SalesForce.js";

class LeadsPage extends SalesForce {
    get createLeadButton() { return $("//a/div[@title='New']") }
    get salutationDropown() { return $("//label[contains(text(), 'Salutation')]/following-sibling::div") }
    get firstNameField() { return $("//input[@name='firstName']") }
    get lastNameField() { return $("//input[@name='lastName']") }
    get genderDropDown() { return $("//button[contains(@aria-label, 'Gender')]"); }
    get borrowingInterestDropdown() { return $("//button[@aria-label='Borrowing Interest, --None--']"); }
    get mobilePhoneField() { return $("//input[@name='MobilePhone']"); }
    get emailField() { return $("//input[@name='Email']"); }
    get stateProvinceInput() { return $("//input[@aria-label='State/Province']"); }
    get newSouthWalesOption() { return $("//span[@title='New South Wales']/ancestor::lightning-base-combobox-item"); }
    get leadOriginationDropdown() { return $("//button[@aria-label='Lead Origination, --None--']"); }
    get leadCategoryDropdown() { return $("//button[@aria-label='Lead Category, --None--']"); }
    get employmentStatusDropdown() { return $("//button[@aria-label='Employment Status, --None--']"); }
    get professionDropdown() { return $("//button[@aria-label='Profession, --None--']"); }
    get aphraNumberField() { return $("//input[@name='Aphra_Number__c']"); }
    get pardotCommentsField() { return $("//label[contains(text(), 'Pardot Comments')]/following-sibling::div/textarea"); }
    get saveEditButton() { return $("//button[@name='SaveEdit']"); }


    async createNewLead({firstName, lastName, email, salutation = 'Mr.', gender = 'Male', mobile = '478456345', state = 'New South Wales'}) {
        await this.createLeadButton.click();

        await this.salutationDropown.click();
        var salutationOption = await $(`//span[@title='${salutation}']/ancestor::lightning-base-combobox-item`);
        await salutationOption.click();

        await this.firstNameField.setValue(firstName);
        await this.lastNameField.setValue(lastName);

        await this.executeClick(this.genderDropDown);
        var genderOption = await $(`//span[@title='${gender}']/ancestor::lightning-base-combobox-item`)
        await genderOption.click();

        await this.mobilePhoneField.setValue(mobile);
        await this.emailField.setValue(email);

        await this.dropDownLazySelect(this.borrowingInterestDropdown);

        await this.executeClick(this.stateProvinceInput);
        var stateOption = await $(`//span[@title='${state}']/ancestor::lightning-base-combobox-item`);
        await stateOption.click();

        await this.dropDownLazySelect(this.leadOriginationDropdown);
        await this.dropDownLazySelect(this.leadCategoryDropdown);
        await this.dropDownLazySelect(this.employmentStatusDropdown);
        await this.dropDownLazySelect(this.professionDropdown);

        await this.aphraNumberField.setValue("abc123");
        await this.pardotCommentsField.setValue("No comments");
        await this.saveEditButton.click();
    }
}


export default new LeadsPage();
package com.cloudkaptan.webPages.SalesForce.Pages;

import org.openqa.selenium.Keys;
import org.openqa.selenium.support.FindBy;

import com.codeborne.selenide.Condition;
import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.*;

import java.time.Duration;

public class LeadsPage extends SalesForceBasePage {

    @FindBy(xpath = "//a/div[@title='New']")
    private SelenideElement newLead;

    @FindBy(xpath = "//div/h2[contains(text(), 'New Lead')]")
    private SelenideElement leadModalHeader;

    @FindBy(xpath = "//label[contains(text(), 'Salutation')]/following-sibling::div")
    private SelenideElement salutationDropbox;

    @FindBy(xpath = "//input[@name='firstName']")
    private SelenideElement firstName;

    @FindBy(xpath = "//input[@name='middleName']")
    private SelenideElement middleName;

    @FindBy(xpath = "//input[@name='lastName']")
    private SelenideElement lastName;

    @FindBy(xpath = "//input[@name='Company']")
    private SelenideElement companyName;

    @FindBy(xpath = "//input[@placeholder='Search Address']")
    private SelenideElement searchAddressText;

    @FindBy(xpath = "//button[@name='SaveEdit']")
    private SelenideElement saveLoanButton;

    @FindBy(xpath = "//input[@name='Lead-search-input']")
    private SelenideElement leadSearchBox;

    private String salutationValues = "//span[@title='%s']/ancestor::lightning-base-combobox-item";
    private String addressSearchValue = "//lightning-base-combobox-formatted-text[@title='%s']/..";
    private String leadSearchResults = "//table[@role='grid']/tbody/tr";

    public LeadsPage initiateLead() {
        newLead.click();
        leadModalHeader.shouldBe(Condition.visible, Duration.ofSeconds(5));
        return page(this.getClass());
    }

    public LeadsPage createLoan(String salutationString, String lastNameString, String companyNameString, String addressString) {
        salutationDropbox.click();
        $x(String.format(salutationValues, salutationString)).should(Condition.appear, Duration.ofSeconds(2)).click();
        lastName.setValue(lastNameString);
        companyName.setValue(companyNameString);
        // searchAddressText.setValue(addressString);
        // $x(String.format(addressSearchValue, addressString)).click();
        saveLoanButton.click();
        return page(this.getClass());
    }

    public LeadsPage validateLeads(String lastNameString) {
        leadSearchBox.setValue(lastNameString);
        leadSearchBox.sendKeys(Keys.ENTER);
        Selenide.sleep(2000);
        $x(leadSearchResults).shouldBe(Condition.visible, Duration.ofSeconds(5));
        return page(this.getClass());
    }
}

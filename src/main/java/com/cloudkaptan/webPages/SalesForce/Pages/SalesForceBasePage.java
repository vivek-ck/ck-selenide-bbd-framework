package com.cloudkaptan.webPages.SalesForce.Pages;

import org.openqa.selenium.support.FindBy;

import com.cloudkaptan.base.BasePage;
import com.codeborne.selenide.ClickOptions;
import com.codeborne.selenide.SelenideElement;
import static com.codeborne.selenide.Selenide.*;


public class SalesForceBasePage extends BasePage{
    
    @FindBy(xpath = "//a[@title='Leads']/span")
	private SelenideElement leadsTab;

    public LeadsPage clickOnLeadsTab() {
        leadsTab.click(ClickOptions.usingJavaScript());
        return page(LeadsPage.class);
    }
}

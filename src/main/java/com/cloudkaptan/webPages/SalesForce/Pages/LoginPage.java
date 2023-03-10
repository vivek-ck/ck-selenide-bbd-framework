package com.cloudkaptan.webPages.SalesForce.Pages;

import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

import com.cloudkaptan.base.BasePage;
import com.codeborne.selenide.Condition;
import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.*;

import java.time.Duration;

public class LoginPage extends BasePage{
    
    @FindBy(how = How.CSS, using = "[alt=Salesforce]")
	SelenideElement salesforceLogo;

	@FindBy(how = How.CSS, using = "input.username")
	SelenideElement userNameText;

	@FindBy(how = How.CSS, using = "input.password")
	SelenideElement passwordText;

	@FindBy(how = How.CSS, using = "#Login")
	SelenideElement loginButton;

	@FindBy(how = How.CSS, using = "#rememberUn")
	SelenideElement rememberMeCheckBox;

	@FindBy(how = How.CSS, using = "#forgot_password_link")
	SelenideElement forgotYourPasswordLink;

	@FindBy(how = How.XPATH, using = "//span[normalize-space()='Home']")
	SelenideElement homeTab;

    public HomePage login(String uName, String pwdText) {
        salesforceLogo.shouldBe(Condition.visible, Duration.ofSeconds(10));
		userNameText.setValue(uName);
		passwordText.setValue(pwdText);
		loginButton.click();
        return page(HomePage.class);
    }
}

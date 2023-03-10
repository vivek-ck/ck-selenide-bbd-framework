package com.cloudkaptan.webPages.SalesForce.Pages;

import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;

import com.codeborne.selenide.SelenideElement;

public class HomePage extends SalesForceBasePage{
    
    @FindBy(how = How.XPATH, using = "//iframe[@title='Visualforce Page component container']")
	private SelenideElement visualForcePageComponentContainerIframe;

    @FindBy(how = How.XPATH, using = "//h1[contains(text(), 'Welcome to your Online Portal')]")
    private SelenideElement welcomeToOnlinePortalText;

    @FindBy(how = How.XPATH, using = "//button[@data-style-action-name = 'dealerQuickLinkInitiateApplication']")
	private SelenideElement initiateApplicationButton;

    @FindBy(how = How.XPATH, using = "//button[@data-style-action-name = 'dealerQuickLinkLoans']")
	private SelenideElement viewLoansButton;

    @FindBy(how = How.XPATH, using = "//button[@data-style-action-name = 'dealerQuickLinkApplications']")
	private SelenideElement viewApplicationsButton;

    @FindBy(how = How.XPATH, using = "//div[@data-style-actor-name = 'dealerNewExistingApplicantSelectionOverlayContainer']")
	private SelenideElement applicationDetailsModal;

    @FindBy(how = How.XPATH, using = "//div[@data-style-field-name='LoanAmount']//input")
	private SelenideElement loanAmountTextBox;

    @FindBy(how = How.XPATH, using = "//div[@data-style-field-name='Query']//input")
	private SelenideElement growerNameTextBox;

    @FindBy(how = How.XPATH, using = "//button[@data-style-action-name = 'dealerSearchGrowerBtn']")
	private SelenideElement searchGrowerButton;

    @FindBy(how = How.XPATH, using = "//table[@class='MuiTable-root']/tbody/tr")
	private SelenideElement growerSearchResult;

    @FindBy(how = How.XPATH, using = "//span[contains(text(), 'Next')]//ancestor::button")
    private SelenideElement nextButton;

    @FindBy(how = How.XPATH, using = "//div[@class='loading-full-screen']")
    private SelenideElement loadingCircle;

    @FindBy(how = How.XPATH, using = "//span[contains(text(), 'account_circle')]")
    private SelenideElement accountButton;
    
    @FindBy(how = How.XPATH, using = "//span[contains(text(), 'Logout')]")
    private SelenideElement logOutButton;
}

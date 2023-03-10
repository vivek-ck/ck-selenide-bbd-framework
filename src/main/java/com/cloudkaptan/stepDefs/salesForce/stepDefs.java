package com.cloudkaptan.stepDefs.salesForce;

import java.io.IOException;

import io.cucumber.cienvironment.internal.com.eclipsesource.json.ParseException;
import io.cucumber.java.en.*;
import static com.codeborne.selenide.Selenide.*;
import static com.cloudkaptan.webPages.SalesForce.PageManager.*;

public class stepDefs {

    @Given("SalesForce login page is opened")
    public void openSalesForceLink() {
        open("https://cloudkaptan4.my.salesforce.com/");
    }

    @Then("Login with username {string} and password {string}")
    public void login(String name, String pwd) {
        loginPage().login(name, pwd);
    }

    @And("Go to Leads page")
    public void goToLeadsPage() {
        salesForceBasePage().clickOnLeadsTab();
    }

    @Then("^Create new lead with Salutation \"(.*)\", LastName \"(.*)\", Company \"(.*)\", and Address \"(.*)\"$")
	public void createLead(String salutation, String lastName, String company, String address)
			throws ClassNotFoundException, IOException, ParseException {
        leadsPage().createLoan(salutation, lastName, company, address);
	}

    @Then("Validate Lead with Name {string} is pressent")
    public void validateCreatedLead(String lastName) {
        leadsPage().validateLeads(lastName);
    }
}

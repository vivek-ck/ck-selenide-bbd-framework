package com.cloudkaptan.stepDefs.salesForce;

import java.io.IOException;

import com.codeborne.selenide.Selenide;

import io.cucumber.cienvironment.internal.com.eclipsesource.json.ParseException;
import io.cucumber.java.en.*;
import static com.codeborne.selenide.Selenide.*;
import static com.cloudkaptan.webPages.SalesForce.PageManager.*;

public class stepDefs {

    @Given("the SalesForce login page is opened")
    public void openSalesForceLink() {
        open("https://cloudkaptanconsultancyse-3f-dev-ed.lightning.force.com/lightning/page/home");
    }

    @Then("the user logs in with username {string} and password {string}")
    public void login(String name, String pwd) {
        loginPage().login(name, pwd);
    }

    @And("the user navigates to the Leads page")
    public void goToLeadsPage() {
        salesForceBasePage().clickOnLeadsTab();
    }

    @Then("^the user creates new lead with Salutation \"(.*)\", LastName \"(.*)\", Company \"(.*)\", and Address \"(.*)\"$")
    public void createLead(String salutation, String lastName, String company, String address)
            throws ClassNotFoundException, IOException, ParseException {
        leadsPage().initiateLead().createLead(salutation, lastName, company, address);
    }

    @Then("the Lead with name {string} should be present in the Leads list")
    public void validateCreatedLead(String lastName) {
        Selenide.sleep(2000);
        salesForceBasePage().clickOnLeadsTab();
        Selenide.sleep(2000);
        leadsPage().validateLeads(lastName);
    }
}

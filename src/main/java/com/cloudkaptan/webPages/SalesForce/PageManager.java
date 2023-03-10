package com.cloudkaptan.webPages.SalesForce;

import static com.codeborne.selenide.Selenide.*;

import com.cloudkaptan.webPages.SalesForce.Pages.HomePage;
import com.cloudkaptan.webPages.SalesForce.Pages.LeadsPage;
import com.cloudkaptan.webPages.SalesForce.Pages.LoginPage;
import com.cloudkaptan.webPages.SalesForce.Pages.SalesForceBasePage;

public class PageManager {

    public PageManager() {}

    public static SalesForceBasePage salesForceBasePage() {
        return page(SalesForceBasePage.class);
    }

    public static HomePage homePage() {
        return page(HomePage.class);
    }

    public static LoginPage loginPage() {
        return page(LoginPage.class);
    }

    public static LeadsPage leadsPage() {
        return page(LeadsPage.class);
    }
}

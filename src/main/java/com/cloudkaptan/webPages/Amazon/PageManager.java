package com.cloudkaptan.webPages.Amazon;

import static com.codeborne.selenide.Selenide.*;

import com.cloudkaptan.webPages.Amazon.Pages.AmazonBasePage;
import com.cloudkaptan.webPages.Amazon.Pages.CartPage;
import com.cloudkaptan.webPages.Amazon.Pages.HomePage;
import com.cloudkaptan.webPages.Amazon.Pages.ProductPage;
import com.cloudkaptan.webPages.Amazon.Pages.SearchResultPage;

public class PageManager {

    public PageManager() {}

    public static AmazonBasePage amazonBasePage() {
        return page(AmazonBasePage.class);
    }

    public static HomePage homePage() {
        return page(HomePage.class);
    }

    public static ProductPage productPage() {
        return page(ProductPage.class);
    }

    public static SearchResultPage searchResultPage() {
        return page(SearchResultPage.class);
    }

    public static CartPage cartPage() {
        return page(CartPage.class);
    }
}

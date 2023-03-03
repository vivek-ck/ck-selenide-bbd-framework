package com.cloudkaptan;

import com.cloudkaptan.webPages.Amazon.AmazonBasePage;
import com.cloudkaptan.webPages.Amazon.CartPage;
import com.cloudkaptan.webPages.Amazon.HomePage;
import com.cloudkaptan.webPages.Amazon.ProductPage;
import com.cloudkaptan.webPages.Amazon.SearchResultPage;

import static com.codeborne.selenide.Selenide.*;

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

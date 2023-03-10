package com.cloudkaptan.webPages.Amazon.Pages;

import static com.codeborne.selenide.Selenide.*;


public class SearchResultPage extends AmazonBasePage{

    private String searchItemNameSpan = "//span[@data-component-type='s-search-results']//span[contains(text(), '%s')]";

    public ProductPage clickOnProductContainingText(String productString) {
        $x(String.format(searchItemNameSpan, productString)).click();
        switchTo().window(1);
        return page(ProductPage.class);
    }
}
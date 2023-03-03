package com.cloudkaptan.webPages.Amazon;

import com.cloudkaptan.base.BasePage;
import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Selenide.*;

import org.openqa.selenium.Keys;
import org.openqa.selenium.Platform;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;

public class SearchResultPage extends AmazonBasePage{

    private String searchItemNameSpan = "//span[@data-component-type='s-search-results']//span[contains(text(), '%s')]";

    public ProductPage clickOnProductContainingText(String productString) {
        $x(String.format(searchItemNameSpan, productString)).click();
        switchTo().window(1);
        return page(ProductPage.class);
    }
}
package com.cloudkaptan.webPages.Amazon.Pages;
import org.openqa.selenium.support.FindBy;

import com.cloudkaptan.base.BasePage;
import com.codeborne.selenide.SelenideElement;
import static com.codeborne.selenide.Selenide.*;

public class AmazonBasePage extends BasePage{

    @FindBy(xpath = "//input[@id='twotabsearchtextbox']")
    private SelenideElement searchBox;

    @FindBy(xpath = "//input[@id='nav-search-submit-button']")
    private SelenideElement searchButton;

    @FindBy(xpath = "//div[@id='nav-cart-count-container']")
    private SelenideElement cartButton;

    public SearchResultPage searchProduct(String searchString) {
        searchBox.setValue(searchString);
        searchButton.click();
        return page(SearchResultPage.class);
    }

    public CartPage viewCart() {
        cartButton.click();
        return(page(CartPage.class));
    }
}

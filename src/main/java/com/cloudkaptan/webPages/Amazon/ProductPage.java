package com.cloudkaptan.webPages.Amazon;

import org.openqa.selenium.support.FindBy;

import com.codeborne.selenide.SelenideElement;
import static com.codeborne.selenide.Selenide.*;

public class ProductPage extends AmazonBasePage{

    private String searchItemNameSpan = "//span[contains(text(), '%s')]/parent::h1";

    @FindBy(xpath = "//span[@id='submit.add-to-cart']")
    private SelenideElement addToCartButton;

    public ProductPage addToCart() {
        addToCartButton.click();
        return page(ProductPage.class);
    }
}

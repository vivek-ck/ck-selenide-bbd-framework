package com.cloudkaptan.webPages.Amazon;

import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.support.FindBy;

public class CartPage extends AmazonBasePage{

    @FindBy(xpath = "//span[@id='sc-buy-box-ptc-button']")
    private SelenideElement proceedToBuyButton;

    @FindBy(xpath = "//div[@data-name='Subtotals']")
    private SelenideElement subTotalValue;

    private String cartItems = "//div[@class='sc-list-item-content']/descendant::span[contains(text(), '%s')]";

    public void getSubTotal() {
        String subTotal = subTotalValue.getText();
        System.out.println(subTotal);
    }
}

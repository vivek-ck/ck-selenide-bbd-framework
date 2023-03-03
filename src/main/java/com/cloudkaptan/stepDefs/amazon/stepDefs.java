package com.cloudkaptan.stepDefs.amazon;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;

import static com.codeborne.selenide.Selenide.*;
import static com.cloudkaptan.PageManager.*;


public class stepDefs {

    @Given("We open link {string}")
    public void we_open(String url) {
        open(url);
    }

    @And("/^We search for (.*)$/")
    public void we_search_for(String productName) {
        amazonBasePage().searchProduct(productName);
    }

    @And("/^We open the result that contains (.*)$/")
    public void we_open_the_result_that_contains(String productName) {
        searchResultPage().clickOnProductContainingText(productName);
    }

    @And("We proceed to add the product to cart")
    public void we_proceed_to_add_the_product_to_cart() {
        productPage().addToCart();
    }

    @And("We open the cart")
    public void we_open_the_cart() {
        amazonBasePage().viewCart();
    }

    @Then("We can see the product and the sub-total price")
    public void we_can_see_the_product_and_the_subtotal_price() {
        cartPage().getSubTotal();
    }
}

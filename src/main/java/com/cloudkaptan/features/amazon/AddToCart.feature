Feature: Adding an Item to a cart

    Scenario Outline: Scenario Number One
        Given We open link "https://www.amazon.in/"
        And We search for <Book>
        And We open the result that contains <Book>
        And We proceed to add the product to cart
        And We open the cart
        Then We can see the product and the sub-total price

        Examples:
        |Book|
        |Knowledge Encyclopedia - Human Body|
        |Mistborn|
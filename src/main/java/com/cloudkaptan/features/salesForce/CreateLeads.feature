Feature: Salesforce user must be able to login to the application and create Leads

  Scenario Outline: Login to SalesForce application and create Leads
    Given the SalesForce login page is opened
    When the user logs in with username "saikat@cloudkaptan.com" and password "Welcome123"
    And the user navigates to the Leads page
    And the user creates new lead with Salutation "<salutation>", LastName "<lastName>", Company "<company>", and Address "<address>"
    Then the Lead with name "<lastName>" should be present in the Leads list

    Examples: 
      | salutation | lastName | company  | address |
      | Mr.        | test0006 | company1 | Kolkata |
      | Ms.        | test0007 | company2 | Delhi   |
      | Mrs.       | test0008 | company1 | Tokyo   |
      | Dr.        | test0009 | company2 | Okinawa |
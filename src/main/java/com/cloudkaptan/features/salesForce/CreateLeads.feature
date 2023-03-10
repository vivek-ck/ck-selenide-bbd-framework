#Author: Vivek Biswas
#Created: 10-March-2023
Feature: Salesforce user must be able to login to the application/domain and create Leads

  Scenario Outline: Login to SalesForce application and create Leads
  Given SalesForce login page is opened
  Then Login with username "vivek.biswas-lffr@force.com" and password "Vivek1234"
  And Go to Leads page
  And Create new lead with Salutation <salutation>, LastName <lastName>, Company <company>, and Address <address>
  Then Validate Lead with Name <lastName> is pressent

  Example:
  | salutation | lastName | company | address |
  | Mr. | test0002 | company1 | Kolkata |
#   | Ms. | test0003 | company2 | Delhi |
#   | Mrs.| test0004 | company1 | Tokyo |
#   | Dr. | test0005 | company2 | Okinawa |
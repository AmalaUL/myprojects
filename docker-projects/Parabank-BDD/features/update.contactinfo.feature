
Feature: Update Contact Info
  Background:
    Given I open the parabank login page
    When I enter valid username and password
    Then I see account overview page

  @profile 
  Scenario: update profile of logged in username
    Given I go to update contact info page
    When I update profile form with
      |firstName|lastName|address|city|state|zipCode|phone|
      |John|Smith|123 Maple Street|Austin|Texas|73301|5125559021|
    Then I should see sucessful message
      |message|Your updated address and phone number have been added to the system.|    

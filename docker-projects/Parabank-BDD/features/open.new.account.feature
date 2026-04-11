Feature: Open new account
  
  Background:
    Given I open the parabank login page
    When I enter valid username and password
    Then I see account overview page
    
  Scenario: Create new savings account
    Given I go to Open new account page
    When I select account type and open new account
    Then I should see success message
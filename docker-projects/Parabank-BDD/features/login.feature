@background
Feature: Login

  Background: 
    Given I open the parabank login page

  @positive @login
  Scenario: Successful Login
    When I enter valid username and password
    Then I see account overview page
  
  @negative
  Scenario: Unsuccessful Login
    When I enter invalid username and password
    Then I see an error message
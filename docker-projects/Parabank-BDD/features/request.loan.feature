Feature: Request Loan

  Background:
    Given I open the parabank login page
    When I enter valid username and password
    Then I see account overview page
    
  Scenario Outline: Request loan with different amounts
    Given I go to Request Loan page
    When I apply loan with <loanAmount> and <downPaymentAmount>
    Then I should see the loan <result>  

Examples:
    |loanAmount|downPaymentAmount|result|
    |20|1|Approved|
    |15|2|Approved|
    |10|1|Approved|

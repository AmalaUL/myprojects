Feature: Session persistance

  Scenario: User session persists after page reload
    Given a logged-in user
    When the user adds products to the cart
    And reloads the page
    Then the user should remain logged in 
    And the cart should retain the added products
    
Feature: Purchase products 

Scenario: User purchases products and downloads invoice
  Given a logged-in user
  When the user adds products to the cart
  And proceeds to checkout
  Then the total price should be correct
  When the user completes the payment
  Then the user should be able to download the invoice 
  
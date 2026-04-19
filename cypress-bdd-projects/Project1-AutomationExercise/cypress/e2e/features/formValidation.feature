Feature: Form Validation

Scenario Outline: Invalid form submission shows correct error messages
  Given a logged-in user
  When the user enters "<email>" in the email field
  And the user submits the form
  Then "<error>" should be displayed

Examples:
  |email|error|
  | |Please fill out this field|
  |test#123|Please include an '@' in the email address. 'test#123' is missing an '@'.|
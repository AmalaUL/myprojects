### Project: Cypress BDD for Automation Exercise Application
This project demonstrates an end-to-end test automation framework using Cypress with Cucumber (BDD).

It covers key user flows such as session persistence, purchase flow, and form validation using readable Gherkin scenarios.

## Tech Stack
Cypress – Test runner
@badeball/cypress-cucumber-preprocessor – BDD integration
ESBuild Preprocessor – Fast bundling
JavaScript – Test implementation

## Features Covered
Session Persistance
  - User remains logged in after page reload
  - Session is validated using cookie
Purchase Flow
  - Add products to cart
  - Validate total price
  - Complete payment
  - Download invoice
Form Validation
  - Required field validation
  - Invalid email validation
  - Error message verification using Scenario Outline  

## How to Run Tests
Install dependencies
  npm install
Open Cypress Test Runner
  npx cypress open
Run tests in headless mode
  npx cypress run

## Key Learnings
- Cypress requires a preprocessor to support .feature files
- {string} in step definitions requires quoted values in feature files
- .type() does not accept empty strings → handled via conditional logic
- Scenario Outline is useful for data-driven validation testing
- Keep feature files behavior-focused, not implementation-heavy  

## Challenges Faced
- Debugging Cucumber step matching issues
- Handling Cypress async behavior
- Resolving bundler/cache issues with feature files
- Structuring reusable and clean step definitions

## Future Improvements
- ADD CI/CD pipeline integration
- Introduce test reporting (Allure / Mochawesome)
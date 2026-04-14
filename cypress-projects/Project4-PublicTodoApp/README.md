# PublicTodo App – Cypress Test Automation

This project demonstrates end-to-end testing of a Todo application using Cypress, focusing on CRUD operations and UI validation with mocked API responses.

## Features Covered
- Add tasks
- Mark tasks as completed
- Delete tasks
- Prevent adding empty tasks

## Test Scenarios
### TC-1 Update Task Status 
- Marks a task as completed
- Verifies:
     Completed label is visible
     "Clear completed" option appears

### TC-2: Delete Task
- Deletes a task from the list
- Validates:
      Task count decreases by 1
      UI updates correctly

### TC-3: Prevent Empty Task Creation
- Attempts to add an empty task
- Verifies:
    No new task is created
    Task count remains unchanged

## Tech Stack
JavaScript
Cypress
Mocha (Test Runner – built into Cypress)

## How to Run Tests
1. Install dependencies
npm install
2. Open Cypress Test Runner
npx cypress open
3. Run tests in headless mode
npx cypress run

## Key Learnings
API mocking using cy.intercept() improves test reliability
Fixtures help manage test data efficiently
Page Object Model (POM) improves code maintainability
Assertions validate both UI behavior and state changes

## Challenges Faced
Handling dynamic task list updates
Verifying UI changes after DOM manipulation (delete action)
Ensuring test isolation using mocked API responses

## Future Improvements
Add API-level validation
Integrate CI pipeline (e.g., GitHub Actions)
Add test reporting (HTML reports)
Increase edge case coverage

Parabank BDD Automation (Playwright + Cucumber + Docker)
# This Project demonstrates the end to end testing of banking features using playwright with a BDD framework (cucumber) in containerized environment.

## Features
- Login to banking application
- Create new account
- Request loan
- Update profile

## TechStack
- Javascript
- playwright 
- Cucumber(BDD Test Runner)
- Docker
- GitHub Actions

## How to Run
1. Install dependencies
npm install
2. Build Docker image
docker build -t parabank-bdd .
3. Run tests in container
docker run --rm -v ${PWD}/reports:/app/reports parabank-bdd
4. Generate HTML Report
node reports/report.js



## Challenges Faced
1. Reports not updating in Docker 
     Issue: JSON report was not visible  outside container
     Fix: Used volume mapping
          -v ${PWD}/reports:/app/reports
2. Flaky update profile Test
     Issue: Form submission was inconsistent
     Fix: 
        - Added firstname and lastname updates 
        - Used type instead of fill to simulate real user input

## Lesson Learned
1. shared state between tests can cause issues, especially in parallel execution.
    - Each scenario should be independent
2. Difference between Docker ENTRYPOINT and CMD 
    - ENTRYPOINT always run, CMD can be Overridden
3. Cucumber Reporting flow 
    - JSON is generated first, then converted to HTML using a custome reporter
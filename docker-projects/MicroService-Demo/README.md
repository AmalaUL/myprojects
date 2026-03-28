### Project Objective
This project demonstrate end to end testing of product management application using playwright in a dockerized multi-container environment.

## Architecture
The application consists of:
- PostgreSQL database for data storage
- Node.js backend API for business logic
- HTML frontend for user interaction
- Playwright test container for automation.
All services are orchestrated using Docker Compose.

## Tech Stack
- Frontend: HTML, Javascript
- Backend: Node.js (Express)
- Database: Postgres
- Testing: Playwright
- Containerization: Docker, Docker Compose

## Validation
Playwright test validate:
- Eisting products are loaded correctly in UI
- New Products can be added successfully
- Newly added Products appear in UI
- Database entries are correctly created

## Test Flow
1. Playwright test starts inside test container
2. Test opens frontend service
3. Frontend calls backend API
4. Backend interacts with PostgreSQL database
5. Test validates:
   - UI data
   - Database entries

## How to Run
1. Clone the Repository
2. Build and Start Services:
docker compose up --build --abort-on-container-exit
3. Stop and clean:
docker compose down -v

## Lesson Learned
- Managing multi container applications using docker compose
- Understanding Docker networking and service communication
- Importance of service readiness using healthchecks
- Implementing database validation in end to end tests

## Challenges Faced
- Frontend unable to connect to backend using localhost inside Docker
- Running tests inside Docker vs accessing application from local browser
- Understanding why docker compose must be run even for local browser testing
- Backend failing to connect to database before it was ready

## Environment Behavior
- Inside Docker:
  Frontend uses → http://backend:3000
- From local browser:
  Frontend uses → http://localhost:3000
This difference exists because each container has its own localhost. "Docker compose up --build" is important to run after changing to local browser because Frontend is NOT running on your machine. it is running INSIDE a container.

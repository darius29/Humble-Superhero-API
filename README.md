Humble Superhero API
🌟 Introduction
The Humble Superhero API is a simple application that allows users to add superheroes with their name, superpower, and humility score. The list of superheroes is sorted based on their humility score, promoting the idea that the best heroes are also the most humble!

This project includes:

Backend: A NestJS API to manage superheroes.
Frontend: A React-based UI to add, edit, and view superheroes in real time.
⚡ Features
✅ Add superheroes with name, superpower, and humility score
✅ View a sorted list of superheroes (highest humility first)
✅ Edit and delete superheroes
✅ UI updates without refreshing the page
✅ Validation: Ensure humility score is between 1-10
✅ Tests with Jest to validate API behavior

🏗 Tech Stack

Backend:
NestJS (Node.js Framework)
TypeScript
Jest (Testing)
Supertest (E2E Testing)

Frontend:
React.js
Axios (HTTP Requests)
CSS (for styling)
🚀 Setup & Installation
📌 Backend Setup

Navigate to the backend folder:
cd backend

Install dependencies:
yarn install

Run the backend:
yarn start

The API will be available at http://localhost:3001.
📌 Frontend Setup
Navigate to the frontend folder:
cd frontend

Install dependencies:
yarn install

Start the frontend:
yarn start

Open http://localhost:3000 in your browser.
🔗 API Endpoints
Method Endpoint Description
POST /superheroes Add a new superhero
GET /superheroes Get the list of superheroes
PATCH /superheroes/:name Update superhero details
DELETE /superheroes/:name Remove a superhero
Example Request (POST /superheroes)

json:
{
"name": "Spider-Man",
"superpower": "Wall Crawling",
"humilityScore": 9
}

🧪 Testing
Run backend tests
cd backend
yarn test

This will execute Jest tests, including:

Validation of humility score
Checking if superheroes are stored correctly
Ensuring API responses match expectations

🤝 Collaboration Notes
If I were working with a team, I would:

Use GitHub Issues for tracking tasks.
Use Pull Requests with code reviews to ensure quality.
Split tasks (one person on backend, another on frontend).
Use Jest + Supertest for backend and React Testing Library for frontend testing.

🔥 If I Had More Time...

Database Support: I would replace the in-memory storage with MongoDB or PostgreSQL.
Authentication: Adding user authentication for secure superhero management.
Real-Time Updates: Implement WebSockets to allow multiple users to see changes instantly.
Better UI/UX: Adding animations and a cleaner design with a component library.

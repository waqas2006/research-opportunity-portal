# Research Opportunity Portal

A web app where faculty members can post, view, update, close and delete research opportunities.

**GitHub Repository:** https://github.com/waqas2006/research-opportunity-portal

**Author:** [Your Name], [Roll Number], [Class]

## Tech Stack
- Backend: Node.js, Express
- Database: MySQL 8
- Frontend: HTML, CSS, JavaScript

## Project Structure
```
backend/    Express REST API (src/server.js, src/db.js)
frontend/   index.html
database/   schema.sql
postman/    collection.json (Postman collection)
```

## Setup and Run

### 1. Database
Install MySQL, then run:
```
mysql -u root -p < database/schema.sql
```
(Or open `database/schema.sql` in MySQL Workbench and run it.)

### 2. Backend
```
cd backend
npm install
```
Create a file `backend/.env` (never commit it):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD="your_mysql_password"
DB_NAME=research_portal
PORT=3000
```
Put the password in double quotes if it contains `#`. Then start the server:
```
node src/server.js
```
The API runs at http://localhost:3000

### 3. Frontend
Open `frontend/index.html` in a browser. The backend must be running.

## API Endpoints
| Method | Endpoint | Description | Success |
|---|---|---|---|
| POST | /api/opportunities | Create | 201 |
| GET | /api/opportunities | Get all | 200 |
| GET | /api/opportunities/:id | Get one | 200 |
| PUT | /api/opportunities/:id | Update (also used to close) | 200 |
| DELETE | /api/opportunities/:id | Delete | 200 |

Errors: 400 for invalid or missing data, 404 if the ID does not exist, 500 for server errors.

## Testing
Import `postman/collection.json` into Postman and run the requests in order.
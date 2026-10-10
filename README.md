# Research Opportunity Portal

A web-based application where faculty members can post, view, update, close, and delete research opportunities in one place. It consists of a REST API backend, a MySQL database, and a simple frontend.

**GitHub Repository:** https://github.com/waqas2006/research-opportunity-portal

**Demo Video:** [paste your Google Drive link here, or write "included in the ZIP file as demo.mp4"]

## Student Details

- **Name:** [Your Name]
- **Roll Number:** [Your Roll Number]
- **Class:** [Your Class]

## Features

- Create, view, update, and delete research opportunities
- Change an opportunity's status from Open to Closed
- Validation on both the frontend and the backend
- Success and error messages in the interface
- All data is stored in MySQL (no hard-coded data)
- Appropriate HTTP status codes: 200, 201, 400, 404, 500

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express |
| Database | MySQL 8 |
| Frontend | HTML, CSS, JavaScript |
| API testing | Postman |

## Project Structure

```
research-opportunity-portal/
├── backend/
│   ├── src/
│   │   ├── server.js     (routes, validation, status codes)
│   │   └── db.js         (MySQL connection pool)
│   ├── .env.example      (template for the .env file)
│   └── package.json
├── frontend/
│   └── index.html        (user interface)
├── database/
│   └── schema.sql        (database and table setup)
├── postman/
│   └── collection.json   (exported Postman collection)
└── README.md
```

## Prerequisites

- Node.js (LTS version)
- MySQL 8
- A web browser
- Postman (for testing the API)

## Setup and Run Instructions

### 1. Clone the repository

```
git clone https://github.com/waqas2006/research-opportunity-portal.git
cd research-opportunity-portal
```

### 2. Set up the database

Run the schema file, which creates the `research_portal` database and the `opportunities` table:

```
mysql -u root -p < database/schema.sql
```

If `mysql` is not recognized on your computer, open `database/schema.sql` in MySQL Workbench and click the lightning bolt icon to run it.

### 3. Set up the backend

```
cd backend
npm install
```
Copy the example file to create your own `.env` file:

    copy .env.example .env

(On Mac/Linux use `cp .env.example .env`.) Then open `.env` and replace `your_mysql_password` with your real MySQL password. The example file contains only placeholder values.

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD="your_mysql_password"
DB_NAME=research_portal
PORT=3000
```

Notes:
- Keep the double quotes around the password. They are required if the password contains a `#`.
- The `.env` file is listed in `.gitignore` and is never uploaded to GitHub.

Start the server:

```
node src/server.js
```

You should see `Server running on port 3000`. Keep this terminal open.

### 4. Run the frontend

Open `frontend/index.html` in a web browser (double-click the file). The backend must be running, because the page loads all data from the API.

## Database Schema

Table: `opportunities`

| Column | Type | Notes |
|---|---|---|
| id | INT | Primary key, auto increment |
| title | VARCHAR(200) | Required |
| description | TEXT | Required |
| research_area | VARCHAR(100) | Required |
| faculty_name | VARCHAR(100) | Required |
| department | VARCHAR(100) | Required |
| required_skills | VARCHAR(255) | Required |
| positions | INT | Required, positive whole number |
| deadline | DATE | Required |
| status | ENUM('Open','Closed') | Defaults to Open |
| created_at | TIMESTAMP | Set automatically |

## API Endpoints

Base URL: `http://localhost:3000/api/opportunities`

| Method | Endpoint | Description | Success Code |
|---|---|---|---|
| POST | /api/opportunities | Create a new opportunity | 201 Created |
| GET | /api/opportunities | Get all opportunities | 200 OK |
| GET | /api/opportunities/:id | Get one opportunity by ID | 200 OK |
| PUT | /api/opportunities/:id | Update an opportunity (also used to close it) | 200 OK |
| DELETE | /api/opportunities/:id | Delete an opportunity | 200 OK |

### Error responses

| Code | Meaning |
|---|---|
| 400 Bad Request | Missing or invalid data (for example an empty title, positions below 1, or a status other than Open/Closed) |
| 404 Not Found | No opportunity exists with the given ID |
| 500 Internal Server Error | Unexpected server or database error |

### Example request body (POST)

```json
{
  "title": "AI for Healthcare",
  "description": "Build ML models for X-ray analysis",
  "research_area": "Artificial Intelligence",
  "faculty_name": "Dr. Ahmed",
  "department": "Computer Science",
  "required_skills": "Python, ML",
  "positions": 2,
  "deadline": "2026-12-31",
  "status": "Open"
}
```

### Closing an opportunity

Send a PUT request with only the field to change:

```json
{ "status": "Closed" }
```

## Testing with Postman

1. Open Postman and click **Import**.
2. Select `postman/collection.json`.
3. Make sure the backend is running.
4. Run the requests in order. The collection covers: creating three opportunities, getting all, getting one, updating, closing, deleting, requesting a deleted ID (404), and sending invalid data (400).

Some requests use a fixed ID in the URL. If that ID no longer exists, change the number at the end of the URL to an ID that exists.

## Security

- Database credentials are stored in `backend/.env`, which is excluded from Git.
- All SQL queries are parameterized to prevent SQL injection.
- Text from the database is escaped before it is displayed in the frontend.
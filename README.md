# Rooming List Management App

A full-stack application for managing hotel rooming lists and bookings for events. Built with Node.js, Express, PostgreSQL, React, Vite, Docker, and tested with Jest and Supertest.

---

## Features

- **Rooming List Management:** Create, filter, and view rooming lists by event, status, and search.
- **Authentication:** Simple JWT-based login for API access.
- **Modern UI:** Responsive React frontend styled with Tailwind CSS.
- **API:** RESTful endpoints for rooming lists, bookings, and import operations.
- **Testing:** Jest and Supertest for backend API tests.
- **Dockerized:** Easy local development with Docker Compose for app and Postgres DB.

---

## Technologies

- **Backend:** Node.js, Express, PostgreSQL.
- **Frontend:** React, Vite, Tailwind CSS, Axios.
- **Testing:** Jest, Supertest
- **Dev Tools:** ESLint, Prettier, Docker, Docker Compose.

---

## Project Structure

```
rooming-list-management-app/
├── db.sql                # Database schema (PostgreSQL)
├── docker-compose.yml    # Docker Compose for app and DB
├── Dockerfile            # App Dockerfile
├── init-db.sh            # DB initialization script
├── packages/
│   ├── backend/          # Express API server
│   └── frontend/         # React + Vite frontend
└── ...
```

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Yarn](https://yarnpkg.com/) (for local dev without Docker)

### Environment Variables

#### Backend (`packages/backend/.env.example`)
```
DATABASE_URL=postgres://admin:admin@localhost:5432/rlma_db
JWT_SECRET=dev-secret
JWT_EXPIRATION=1h
```

#### Frontend (`packages/frontend/.env.example`)
```
API_BASE_URL=http://localhost:3000/api
```

---

### Local Development (with Docker)

1. **Start the stack:**
   ```bash
   docker-compose up
   ```
   - The backend will be available at `http://localhost:3000`
   - The frontend will be available at `http://localhost:5173`

2. **Database Initialization:**
   - The `init-db.sh` script ensures Postgres is ready and loads `db.sql` schema.

3. **Default Credentials:**
   - No user/password required; login is mocked for demo. ***Remove localstore if to fetch new JWT***.

---

### Local Development (without Docker)

1. **Start Postgres locally**.
2. **Run migrations:**
   ```bash
   psql -U {user} -d {database} -f db.sql
   ```
   Make sure update .env file.
3. **Install dependencies:**
   ```bash
   yarn install
   ```
4. **Start backend and frontend:**
   ```bash
   yarn dev
   ```
   (Runs both workspaces concurrently.)

---

## Scripts

- **Backend:**
  - `yarn start` – Start backend with nodemon
  - `yarn test` – Run Jest tests
  - `yarn lint` / `yarn lint:fix` – Lint code
  - `yarn format` – Format code with Prettier

- **Frontend:**
  - `yarn dev` – Start Vite dev server
  - `yarn build` – Build for production
  - `yarn preview` – Preview production build
  - `yarn lint` / `yarn lint:fix` – Lint code
  - `yarn format` – Format code with Prettier

- **Root:**
  - `yarn dev` – Start both backend and frontend
  - `yarn format` – Format all code
  - `yarn purge` – Remove all node_modules

---

## API Endpoints

- `POST /api/login` – Get JWT token
- `GET /api/rooming-lists/filter` – Filter rooming lists (search, status, sort)
- `GET /api/rooming-lists/:id/bookings` – Get bookings for a rooming list
- `POST /api/import` – Import demo data.

---

## Testing

- Backend tests:  
  ```bash
  cd packages/backend
  yarn test
  ```

---

# Backend – ToDo List API

## Setup

1. Copy `.env.example` to `.env` and fill in your values.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build and run (dev):
   ```sh
   npm run build && npm start
   ```
4. Or use Docker Compose (recommended):
   ```sh
   cd ../docker
   docker-compose up --build
   ```

## Environment Variables
See `.env.example` for all required variables.

## Admin User
- Default admin: `admin` / `123`
- Seeded automatically on first run if not present.

## API Documentation
- Swagger UI: [http://localhost:4000/api-docs](http://localhost:4000/api-docs)

## Endpoints
- `POST /auth/register` – Register user
- `POST /auth/login` – Login (returns JWT)
- `POST /tasks` – Create task (public)
- `GET /tasks` – List tasks (pagination, sorting)
- `PUT /tasks/:id` – Update task (admin only)

## Database
- Uses PostgreSQL (see docker-compose for config)

## Development
- All code is TypeScript, uses TypeORM, class-validator, JWT, XSS protection, and centralized error handling. 
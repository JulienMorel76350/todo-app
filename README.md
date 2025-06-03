# Dockerized Todo Application

A full-stack Todo application with a React frontend, Express.js backend, and PostgreSQL database. All components are dockerized and orchestrated using Docker Compose.

## Architecture

The application consists of three main components:

1. **Frontend**: Next.js React application
2. **Backend**: Express.js REST API
3. **Database**: PostgreSQL

## Features

- Create, read, update, and delete todos
- Mark todos as completed
- Responsive design
- Dockerized components
- CI/CD pipeline for building and pushing Docker images

## Prerequisites

- Docker and Docker Compose
- Git

## Getting Started

1. Clone the repository:

   ```
   git clone <repository-url>
   cd todo-app
   ```

2. Start the application using Docker Compose:

   ```
   docker-compose up
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/todos

## Development

### Frontend

The frontend is built with Next.js and TypeScript. To run it locally:

```
cd frontend
npm install
npm run dev
```

### Backend

The backend is built with Express.js. To run it locally:

```
cd backend
npm install
npm run dev
```

## CI/CD

The project includes a GitHub Actions workflow that:

- Builds Docker images for frontend and backend
- Pushes images to Docker Hub (on push to main branch)

To use this workflow, you need to set the following GitHub secrets:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password or access token

## Environment Variables

### Frontend

- `NEXT_PUBLIC_API_URL`: URL of the backend API

### Backend

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Port for the backend server

## License

MIT

## CI/CD Status

This project uses GitHub Actions for continuous integration and deployment. The workflow automatically builds and pushes Docker images to Docker Hub on every push to the main branch.

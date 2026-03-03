# Full-Stack Application

This repository contains a full-stack web application containerized with Docker. It consists of a modern React/Vite frontend and a modular NestJS backend connected to a PostgreSQL database.

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed on your machine:
* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Application

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>

    Set up Environment Variables:

        Navigate to the server directory and create a .env file based on your configuration requirements (e.g., database credentials, ports).

        Navigate to the client directory and create a .env file (e.g., VITE_API_URL=http://localhost:3000).

    Build and Start the Containers:
    Run the following command from the root directory:
    Bash

    docker-compose up --build

    Access the Application:

        Client (Frontend): http://localhost:8080

        Server (Backend API): http://localhost:3000

        Database (PostgreSQL): localhost:5433

To stop the containers and network gracefully, run:
Bash

docker-compose down

🐳 Docker Infrastructure

The application uses docker-compose.yml to orchestrate three independent containers.
Key Infrastructure Features:

    Database Health Checks: The backend container is configured to wait until the PostgreSQL database is fully initialized and ready to accept connections (pg_isready) before it attempts to boot up. This prevents race conditions and startup crashes.

    Internal DNS Routing: The backend and database communicate securely over Docker's internal network. The backend connects to the database using the service name postgres-db as the host, rather than an IP address.

    Persistent Data: A Docker volume (postgres_data) is mounted to /var/lib/postgresql to ensure that database records persist even if the containers are spun down or rebuilt.

    Strategic Port Mapping: * The database maps internal port 5432 to host port 5433 to prevent conflicts with any local PostgreSQL instances.

        The frontend maps internal port 80 to host port 8080 for browser access.

        Note: Because the frontend executes in the user's browser (outside the Docker network), it communicates with the backend via the exposed localhost:3000 port rather than the internal Docker DNS.

🏗️ Architectural Choices

The project is divided into completely decoupled client and server environments.
Frontend (Client)

The frontend relies on a highly scalable, domain-driven design tailored for maintainability.

    Feature-Based Folder Structure: Code is grouped by business feature. Each feature encapsulates its own hooks, page, service, and components.

    Presentational & Container Pattern: UI components (Presentational) are strictly separated from data-fetching and state-management components (Container), maximizing reusability and keeping business logic testable.

    TanStack Query & Axios: Server state is managed using TanStack Query paired with Axios. This handles caching, background updates, and loading/error states automatically.

    Modern Routing: Utilizes React Router's createBrowserRouter to enable data routers, loaders, and actions for future advanced routing needs.

    Absolute Paths: Configured to use absolute imports to avoid deeply nested relative paths.

Backend (Server)

The server is built with a strictly typed, modular architecture that promotes clear boundaries and robust validation.

    Modular Architecture: The codebase is divided into discrete modules. Each module contains its own controller (handling HTTP requests), service (handling business logic), and module configuration file.

    Strict Configuration & Validation: * Environment variables are validated on startup (env.validation). If a required variable is missing, the server fails fast to prevent runtime errors.

        Once validated, the PostgreSQL (pg) configuration is safely loaded.

    Standardized API Responses: Every endpoint adheres to a predictable API response contract, ensuring the frontend always knows how to parse payloads and error details.

    Data Layer Separation: Database models are defined in the entity folder, while Data Transfer Objects (dto) are used to validate incoming request payloads before they reach the services.
# Project Overview

This document serves as a guide for this Next.js project, outlining its structure, conventions, and key technologies. The goal is to provide a clear and concise reference for developers and to serve as a template for future Next.js applications.

## Key Technologies

- **Next.js**: A React framework for building full-stack web applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Shadcn/UI**: A collection of reusable UI components.
- **Prisma**: A next-generation ORM for Node.js and TypeScript.
- **ESLint**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

## Getting Started

### Prerequisites

- Node.js
- npm, yarn, pnpm, or bun

### 1. Installation

```bash
npm install
```

### 2. Environment Variables

This project uses environment variables to manage configuration and secrets. Create a local environment file by copying the example file (if one exists):

```bash
cp .env.example .env.local
```

Then, fill in the required values in .env.local. This file is ignored by Git and should not be committed.

### 3. Running the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Building for Production

```bash
npm run build
```

## Available Scripts

- `npm run start`: Starts the production server.
- `npm run lint`: Lints the code.
- `npm run lint-fix`: Lints and fixes the code.
- `npm run type`: Type-checks the code.
- `npm run prisma:migrate:dev`: Runs database migrations in a development environment.
- `npm run prisma-seed`: Seeds the database with initial data.
- `npm run prisma-studio`: Opens the Prisma Studio to view and edit the data in the database.

## Project Structure

The project uses ESLint for linting and TypeScript for type-checking. The code is organized into the following directories:

- `src/app`: Contains the pages of the application.
- `src/components`: Contains reusable UI components. This directory is further organized into:
  - `theme`: Components for managing the application's theme, like the light/dark mode switcher.
  - `ui`: Core UI components, primarily from `shadcn/ui`, such as `Button`, `Card`, and `Separator`.
- `src/features`: Contains the business logic of the application, organized by feature. Each feature folder, like `ticket`, is further structured into subdirectories:
  - `actions`: Holds server actions used for data mutations (e.g., creating, updating, or deleting data).
  - `components`: Contains React components that are specific to this feature.
  - `queries`: Includes functions responsible for fetching data from the database.
- `src/lib`: Contains utility functions and the Prisma client.
- `src/path.ts`: A centralized module for generating application-specific URL paths, ensuring consistent routing.
- `manifests`: Contains the `.yaml` manifests for deployment to a containerized runtime (e.g. GKE or Cloud Run)
- `prisma`: Contains the Prisma schema and seed script.
- `scripts`: Contains scripts for setting up the deployment environment.

## Styling

### Tailwind CSS

Styling is handled by Tailwind CSS. Configuration can be found in `tailwind.config.ts`. Global styles and Tailwind directives are located in `src/app/globals.css`.

### Shadcn/UI

We use Shadcn/UI for our component library. These are not traditional library components; instead, you use a CLI to add them to your project, giving you full control over their code.

To add a new component from `shadcn/ui`, run the following command, replacing `[component-name]` with the component you want to add (e.g., `button`, `dialog`):

```bash
npx shadcn-ui@latest add [component-name]
```

The component will be added to `src/components/ui`.

## Database

This project uses Prisma as its ORM.

- **Schema**: The database schema is defined in `prisma/schema.prisma`.
- **Client**: The Prisma Client is initialized in `src/lib/prisma.ts` and can be imported from there.
- **Migrations**: To create and apply database migrations, use `npm run prisma:migrate:dev`.
- **Seeding**: The database can be seeded with initial data using `npm run prisma-seed`.
- **Provider**: This project can be configured to use various database providers supported by Prisma. For example, it can connect to a Google Cloud Firestore database by leveraging its MongoDB compatibility layer.

## Deployment

This project is configured for automated CI/CD to Google Cloud.

**Initial Setup**: The `scripts/` directory contains shell scripts to bootstrap the Google Cloud environment. These scripts handle the creation of service accounts, workload identity federation, and the initial setup of the Cloud Deploy pipeline.

**CI/CD Flow**:
1.  A manual trigger of the **GitHub Actions** workflow (`.github/workflows/continuous-delivery.yaml`) initiates the process.
2.  The workflow authenticates to Google Cloud and starts a **Cloud Build** job defined in `cloudbuild.yaml`.
3.  **Cloud Build** uses **Skaffold** (`skaffold.yaml`) to build the application's Docker image. The `next.config.ts` is configured with `output: 'standalone'` to create a minimal, production-optimized image.
4.  Once the image is built and pushed to Artifact Registry, Cloud Build creates a new release in **Google Cloud Deploy**.
5.  **Cloud Deploy**, using the pipeline defined in `clouddeploy.yaml`, orchestrates the rollout to the target environment (e.g., 'dev'). It uses the Skaffold configuration to deploy the new container version to **Cloud Run**, based on the service definition in `manifests/run.yaml`.

## Error Handling and Logging

This project leverages Next.js's built-in mechanisms for robust error handling.

- **Error Boundaries (`error.tsx`)**: We use `error.tsx` files within route segments to catch runtime errors in nested routes. This prevents the entire application from crashing and allows for a graceful fallback UI to be displayed, isolating the error to the affected part of the application.

- **Not Found Pages (`not-found.tsx`)**: For handling "not found" errors, we use `not-found.tsx` files. These are rendered when the `notFound()` function is thrown from a component or when a user visits a URL that doesn't exist. An example can be found at `src/app/tickets/[ticketId]/not-found.tsx`.

- **Logging**: While `console.log` is used for development, for production environments, it is recommended to integrate a dedicated logging service (e.g., Sentry, Logtail, or Google Cloud Logging) to capture, monitor, and alert on application errors and logs.

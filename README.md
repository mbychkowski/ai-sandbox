# AI-Driven Next.js Project

This is an AI-driven Next.js project leveraging Google's advanced AI stack to build intelligent applications.

## Key Technologies

This project is built on a modern web and AI technology stack.

### Web & Backend

- **Next.js**: A React framework for building full-stack web applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Shadcn/UI**: A collection of reusable UI components.
- **Prisma**: A next-generation ORM for Node.js and TypeScript.
- **ESLint**: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

### AI & Agent Technologies

- **Gemini**: The core family of multimodal AI models from Google used for reasoning, analysis, and content generation.
- **Vertex AI**: The MLOps platform used to manage, deploy, and scale the Gemini models powering the application.
- **Agent Development Kit (ADK)**: The framework used to build and orchestrate the application's AI agent, defining its tools, reasoning logic, and core capabilities.
- **Model Context Protocol (MCP)**: The protocol for managing conversational state and context between the user, the agent, and the UI, ensuring a coherent and stateful user experience.
- **MCP UI Server SDK for React**: The client-side library used to connect our Next.js frontend to the MCP backend, enabling real-time communication with the AI agent.
- **Vercel AI SDK**: The primary toolkit for integrating AI features into the application.

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

Then, fill in the required values in `.env.local`. This file is ignored by Git and should not be committed.

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
- `src/agent`: Contains the core logic for the AI agent built with the Agent Development Kit (ADK).
- `src/components`: Contains reusable UI components.
- `src/features`: Contains the business logic of the application, organized by feature.
- `src/lib`: Contains utility functions and the Prisma client.
- `src/path.ts`: A centralized module for generating application-specific URL paths.
- `manifests`: Contains the `.yaml` manifests for deployment.
- `prisma`: Contains the Prisma schema and seed script.
- `scripts`: Contains scripts for setting up the deployment environment.

## Styling

### Tailwind CSS

Styling is handled by Tailwind CSS. Configuration can be found in `tailwind.config.ts`. Global styles are in `src/app/globals.css`.

### Shadcn/UI

We use Shadcn/UI for our component library. To add a new component, run:

```bash
npx shadcn-ui@latest add [component-name]
```

The component will be added to `src/components/ui`.

## Database

This project uses Prisma as its ORM.

- **Schema**: `prisma/schema.prisma`
- **Client**: `src/lib/prisma.ts`
- **Migrations**: `npm run prisma:migrate:dev`
- **Seeding**: `npm run prisma-seed`

## Deployment

This project is configured for automated CI/CD to Google Cloud using GitHub Actions, Cloud Build, Skaffold, and Cloud Deploy. The deployment pipeline builds a production-optimized Docker image and rolls it out to Cloud Run.
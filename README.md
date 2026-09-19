# PASS College Official Website

<p align="center">
  <img src="public/preview-image.png" alt="PASS College logo" width="220" />
</p>

<p align="center">
  A role-based college website and service portal developed as a thesis project for PASS College.
</p>

<p align="center">
  <a href="https://pass-college.netlify.app/">View the live website</a>
</p>

## Overview

This repository contains only the frontend for the PASS College public website
and campus service portal. It combines public institutional content with
protected workflows for students, teachers, registrars, and administrators.

The application is under active development and is being incrementally
refactored toward a feature-based React architecture. Its Node.js backend is
maintained in the separate
[`pass-college-server-backend-API`](https://github.com/mjayhumilde/pass-college-server-backend-API)
repository. Refer to that repository for separate backend setup instructions.

## Features

- Public school information, academic programs, history, news, events, and
  career opportunities
- Course recommendation quiz for prospective students
- Account request submission and request-status tracking
- Role-based authentication, protected routes, and centralized permissions
- Announcements, uniform information, profiles, and content publishing
- Student document requests with status tracking and cancellation
- Registrar document, account, and account-request management
- Teacher clearance meeting scheduling and completion workflows
- Administrative transaction reports
- Real-time user chat through Socket.IO and in-app notifications
- Knowledge-based chatbot with staff-managed questions and answers
- Newsletter subscriptions, visual newsletter composition, and bulk sending

## Roles And Access

The frontend supports four roles:

| Role | Primary access |
| --- | --- |
| Student | Member content, notifications, profile, and document requests |
| Teacher | Member content, notifications, profile, and clearance meetings |
| Registrar | Content, document, account, account-request, knowledge, and newsletter management |
| Administrator | Content, account, account-request, report, knowledge, and newsletter management |

Frontend access rules are centralized in
[`src/app/auth/accessPolicy.js`](src/app/auth/accessPolicy.js). These checks
control navigation and page access, while the backend remains responsible for
enforcing security on every protected API endpoint.

## Technology

- React 19
- Vite 6
- React Router 7
- Tailwind CSS 4
- Zustand 5
- Axios
- Socket.IO Client
- React Hook Form
- Framer Motion
- Lucide React
- html2canvas

## Project Structure

```text
src/
|-- app/            # Application layout, routing, and access policy
|-- features/       # Domain-focused pages, components, stores, hooks, and utils
|-- pages/          # Thin route entry points
|-- shared/         # Reusable cross-feature components and hooks
|-- store/          # Application-wide Zustand stores and Axios configuration
|-- assets/         # Images and videos
`-- data/           # Static content and fallback data
```

Feature-specific code stays inside its owning feature. Components and hooks
move into `shared/` only when they are genuinely reusable across unrelated
features.

## Frontend Setup

These instructions cover this frontend repository. For the backend code and
separate setup instructions, refer to
[`pass-college-server-backend-API`](https://github.com/mjayhumilde/pass-college-server-backend-API).
Run the backend separately and point the frontend's API URL to it.

### Prerequisites

- A current Node.js LTS release
- npm
- A running PASS College backend, locally or hosted

### 1. Install The Frontend

```bash
git clone https://github.com/mjayhumilde/pass-college-official-website.git
cd pass-college-official-website
npm install
```

### 2. Configure The Environment

Use the provided [`.env.example`](.env.example) to create the frontend `.env`:

```bash
cp .env.example .env
```

The template points to the local backend on port `2000`:

```dotenv
VITE_APP_ENV=development
VITE_API_URL_DEV=http://localhost:2000
VITE_API_URL_PROD=https://api.example.com
```

Update `VITE_API_URL_DEV` if your backend runs elsewhere, and replace
`VITE_API_URL_PROD` with your deployed backend origin before a production
build. Use server origins without `/api/v1`; the application adds
API paths and uses the same origin for Socket.IO. The `build` and `start:prod`
scripts set `VITE_APP_ENV=production` automatically.

Only public frontend configuration belongs here. Database, JWT, email, and
other service credentials belong in the backend repository's `.env`.

### 3. Start The Frontend

```bash
npm run dev
```

Vite will print the frontend URL in the terminal, normally
`http://localhost:5173`. The backend must remain running and reachable for
authenticated and data-driven features to work.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build using the production API URL |
| `npm run preview` | Preview the generated production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run start:prod` | Start Vite with the production environment flag |

## Authentication And Authorization

The current frontend auth flow intentionally remains small:

1. `useAuthStore` performs authentication and persists the current user state.
2. The Axios client attaches the stored bearer token to API requests.
3. `ProtectedRoute` and `GuestRoute` control page-level navigation.
4. `accessPolicy.js` maps application permissions to supported roles.
5. The backend validates the token and authorizes every protected operation.

## Deployment

The frontend is currently deployed on Netlify:

**https://pass-college.netlify.app/**

Client-side redirects are configured in [`public/_redirects`](public/_redirects)
so React Router routes resolve correctly when opened directly.

## Maintainer

[Mark John Humilde](https://github.com/mjayhumilde)

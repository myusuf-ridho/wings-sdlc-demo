# Product Requirements Document — Wings Dashboard Platform

> **Status:** Skeleton for SDLC demo. The full PRD will be attached here during the dry run.
> The user stories below are already implemented by the scaffold so traceability
> (PRD → code → pipeline) can be demonstrated end to end.

## 1. Overview

Wings is an internal dashboard platform that gives team members a single place to
sign in and view key operational metrics. This document is the planning artifact
for the project and the entry point of the SDLC.

## 2. Problem Statement

Teams currently check multiple tools to understand basic operational status.
There is no single, authenticated landing page that summarizes the numbers that
matter.

## 3. Goals

- G-1: Provide a secure, authenticated entry point to the platform.
- G-2: Present key metrics on a single dashboard page.
- G-3: Allow users to end their session cleanly (logout).

## 4. Non-Goals (for this scaffold)

- User registration / self-service password management.
- Role-based access control beyond a single demo user.
- Real data integrations (dashboard data is stubbed by the API).

## 5. User Stories

### US-1: Login

**As a** team member,
**I want to** log in with my email and password,
**so that** only authenticated users can access the dashboard.

Acceptance criteria:

- Given valid credentials, when I submit the login form, then I receive a session
  token and land on the dashboard.
- Given invalid credentials, when I submit the form, then I see an error message
  and stay on the login page.
- Given I am not authenticated, when I navigate to `/dashboard`, then I am
  redirected to `/login`.

Implemented by: `apps/web/src/app/login/page.tsx`, `apps/api/src/auth/*`.

### US-2: View Dashboard

**As an** authenticated team member,
**I want to** see a summary of key metrics,
**so that** I can understand operational status at a glance.

Acceptance criteria:

- The dashboard fetches summary data from the backend API using my session token.
- The dashboard shows stat cards (e.g. total users, active projects, deployments).
- The layout follows the approved Figma design (see [design.md](design.md)).

Implemented by: `apps/web/src/app/dashboard/page.tsx`,
`apps/api/src/dashboard/dashboard.controller.ts`.

### US-3: Logout

**As an** authenticated team member,
**I want to** log out,
**so that** my session cannot be reused on a shared machine.

Acceptance criteria:

- A logout control is visible on the dashboard.
- After logout, my session token is discarded and I am returned to the login page.
- After logout, navigating to `/dashboard` redirects me to `/login`.

Implemented by: `apps/web/src/app/logout/page.tsx`, `apps/api/src/auth/auth.controller.ts`.

## 6. Success Metrics

- 100% of the user stories above pass their acceptance criteria in the demo environment.
- Jenkins pipeline is green, including the SonarQube quality gate.

## 7. Open Questions

- Final metric set for the dashboard cards (pending stakeholder input).
- Branding/theme tokens (pending Figma handoff).

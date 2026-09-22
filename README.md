# Wings SDLC Demo

A working scaffold that demonstrates a full Software Development Life Cycle:
**Plan (PRD) → Design (Figma) → Develop (Next.js + NestJS) → Analyze (SonarQube) → Build (Jenkins)**.

See [docs/sdlc.md](docs/sdlc.md) for the phase-to-tool mapping.

## Stack

| Layer | Tech | Location |
| --- | --- | --- |
| Frontend | Next.js 15 (App Router, TypeScript) | `apps/web` |
| Backend | NestJS 10 (TypeScript) | `apps/api` |
| SAST | SonarQube | `sonar-project.properties` |
| CI | Jenkins (declarative) | `Jenkinsfile` |

## Quick start

Prerequisites: Node.js 20+.

```bash
# 1. Install dependencies (npm workspaces)
npm install

# 2. Configure environment
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# 3. Run both apps (api on :3001, web on :3000)
npm run dev
```

Open http://localhost:3000 — you will be redirected to the login page.

> **Port already in use?** If port 3000 is taken (e.g. by Docker), run the web app
> on another port and tell the API about it:
>
> ```bash
> # apps/api/.env
> WEB_ORIGIN=http://localhost:3100
> ```
>
> ```bash
> npm run dev --workspace apps/api &
> npm run dev --workspace apps/web -- -p 3100
> ```

Demo credentials (from `apps/api/.env`):

- **Email:** `admin@wings.io`
- **Password:** `Demo123!`

## Demo flow (talking points)

1. **Plan** — walk through [docs/prd.md](docs/prd.md); each user story maps to code.
2. **Design** — show [docs/design.md](docs/design.md); Figma link attached at dry run.
3. **Develop** — login at `/login` → land on `/dashboard` (data served by the NestJS
   API, JWT-guarded) → logout via `/logout` → back at `/login`.
4. **Analyze** — push triggers Jenkins; the pipeline runs `sonar-scanner` against
   this repo using `sonar-project.properties`.
5. **Build** — show the `Jenkinsfile` stages and the SonarQube quality gate
   blocking/allowing the build.

## Useful scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run api + web together |
| `npm run build` | Build both workspaces |
| `npm run lint` | Lint both workspaces |
| `npm test` | Run tests |

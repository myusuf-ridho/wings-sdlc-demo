# Design — Wings Dashboard Platform

> **Status:** Placeholder for SDLC demo. The Figma file will be linked here during
> the dry run, and the login/dashboard screens will be updated 1:1 from the
> approved frames.

## Figma file

- **Link:** _TBD — attached during dry run_
- **Frames covered:** Login, Dashboard, Logout confirmation (if provided)

## Workflow

1. Design is finalized in Figma and linked above.
2. Screens in `apps/web` are implemented to match the approved frames.
3. Design tokens (below) are extracted from Figma variables/styles and kept in
   sync with the frontend.

## Design tokens (placeholder)

These tokens reflect the current scaffold styling and will be replaced with the
Figma variables during the dry run.

| Token | Value (placeholder) | Used in |
| --- | --- | --- |
| `color/primary` | `#2563eb` | Buttons, links, accents |
| `color/background` | `#f8fafc` | Page background |
| `color/surface` | `#ffffff` | Cards, panels |
| `color/text-primary` | `#0f172a` | Headings, body text |
| `color/text-muted` | `#64748b` | Secondary text |
| `color/error` | `#dc2626` | Form errors |
| `radius/card` | `12px` | Cards, login panel |
| `spacing/page` | `24px` | Page padding |
| `font/family` | System UI stack | All text |

## Screens

### Login (`/login`)

Centered card with email + password fields and a submit button. Error state shown
inline on failed authentication.

### Dashboard (`/dashboard`)

Header with product name, welcome message, and logout button. Below the header, a
responsive grid of stat cards populated from `GET /api/dashboard/summary`.

### Logout (`/logout`)

Transient screen that clears the session and redirects to `/login`.

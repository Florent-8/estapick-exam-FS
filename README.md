# Estapick Property Listings

Full-stack take-home assignment for a property marketplace. The backend is a NestJS API and the frontend is a Next.js app with list/detail browsing, filters, a lightweight map panel, and an image carousel.

## Tech Choices

- **NestJS** keeps the API structure explicit with controllers, services, DTO validation, and testable business logic.
- **SQLite database** is used through Node's built-in SQLite driver. It keeps setup simple while still using a real database file and SQL queries.
- **Next.js App Router** gives server-rendered listing pages and straightforward URL-driven filters.
- **CSS modules were not necessary** for this scope; a single global stylesheet keeps the visual system easy to inspect.

## Project Structure

- `apps/api` - NestJS API.
- `apps/web` - Next.js frontend.

## API

The API defaults to `http://localhost:3001`.

### `GET /listings`

Returns paginated listing summaries. Supported query params:

- `city`
- `type`
- `minPrice`
- `maxPrice`
- `bedrooms`
- `bathrooms`
- `minLat`
- `maxLat`
- `minLng`
- `maxLng`
- `page`
- `limit`

Example:

```bash
curl "http://localhost:3001/listings?city=Tirana&type=apartment&bedrooms=2"
```

Bounding-box example:

```bash
curl "http://localhost:3001/listings?minLat=41.3&maxLat=41.36&minLng=19.43&maxLng=19.5"
```

### `GET /listings/:id`

Returns one listing with full description and amenities.

Example:

```bash
curl "http://localhost:3001/listings/prop-001"
```

### `POST /listings`

Creates a listing and validates the payload.

Example:

```bash
curl -X POST "http://localhost:3001/listings" \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test flat\",\"description\":\"Sunny test listing\",\"price\":99000,\"city\":\"Tirana\",\"address\":\"Rruga Test\",\"bedrooms\":1,\"bathrooms\":1,\"area\":58,\"type\":\"apartment\",\"latitude\":41.33,\"longitude\":19.82,\"images\":[\"https://example.com/flat.jpg\"]}"
```

## Local Development

Install dependencies once:

```bash
npm install
```

Run the backend:

```bash
npm run dev:api
```

Run the frontend in another terminal:

```bash
npm run dev:web
```

Default URLs:

- API: `http://localhost:3001`
- Web: `http://localhost:3000`

If you use a different API port, set this before starting the frontend:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001 npm run dev:web
```

On PowerShell:

```powershell
$env:NEXT_PUBLIC_API_URL="http://localhost:3001"; npm run dev:web
```

## Checks

```bash
npm run test
npm run build
```

## Notes

- The map is implemented as a lightweight static panel with clickable pins rather than a third-party map SDK. This avoids API keys while still showing the intended split-view workflow.
- Listing images use remote Unsplash URLs in CSS backgrounds, so no Next image domain configuration is needed.
- The SQLite database is created automatically at `apps/api/data/estapick.sqlite` when the backend starts.
- The database seeds 18 mock listings across Tirana, Durres, and Vlore, with realistic-ish coordinates.

## Frontend Rendering Decisions

- The app uses the **Next.js App Router** under `apps/web/src/app`.
- The listing index and detail pages are **Server Components** because they fetch data once per request from the API and do not need browser state for the initial render.
- The image carousel is a **Client Component** because it needs local click state for previous/next controls.
- Loading and error states are handled with App Router `loading.tsx` and `error.tsx` files for the listing index and detail experience.

## Limitations

- SQLite data is local to the generated database file, so it is suitable for local review but not production deployment.
- The map is a static visual approximation with clickable pins, not a real geographic SDK.
- Authentication, ownership, favorites, reviews, and image upload are intentionally out of scope.
- Filtering is exact-match for city/type and range-based for price/bed/bath; there is no full-text search.

## What I Would Build Next

- Replace the in-memory repository with Postgres and Prisma migrations.
- Add Swagger/OpenAPI docs at `/docs`.
- Add integration tests for the HTTP layer with Supertest.
- Use a real map provider such as Leaflet or MapLibre and cluster markers.
- Add form UI for creating listings from the frontend.

## AI Usage

I used AI assistance to scaffold the monorepo, translate the assignment requirements into a task plan, generate the first pass of the NestJS modules and Next.js components, and review the result against the checklist. The useful parts were quick boilerplate generation, test coverage suggestions, and spotting missing assignment items like loading/error states and README notes.

I manually reviewed and adjusted the generated code, fixed package/version issues, chose the simplified map approach, verified the API and frontend builds, and split the finished work into realistic commits.

## Time Spent

Approximately 4-5 hours including setup, implementation, verification, README work, and commit cleanup.

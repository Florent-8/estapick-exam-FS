# Estapick Property Listings

Full-stack take-home assignment for a property marketplace. The backend is a NestJS API and the frontend is a Next.js app with list/detail browsing, filters, a lightweight map panel, and an image carousel.

## Tech Choices

- **NestJS** keeps the API structure explicit with controllers, services, DTO validation, and testable business logic.
- **In-memory seeded repository** keeps setup fast for the take-home. The repository boundary is isolated, so swapping in Postgres/Prisma or TypeORM later would mainly affect `ListingsRepository`.
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
- `page`
- `limit`

Example:

```bash
curl "http://localhost:3001/listings?city=Tirana&type=apartment&bedrooms=2"
```

### `GET /listings/:id`

Returns one listing with full description and amenities.

Example:

```bash
curl "http://localhost:3001/listings/prop-001"
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
- The seed data is intentionally small but covers city, type, price, bed, and bath filtering.


I'll use a BFF (Backend for Frontend) pattern with a single aggregation API. Here's my reasoning:

The UI only needs to talk to one endpoint
The BFF handles all the complexity of aggregating multiple platform APIs
We can normalize data structures across platforms
Easier to add new platforms without changing the frontend



Desisions

I chose Vite for MVP simplicity; migrating to Next.js App Router would be straightforward and worthwhile if server components, auth middleware, or SSR for initial load performance become requirements."

Tech Stack Choices

React + TypeScript + Vite — fast dev server, first-class TS, industry standard
TanStack Query — server state, caching, loading/error states for free
Tailwind CSS — utility-first, fast to iterate on design without a component library getting in the way
Mock Service Worker (MSW) — mocks at the network layer, so the code is identical to production


STEPS
- Define the minimum domain 
- MSW setup mock data and handlers before touching any UI


for fast dev
Vite and  Tailwind

Prompt 
- create src/types/index.ts with interfaces for Property, Booking, Message, use generic fields in each.
- Create base implementation of msw, route handlers and data for messages, properties and bookings
- Create a base hook layer in src/api Using TanStack Query. useMessage (list with optional filters) and useMessages (single message + property + booking) create mutation useMarkAsRead and wire up the client  QueryClient
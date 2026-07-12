# FreshCart — Grocery Store Management System (Frontend)

A clean, responsive frontend for a grocery store admin dashboard, built for
a college project with React, Vite, React Router DOM, and Tailwind CSS.
All data is dummy/local — there is no backend, API, or authentication.

## Tech stack
- React 18 (functional components + hooks)
- Vite
- React Router DOM
- Tailwind CSS
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Navbar, Sidebar, StatsCard, ProductCard, SearchBar
  pages/        Dashboard, Products, Orders, Customers
  layouts/      MainLayout (Sidebar + Navbar shell used by every page)
  data/         Dummy data: products.js, orders.js, customers.js
  assets/       Local static assets (currently unused — images are hosted)
```

## Pages

- **Dashboard** — welcome banner, 4 summary stat cards (Total Products,
  Total Orders, Total Customers, Revenue), a Recent Products list, and a
  Low Stock Products alert list.
- **Products** — responsive product grid with image, name, category, price
  and stock; search/filter bar; Add Product button; per-card Edit/Delete
  (all in-memory, via React state — no backend).
- **Orders** — responsive table (stacked cards on mobile) with Order ID,
  Customer Name, Total Amount, Status, and Date.
- **Customers** — customer cards with Name, Email, Phone Number and Total
  Orders.

## Notes
- All product/order/customer records live in `src/data/` as plain JS
  arrays — edit them directly to change the demo data.
- Add/Edit/Delete on the Products page only updates local component
  state (no persistence between page reloads), since this is a
  frontend-only demo.

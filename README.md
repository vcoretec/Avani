# Avani Feeds — Integrated Operations Platform

## Architecture

```
React Frontend (TypeScript) → Spring Boot REST API → MySQL
```

## Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8+
- Maven 3.9+

## Quick Start

### 1. Database Setup

```bash
mysql -u root -p -e "CREATE DATABASE avani_feeds;"
```

### 2. Backend

```bash
cd backend
# Update src/main/resources/application.yml with your MySQL credentials
mvn spring-boot:run
```

Backend runs on `http://localhost:8080/api`

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### 4. API Docs

Swagger UI: `http://localhost:8080/api/swagger-ui.html`

## Test Credentials

| Username | Password | Role |
|----------|----------|------|
| admin | Admin@123 | System Admin |
| manager | Admin@123 | Management |
| procurement1 | Admin@123 | Procurement |
| warehouse1 | Admin@123 | Warehouse |
| transport1 | Admin@123 | Transport |
| sales1 | Admin@123 | Sales |
| finance1 | Admin@123 | Finance |
| driver1 | Admin@123 | Driver |

## Modules

- **Dashboard** — KPIs, operational summary, alerts
- **Procurement** — Farmer/FPO, purchase orders, approvals
- **Transport** — Trips, tracking, driver experience, freight
- **Warehouse** — Gate entry, weighment, quality, receipts
- **Inventory** — Stock, batches, transfers, reservations
- **Sales** — Customers, orders, dispatch, delivery, invoicing
- **Finance** — Payments, collections, reconciliation
- **Reports** — Procurement, transport, warehouse, sales, finance, profitability

## Database Migrations

Flyway migrations in `backend/src/main/resources/db/migration/`:

| Migration | Description |
|-----------|-------------|
| V1 | Core schema (users, roles, permissions, audit) |
| V2 | Procurement (farmers, products, purchase orders) |
| V3 | Transport (transporters, vehicles, drivers, trips) |
| V4 | Warehouse (gate entries, weighments, quality, receipts) |
| V5 | Inventory (stock, batches, transactions, transfers) |
| V6 | Sales (customers, orders, dispatches, deliveries, invoices) |
| V7 | Finance (payments, collections, reconciliation) |
| V8 | Notifications & Documents |
| V9 | Seed data |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| DB_USERNAME | root | MySQL username |
| DB_PASSWORD | root | MySQL password |
| SERVER_PORT | 8080 | Backend port |
| JWT_SECRET | (dev default) | JWT signing secret |

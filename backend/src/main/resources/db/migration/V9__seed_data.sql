-- V9: Seed data for development
-- Password for all users: Admin@123 (BCrypt hash)
-- $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

-- Permissions
INSERT INTO permissions (code, name, module) VALUES
-- Dashboard
('DASHBOARD_VIEW', 'View Dashboard', 'DASHBOARD'),
-- Procurement
('PROCUREMENT_VIEW', 'View Procurement', 'PROCUREMENT'),
('PROCUREMENT_CREATE', 'Create Purchase Order', 'PROCUREMENT'),
('PROCUREMENT_EDIT', 'Edit Purchase Order', 'PROCUREMENT'),
('PROCUREMENT_APPROVE', 'Approve Purchase Order', 'PROCUREMENT'),
('PROCUREMENT_DELETE', 'Delete Purchase Order', 'PROCUREMENT'),
('FARMER_VIEW', 'View Farmers', 'PROCUREMENT'),
('FARMER_CREATE', 'Create Farmer', 'PROCUREMENT'),
('FARMER_EDIT', 'Edit Farmer', 'PROCUREMENT'),
-- Transport
('TRANSPORT_VIEW', 'View Transport', 'TRANSPORT'),
('TRANSPORT_CREATE', 'Create Trip', 'TRANSPORT'),
('TRANSPORT_EDIT', 'Edit Trip', 'TRANSPORT'),
('TRANSPORT_TRACK', 'Track Vehicles', 'TRANSPORT'),
('DRIVER_TRIP_VIEW', 'View Assigned Trips', 'TRANSPORT'),
('DRIVER_TRIP_UPDATE', 'Update Trip Status', 'TRANSPORT'),
-- Warehouse
('WAREHOUSE_VIEW', 'View Warehouse', 'WAREHOUSE'),
('WAREHOUSE_GATE_ENTRY', 'Create Gate Entry', 'WAREHOUSE'),
('WAREHOUSE_WEIGHMENT', 'Record Weighment', 'WAREHOUSE'),
('WAREHOUSE_QUALITY', 'Quality Inspection', 'WAREHOUSE'),
('WAREHOUSE_RECEIPT', 'Create Receipt', 'WAREHOUSE'),
-- Inventory
('INVENTORY_VIEW', 'View Inventory', 'INVENTORY'),
('INVENTORY_TRANSFER', 'Stock Transfer', 'INVENTORY'),
('INVENTORY_ADJUST', 'Stock Adjustment', 'INVENTORY'),
-- Sales
('SALES_VIEW', 'View Sales', 'SALES'),
('SALES_CREATE', 'Create Sales Order', 'SALES'),
('SALES_EDIT', 'Edit Sales Order', 'SALES'),
('SALES_APPROVE', 'Approve Sales Order', 'SALES'),
('SALES_DISPATCH', 'Create Dispatch', 'SALES'),
('CUSTOMER_VIEW', 'View Customers', 'SALES'),
('CUSTOMER_CREATE', 'Create Customer', 'SALES'),
('CUSTOMER_EDIT', 'Edit Customer', 'SALES'),
-- Finance
('FINANCE_VIEW', 'View Finance', 'FINANCE'),
('FINANCE_PAY', 'Make Payment', 'FINANCE'),
('FINANCE_COLLECT', 'Record Collection', 'FINANCE'),
('FINANCE_RECONCILE', 'Reconcile Transactions', 'FINANCE'),
('FINANCE_APPROVE', 'Approve Financial Transaction', 'FINANCE'),
-- Reports
('REPORTS_VIEW', 'View Reports', 'REPORTS'),
('REPORTS_EXPORT', 'Export Reports', 'REPORTS'),
-- Admin
('ADMIN_USERS', 'Manage Users', 'ADMIN'),
('ADMIN_ROLES', 'Manage Roles', 'ADMIN'),
('ADMIN_AUDIT', 'View Audit Logs', 'ADMIN'),
('ADMIN_SETTINGS', 'System Settings', 'ADMIN');

-- Roles
INSERT INTO roles (name, description) VALUES
('ADMIN', 'System Administrator'),
('MANAGEMENT', 'Management - Dashboard, Approve, Monitor'),
('PROCUREMENT', 'Procurement Team'),
('WAREHOUSE', 'Warehouse Operations'),
('TRANSPORT', 'Transport Management'),
('SALES', 'Sales Team'),
('FINANCE', 'Finance Team'),
('DRIVER', 'Driver - Mobile/Field');

-- Role-Permission mappings
-- ADMIN gets all
INSERT INTO role_permissions (role_id, permission_id)
SELECT (SELECT id FROM roles WHERE name='ADMIN'), id FROM permissions;

-- MANAGEMENT
INSERT INTO role_permissions (role_id, permission_id)
SELECT (SELECT id FROM roles WHERE name='MANAGEMENT'), id FROM permissions
WHERE code IN ('DASHBOARD_VIEW','PROCUREMENT_VIEW','PROCUREMENT_APPROVE','TRANSPORT_VIEW','TRANSPORT_TRACK',
'WAREHOUSE_VIEW','INVENTORY_VIEW','SALES_VIEW','SALES_APPROVE','FINANCE_VIEW','FINANCE_APPROVE','REPORTS_VIEW','REPORTS_EXPORT');

-- PROCUREMENT
INSERT INTO role_permissions (role_id, permission_id)
SELECT (SELECT id FROM roles WHERE name='PROCUREMENT'), id FROM permissions
WHERE code IN ('DASHBOARD_VIEW','PROCUREMENT_VIEW','PROCUREMENT_CREATE','PROCUREMENT_EDIT',
'FARMER_VIEW','FARMER_CREATE','FARMER_EDIT','TRANSPORT_VIEW');

-- WAREHOUSE
INSERT INTO role_permissions (role_id, permission_id)
SELECT (SELECT id FROM roles WHERE name='WAREHOUSE'), id FROM permissions
WHERE code IN ('DASHBOARD_VIEW','WAREHOUSE_VIEW','WAREHOUSE_GATE_ENTRY','WAREHOUSE_WEIGHMENT',
'WAREHOUSE_QUALITY','WAREHOUSE_RECEIPT','INVENTORY_VIEW','INVENTORY_TRANSFER','INVENTORY_ADJUST');

-- TRANSPORT
INSERT INTO role_permissions (role_id, permission_id)
SELECT (SELECT id FROM roles WHERE name='TRANSPORT'), id FROM permissions
WHERE code IN ('DASHBOARD_VIEW','TRANSPORT_VIEW','TRANSPORT_CREATE','TRANSPORT_EDIT','TRANSPORT_TRACK');

-- SALES
INSERT INTO role_permissions (role_id, permission_id)
SELECT (SELECT id FROM roles WHERE name='SALES'), id FROM permissions
WHERE code IN ('DASHBOARD_VIEW','SALES_VIEW','SALES_CREATE','SALES_EDIT','SALES_DISPATCH',
'CUSTOMER_VIEW','CUSTOMER_CREATE','CUSTOMER_EDIT','INVENTORY_VIEW');

-- FINANCE
INSERT INTO role_permissions (role_id, permission_id)
SELECT (SELECT id FROM roles WHERE name='FINANCE'), id FROM permissions
WHERE code IN ('DASHBOARD_VIEW','FINANCE_VIEW','FINANCE_PAY','FINANCE_COLLECT','FINANCE_RECONCILE',
'REPORTS_VIEW','REPORTS_EXPORT');

-- DRIVER
INSERT INTO role_permissions (role_id, permission_id)
SELECT (SELECT id FROM roles WHERE name='DRIVER'), id FROM permissions
WHERE code IN ('DRIVER_TRIP_VIEW','DRIVER_TRIP_UPDATE');

-- Users (password: Admin@123)
INSERT INTO users (username, password, full_name, email, phone, role_id) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'System Admin', 'admin@avanifeeds.com', '9876543210', (SELECT id FROM roles WHERE name='ADMIN'));

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
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'System Admin', 'admin@avanifeeds.com', '9876543210', (SELECT id FROM roles WHERE name='ADMIN')),
('manager', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Rajesh Kumar', 'manager@avanifeeds.com', '9876543211', (SELECT id FROM roles WHERE name='MANAGEMENT')),
('procurement1', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Suresh Patel', 'procurement@avanifeeds.com', '9876543212', (SELECT id FROM roles WHERE name='PROCUREMENT')),
('warehouse1', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Arun Singh', 'warehouse@avanifeeds.com', '9876543213', (SELECT id FROM roles WHERE name='WAREHOUSE')),
('transport1', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Vikram Rao', 'transport@avanifeeds.com', '9876543214', (SELECT id FROM roles WHERE name='TRANSPORT')),
('sales1', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Priya Sharma', 'sales@avanifeeds.com', '9876543215', (SELECT id FROM roles WHERE name='SALES')),
('finance1', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Meera Gupta', 'finance@avanifeeds.com', '9876543216', (SELECT id FROM roles WHERE name='FINANCE')),
('driver1', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Ramesh Driver', 'driver@avanifeeds.com', '9876543217', (SELECT id FROM roles WHERE name='DRIVER'));

-- Products
INSERT INTO products (product_code, name, category, unit, hsn_code, gst_rate) VALUES
('RICE-RAW', 'Raw Rice', 'Rice', 'MT', '1006', 5.00),
('RICE-BOILED', 'Boiled Rice', 'Rice', 'MT', '1006', 5.00),
('PADDY', 'Paddy', 'Paddy', 'MT', '1006', 0.00),
('WHEAT', 'Wheat', 'Wheat', 'MT', '1001', 0.00),
('MAIZE', 'Maize', 'Maize', 'MT', '1005', 5.00);

-- Grades
INSERT INTO grades (product_id, grade_code, name) VALUES
((SELECT id FROM products WHERE product_code='RICE-RAW'), 'A', 'Grade A - Premium'),
((SELECT id FROM products WHERE product_code='RICE-RAW'), 'B', 'Grade B - Standard'),
((SELECT id FROM products WHERE product_code='RICE-RAW'), 'C', 'Grade C - Economy'),
((SELECT id FROM products WHERE product_code='PADDY'), 'A', 'Grade A - Premium'),
((SELECT id FROM products WHERE product_code='PADDY'), 'B', 'Grade B - Standard');

-- Warehouses
INSERT INTO warehouses (warehouse_code, name, address, city, state, pincode, capacity_mt) VALUES
('WH-001', 'Avani Main Warehouse', 'Plot 45, Industrial Area', 'Hyderabad', 'Telangana', '500032', 5000),
('WH-002', 'Avani North Warehouse', 'NH-44, Warehouse Complex', 'Nizamabad', 'Telangana', '503001', 3000);

-- Quality parameters for Paddy
INSERT INTO quality_parameters (product_id, parameter_name, parameter_unit, min_value, max_value, target_value, is_mandatory, deduction_rate, rejection_threshold, display_order) VALUES
((SELECT id FROM products WHERE product_code='PADDY'), 'Moisture', '%', 0, 14, 12, TRUE, 0.5, 17, 1),
((SELECT id FROM products WHERE product_code='PADDY'), 'Foreign Matter', '%', 0, 2, 1, TRUE, 1.0, 5, 2),
((SELECT id FROM products WHERE product_code='PADDY'), 'Broken', '%', 0, 5, 2, TRUE, 0.25, 10, 3),
((SELECT id FROM products WHERE product_code='PADDY'), 'Damaged', '%', 0, 3, 1, TRUE, 0.5, 8, 4),
((SELECT id FROM products WHERE product_code='PADDY'), 'Discolored', '%', 0, 3, 1, FALSE, 0.25, 7, 5);

-- Sample Farmers
INSERT INTO farmers (farmer_code, name, type, contact_person, phone, city, district, state, pincode, status) VALUES
('FRM-001', 'Lakshmi FPO', 'FPO', 'Nagaraj Reddy', '9845012345', 'Warangal', 'Warangal', 'Telangana', '506001', 'ACTIVE'),
('FRM-002', 'Venkatesh Farms', 'FARMER', 'Venkatesh', '9845012346', 'Karimnagar', 'Karimnagar', 'Telangana', '505001', 'ACTIVE'),
('FRM-003', 'Green Valley FPO', 'FPO', 'Srinivas', '9845012347', 'Khammam', 'Khammam', 'Telangana', '507001', 'ACTIVE');

-- Sample Customers
INSERT INTO customers (customer_code, name, contact_person, phone, city, state, pincode, gst_number, credit_limit, payment_terms, payment_days, status) VALUES
('CUS-001', 'Sri Lakshmi Traders', 'Ramakrishna', '9876011001', 'Chennai', 'Tamil Nadu', '600001', '33AABCT1234A1Z1', 5000000, 'Net 30', 30, 'ACTIVE'),
('CUS-002', 'Sai Enterprises', 'Sai Kumar', '9876011002', 'Bangalore', 'Karnataka', '560001', '29AABCS5678B2Z2', 3000000, 'Net 15', 15, 'ACTIVE');

-- Sample Transporters
INSERT INTO transporters (transporter_code, name, contact_person, phone, status) VALUES
('TRN-001', 'Fast Logistics', 'Mahesh', '9870001001', 'ACTIVE'),
('TRN-002', 'Safe Transport Co', 'Raju', '9870001002', 'ACTIVE');

-- Sample Vehicles
INSERT INTO vehicles (vehicle_number, transporter_id, vehicle_type, capacity_mt, status) VALUES
('TS09UA1234', (SELECT id FROM transporters WHERE transporter_code='TRN-001'), 'Truck 16T', 16.000, 'AVAILABLE'),
('AP31TC5678', (SELECT id FROM transporters WHERE transporter_code='TRN-001'), 'Truck 10T', 10.000, 'AVAILABLE'),
('TS07UB9012', (SELECT id FROM transporters WHERE transporter_code='TRN-002'), 'Truck 20T', 20.000, 'AVAILABLE');

-- Sample Drivers
INSERT INTO drivers (driver_code, name, phone, license_number, transporter_id, user_id, status) VALUES
('DRV-001', 'Ramesh Driver', '9876543217', 'TS0920200012345', (SELECT id FROM transporters WHERE transporter_code='TRN-001'), (SELECT id FROM users WHERE username='driver1'), 'AVAILABLE'),
('DRV-002', 'Sunil Kumar', '9870002001', 'AP3120200054321', (SELECT id FROM transporters WHERE transporter_code='TRN-002'), NULL, 'AVAILABLE');

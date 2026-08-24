-- V3: Transport schema
CREATE TABLE transporters (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transporter_code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    address VARCHAR(500),
    gst_number VARCHAR(20),
    pan_number VARCHAR(15),
    status ENUM('ACTIVE','INACTIVE','BLOCKED') NOT NULL DEFAULT 'ACTIVE',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE vehicles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    vehicle_number VARCHAR(20) NOT NULL UNIQUE,
    transporter_id BIGINT,
    vehicle_type VARCHAR(50),
    capacity_mt DECIMAL(8,3),
    gps_device_id VARCHAR(100),
    status ENUM('AVAILABLE','IN_TRANSIT','MAINTENANCE','INACTIVE') NOT NULL DEFAULT 'AVAILABLE',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (transporter_id) REFERENCES transporters(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE drivers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    driver_code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    license_number VARCHAR(30),
    license_expiry DATE,
    transporter_id BIGINT,
    user_id BIGINT,
    status ENUM('AVAILABLE','ON_TRIP','OFF_DUTY','INACTIVE') NOT NULL DEFAULT 'AVAILABLE',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (transporter_id) REFERENCES transporters(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE trips (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    trip_number VARCHAR(30) NOT NULL UNIQUE,
    direction ENUM('INBOUND','OUTBOUND') NOT NULL,
    vehicle_id BIGINT,
    driver_id BIGINT,
    transporter_id BIGINT,
    purchase_order_id BIGINT,
    sales_order_id BIGINT,
    dispatch_id BIGINT,
    origin_name VARCHAR(200),
    origin_address VARCHAR(500),
    origin_latitude DECIMAL(10,8),
    origin_longitude DECIMAL(11,8),
    destination_name VARCHAR(200),
    destination_address VARCHAR(500),
    destination_latitude DECIMAL(10,8),
    destination_longitude DECIMAL(11,8),
    planned_quantity DECIMAL(12,3),
    actual_quantity DECIMAL(12,3),
    quantity_unit VARCHAR(10) DEFAULT 'MT',
    status ENUM('ASSIGNED','STARTED','PICKUP','LOADING','IN_TRANSIT','ARRIVED','DELIVERED','COMPLETED','CANCELLED') NOT NULL DEFAULT 'ASSIGNED',
    assigned_at DATETIME,
    started_at DATETIME,
    pickup_at DATETIME,
    in_transit_at DATETIME,
    arrived_at DATETIME,
    delivered_at DATETIME,
    completed_at DATETIME,
    freight_rate DECIMAL(12,2),
    freight_amount DECIMAL(15,2),
    advance_amount DECIMAL(15,2) DEFAULT 0,
    freight_status ENUM('PENDING','ADVANCE_PAID','PAID','SETTLED') DEFAULT 'PENDING',
    estimated_distance_km DECIMAL(8,2),
    eta DATETIME,
    pod_document_url VARCHAR(500),
    pod_uploaded_at DATETIME,
    pod_verified BOOLEAN DEFAULT FALSE,
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (driver_id) REFERENCES drivers(id),
    FOREIGN KEY (transporter_id) REFERENCES transporters(id),
    FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_trip_number ON trips(trip_number);
CREATE INDEX idx_trip_status ON trips(status);
CREATE INDEX idx_trip_direction ON trips(direction);

CREATE TABLE vehicle_tracking (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    trip_id BIGINT NOT NULL,
    vehicle_id BIGINT NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    speed DECIMAL(6,2),
    recorded_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_tracking_trip ON vehicle_tracking(trip_id);

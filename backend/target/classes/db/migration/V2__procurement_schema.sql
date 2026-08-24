-- ============================================
-- V2: Procurement schema - Farmers, FPOs, Purchase Orders
-- ============================================

-- Farmers / FPOs
CREATE TABLE farmers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    farmer_code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    type ENUM('FARMER', 'FPO') NOT NULL DEFAULT 'FARMER',
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    address_line1 VARCHAR(200),
    address_line2 VARCHAR(200),
    city VARCHAR(100),
    district VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    gst_number VARCHAR(20),
    pan_number VARCHAR(15),
    status ENUM('ACTIVE', 'INACTIVE', 'PENDING_KYC', 'BLOCKED') NOT NULL DEFAULT 'PENDING_KYC',
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_farmers_code ON farmers(farmer_code);
CREATE INDEX idx_farmers_status ON farmers(status);
CREATE INDEX idx_farmers_type ON farmers(type);

-- Farmer KYC documents
CREATE TABLE farmer_kyc (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    document_number VARCHAR(100),
    document_url VARCHAR(500),
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    verified_by BIGINT,
    verified_at DATETIME,
    expiry_date DATE,
    notes VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (farmer_id) REFERENCES farmers(id),
    FOREIGN KEY (verified_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Farmer bank accounts
CREATE TABLE farmer_bank_accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    bank_name VARCHAR(200) NOT NULL,
    branch VARCHAR(200),
    account_number VARCHAR(30) NOT NULL,
    ifsc_code VARCHAR(15) NOT NULL,
    account_holder_name VARCHAR(200),
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (farmer_id) REFERENCES farmers(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Farmer contracts
CREATE TABLE farmer_contracts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    contract_number VARCHAR(30) NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    product VARCHAR(100),
    grade VARCHAR(50),
    agreed_rate DECIMAL(12, 2),
    min_quantity DECIMAL(12, 3),
    max_quantity DECIMAL(12, 3),
    quantity_unit VARCHAR(10) DEFAULT 'MT',
    terms TEXT,
    status ENUM('DRAFT', 'ACTIVE', 'EXPIRED', 'CANCELLED') NOT NULL DEFAULT 'DRAFT',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (farmer_id) REFERENCES farmers(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Products / Materials
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    unit VARCHAR(20) NOT NULL DEFAULT 'MT',
    hsn_code VARCHAR(20),
    gst_rate DECIMAL(5, 2) DEFAULT 0,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Grades
CREATE TABLE grades (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    grade_code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE KEY uk_grade_product (product_id, grade_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Purchase Orders
CREATE TABLE purchase_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    po_number VARCHAR(30) NOT NULL UNIQUE,
    farmer_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    grade_id BIGINT,
    warehouse_id BIGINT,
    quantity DECIMAL(12, 3) NOT NULL,
    quantity_unit VARCHAR(10) DEFAULT 'MT',
    rate DECIMAL(12, 2) NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    payment_terms VARCHAR(200),
    pickup_date DATE,
    delivery_date DATE,
    status ENUM('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'PARTIALLY_RECEIVED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'DRAFT',
    received_quantity DECIMAL(12, 3) DEFAULT 0,
    pending_quantity DECIMAL(12, 3),
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (farmer_id) REFERENCES farmers(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (grade_id) REFERENCES grades(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_po_number ON purchase_orders(po_number);
CREATE INDEX idx_po_farmer ON purchase_orders(farmer_id);
CREATE INDEX idx_po_status ON purchase_orders(status);
CREATE INDEX idx_po_date ON purchase_orders(pickup_date);

-- Purchase Order Items (for multi-item POs)
CREATE TABLE purchase_order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    purchase_order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    grade_id BIGINT,
    quantity DECIMAL(12, 3) NOT NULL,
    rate DECIMAL(12, 2) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    received_quantity DECIMAL(12, 3) DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (grade_id) REFERENCES grades(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

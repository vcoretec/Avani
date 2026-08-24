-- V5: Inventory schema
CREATE TABLE inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    warehouse_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    grade_id BIGINT,
    total_quantity DECIMAL(12,3) NOT NULL DEFAULT 0,
    reserved_quantity DECIMAL(12,3) NOT NULL DEFAULT 0,
    available_quantity DECIMAL(12,3) NOT NULL DEFAULT 0,
    quantity_unit VARCHAR(10) DEFAULT 'MT',
    last_updated DATETIME,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (grade_id) REFERENCES grades(id),
    UNIQUE KEY uk_inv (warehouse_id, product_id, grade_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE inventory_batches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    batch_number VARCHAR(30) NOT NULL UNIQUE,
    inventory_id BIGINT NOT NULL,
    warehouse_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    grade_id BIGINT,
    warehouse_receipt_id BIGINT,
    purchase_order_id BIGINT,
    farmer_id BIGINT,
    quantity DECIMAL(12,3) NOT NULL,
    remaining_quantity DECIMAL(12,3) NOT NULL,
    cost_per_unit DECIMAL(12,2),
    batch_date DATE NOT NULL,
    expiry_date DATE,
    status ENUM('ACTIVE','RESERVED','DEPLETED','EXPIRED') NOT NULL DEFAULT 'ACTIVE',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (inventory_id) REFERENCES inventory(id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (warehouse_receipt_id) REFERENCES warehouse_receipts(id),
    FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id),
    FOREIGN KEY (farmer_id) REFERENCES farmers(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE inventory_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    inventory_id BIGINT NOT NULL,
    batch_id BIGINT,
    transaction_type ENUM('RECEIPT','ISSUE','TRANSFER_IN','TRANSFER_OUT','ADJUSTMENT','RESERVATION','RELEASE') NOT NULL,
    reference_type VARCHAR(50),
    reference_id BIGINT,
    previous_quantity DECIMAL(12,3) NOT NULL,
    change_quantity DECIMAL(12,3) NOT NULL,
    new_quantity DECIMAL(12,3) NOT NULL,
    reason VARCHAR(500),
    performed_by BIGINT,
    approved_by BIGINT,
    transaction_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inventory_id) REFERENCES inventory(id),
    FOREIGN KEY (batch_id) REFERENCES inventory_batches(id),
    FOREIGN KEY (performed_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_inv_txn_type ON inventory_transactions(transaction_type);
CREATE INDEX idx_inv_txn_date ON inventory_transactions(transaction_date);

CREATE TABLE stock_transfers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transfer_number VARCHAR(30) NOT NULL UNIQUE,
    from_warehouse_id BIGINT NOT NULL,
    to_warehouse_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    grade_id BIGINT,
    quantity DECIMAL(12,3) NOT NULL,
    status ENUM('DRAFT','APPROVED','IN_TRANSIT','COMPLETED','CANCELLED') NOT NULL DEFAULT 'DRAFT',
    transfer_date DATETIME,
    completed_date DATETIME,
    requested_by BIGINT,
    approved_by BIGINT,
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (from_warehouse_id) REFERENCES warehouses(id),
    FOREIGN KEY (to_warehouse_id) REFERENCES warehouses(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (requested_by) REFERENCES users(id),
    FOREIGN KEY (approved_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE stock_reservations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    inventory_id BIGINT NOT NULL,
    batch_id BIGINT,
    sales_order_id BIGINT,
    reserved_quantity DECIMAL(12,3) NOT NULL,
    consumed_quantity DECIMAL(12,3) DEFAULT 0,
    status ENUM('RESERVED','PARTIALLY_CONSUMED','CONSUMED','RELEASED') NOT NULL DEFAULT 'RESERVED',
    reserved_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    released_at DATETIME,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (inventory_id) REFERENCES inventory(id),
    FOREIGN KEY (batch_id) REFERENCES inventory_batches(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

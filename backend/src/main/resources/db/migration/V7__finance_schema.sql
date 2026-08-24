-- V7: Finance schema
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    payment_number VARCHAR(30) NOT NULL UNIQUE,
    payment_type ENUM('FARMER_PAYMENT','TRANSPORT_ADVANCE','TRANSPORT_SETTLEMENT','OTHER_PAYABLE') NOT NULL,
    payee_type VARCHAR(50) NOT NULL,
    payee_id BIGINT NOT NULL,
    payee_name VARCHAR(200),
    reference_type VARCHAR(50),
    reference_id BIGINT,
    amount DECIMAL(15,2) NOT NULL,
    payment_mode ENUM('NEFT','RTGS','IMPS','UPI','BANK_TRANSFER','CHEQUE') NOT NULL,
    payment_date DATE NOT NULL,
    transaction_ref VARCHAR(100),
    utr_number VARCHAR(50),
    bank_name VARCHAR(200),
    bank_account VARCHAR(30),
    status ENUM('DRAFT','PENDING','PROCESSING','COMPLETED','FAILED','CANCELLED') NOT NULL DEFAULT 'DRAFT',
    approved_by BIGINT,
    approved_at DATETIME,
    notes VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (approved_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_payment_type ON payments(payment_type);
CREATE INDEX idx_payment_status ON payments(status);

CREATE TABLE collections (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    collection_number VARCHAR(30) NOT NULL UNIQUE,
    customer_id BIGINT NOT NULL,
    invoice_id BIGINT,
    sales_order_id BIGINT,
    amount DECIMAL(15,2) NOT NULL,
    payment_mode ENUM('UPI','PAYMENT_LINK','NEFT','RTGS','IMPS','BANK_TRANSFER','CHEQUE','GATEWAY') NOT NULL,
    collection_date DATE NOT NULL,
    transaction_ref VARCHAR(100),
    utr_number VARCHAR(50),
    gateway_transaction_id VARCHAR(100),
    gateway_order_id VARCHAR(100),
    bank_name VARCHAR(200),
    status ENUM('PENDING','PROCESSING','COMPLETED','FAILED','REVERSED') NOT NULL DEFAULT 'PENDING',
    notes VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (invoice_id) REFERENCES invoices(id),
    FOREIGN KEY (sales_order_id) REFERENCES sales_orders(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE payment_gateway_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    gateway_name VARCHAR(50) NOT NULL,
    gateway_order_id VARCHAR(100),
    gateway_payment_id VARCHAR(100),
    gateway_signature VARCHAR(500),
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status ENUM('CREATED','AUTHORIZED','CAPTURED','FAILED','REFUNDED') NOT NULL,
    payment_method VARCHAR(50),
    fee DECIMAL(10,2) DEFAULT 0,
    tax DECIMAL(10,2) DEFAULT 0,
    settlement_id VARCHAR(100),
    settled_at DATETIME,
    webhook_payload TEXT,
    collection_id BIGINT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (collection_id) REFERENCES collections(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE bank_transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bank_name VARCHAR(200) NOT NULL,
    account_number VARCHAR(30),
    transaction_date DATE NOT NULL,
    value_date DATE,
    description VARCHAR(500),
    reference_number VARCHAR(100),
    utr_number VARCHAR(50),
    debit_amount DECIMAL(15,2) DEFAULT 0,
    credit_amount DECIMAL(15,2) DEFAULT 0,
    balance DECIMAL(15,2),
    party_name VARCHAR(200),
    is_reconciled BOOLEAN NOT NULL DEFAULT FALSE,
    reconciled_with_type VARCHAR(50),
    reconciled_with_id BIGINT,
    reconciled_at DATETIME,
    reconciled_by BIGINT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (reconciled_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_bank_txn_date ON bank_transactions(transaction_date);
CREATE INDEX idx_bank_txn_utr ON bank_transactions(utr_number);
CREATE INDEX idx_bank_txn_recon ON bank_transactions(is_reconciled);

CREATE TABLE reconciliations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    bank_transaction_id BIGINT NOT NULL,
    matched_type VARCHAR(50) NOT NULL,
    matched_id BIGINT NOT NULL,
    match_method ENUM('UTR','REFERENCE','AMOUNT_DATE','MANUAL') NOT NULL,
    matched_amount DECIMAL(15,2) NOT NULL,
    variance DECIMAL(15,2) DEFAULT 0,
    status ENUM('MATCHED','PARTIAL','EXCEPTION','RESOLVED') NOT NULL DEFAULT 'MATCHED',
    resolved_by BIGINT,
    resolved_at DATETIME,
    notes VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (bank_transaction_id) REFERENCES bank_transactions(id),
    FOREIGN KEY (resolved_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

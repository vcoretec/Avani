-- V8: Notifications & Documents
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    channel ENUM('IN_APP','EMAIL','SMS') NOT NULL DEFAULT 'IN_APP',
    entity_type VARCHAR(100),
    entity_id BIGINT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at DATETIME,
    sent_at DATETIME,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_notif_user ON notifications(user_id, is_read);

CREATE TABLE documents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    document_code VARCHAR(30) NOT NULL UNIQUE,
    entity_type VARCHAR(100) NOT NULL,
    entity_id BIGINT NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    content_type VARCHAR(100),
    uploaded_by BIGINT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(50) DEFAULT 'system',
    updated_by VARCHAR(50),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_doc_entity ON documents(entity_type, entity_id);

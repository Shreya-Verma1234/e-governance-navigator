
-- E-Governance Navigator Database Setup

-- Create database
CREATE DATABASE IF NOT EXISTS e_governance_db;
USE e_governance_db;

-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    user_type ENUM('citizen', 'admin', 'government_official') NOT NULL DEFAULT 'citizen',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Tax Records table
CREATE TABLE IF NOT EXISTS tax_records (
    tax_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    tax_type VARCHAR(50) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    tax_year INT NOT NULL,
    payment_status ENUM('pending', 'paid', 'overdue') DEFAULT 'pending',
    payment_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create Utility Bills table
CREATE TABLE IF NOT EXISTS utility_bills (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    bill_type ENUM('electricity', 'water', 'gas', 'internet', 'other') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    bill_date DATE NOT NULL,
    due_date DATE NOT NULL,
    payment_status ENUM('pending', 'paid', 'overdue') DEFAULT 'pending',
    payment_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create FIR Records table
CREATE TABLE IF NOT EXISTS fir_records (
    fir_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    incident_type VARCHAR(100) NOT NULL,
    incident_date DATE NOT NULL,
    incident_location TEXT NOT NULL,
    description TEXT NOT NULL,
    witnesses TEXT,
    status ENUM('submitted', 'under_investigation', 'closed', 'rejected') DEFAULT 'submitted',
    file_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create Personal Records table
CREATE TABLE IF NOT EXISTS personal_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    document_type ENUM('birth_certificate', 'death_certificate', 'marriage_certificate', 'property_deed', 'passport', 'driving_license', 'other') NOT NULL,
    document_number VARCHAR(50) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    issuing_authority VARCHAR(100) NOT NULL,
    document_status ENUM('active', 'expired', 'revoked') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create Legal Documents table
CREATE TABLE IF NOT EXISTS legal_documents (
    document_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    case_number VARCHAR(50),
    document_title VARCHAR(100) NOT NULL,
    document_type ENUM('affidavit', 'court_order', 'legal_notice', 'power_of_attorney', 'other') NOT NULL,
    filing_date DATE NOT NULL,
    court_name VARCHAR(100),
    status ENUM('pending', 'approved', 'rejected', 'in_process') DEFAULT 'pending',
    document_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create Payment Transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    related_id INT NOT NULL,
    transaction_type ENUM('tax', 'utility', 'fine', 'fee', 'other') NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'net_banking', 'upi', 'wallet', 'other') NOT NULL,
    transaction_status ENUM('initiated', 'completed', 'failed', 'refunded') DEFAULT 'initiated',
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reference_number VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert demo admin user
INSERT INTO users (username, password, email, full_name, user_type)
VALUES ('admin', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'admin@egov.com', 'System Administrator', 'admin');

-- Insert demo citizen user
INSERT INTO users (username, password, email, full_name, phone_number, address, user_type) 
VALUES ('citizen', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'citizen@example.com', 'Demo Citizen', '9876543210', '123 Demo Street, Demo City', 'citizen');

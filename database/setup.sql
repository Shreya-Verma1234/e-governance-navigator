
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

-- Create Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    notification_type ENUM('alert', 'reminder', 'update', 'payment', 'other') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
    faq_id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create News and Updates table
CREATE TABLE IF NOT EXISTS news_updates (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    image_path VARCHAR(255),
    is_published BOOLEAN DEFAULT TRUE,
    published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- Create Feedback table
CREATE TABLE IF NOT EXISTS feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    service_type VARCHAR(50) NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create Property Records table
CREATE TABLE IF NOT EXISTS property_records (
    property_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    property_type ENUM('residential', 'commercial', 'agricultural', 'industrial') NOT NULL,
    address TEXT NOT NULL,
    area_size DECIMAL(10,2) NOT NULL,
    area_unit VARCHAR(20) NOT NULL,
    registration_date DATE NOT NULL,
    market_value DECIMAL(14,2) NOT NULL,
    is_mortgaged BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create Service Requests table
CREATE TABLE IF NOT EXISTS service_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    request_details TEXT NOT NULL,
    status ENUM('pending', 'in_progress', 'completed', 'rejected') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    assigned_to INT,
    requested_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_date TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (assigned_to) REFERENCES users(user_id)
);

-- Insert demo admin user
INSERT INTO users (username, password, email, full_name, user_type)
VALUES ('admin', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'admin@egov.com', 'System Administrator', 'admin');

-- Insert demo citizen users
INSERT INTO users (username, password, email, full_name, phone_number, address, user_type) 
VALUES 
('citizen', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'citizen@example.com', 'Demo Citizen', '9876543210', '123 Demo Street, Demo City', 'citizen'),
('janedoe', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'jane@example.com', 'Jane Doe', '9876543211', '456 Main Street, Sample City', 'citizen'),
('johnsmith', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'john@example.com', 'John Smith', '9876543212', '789 Oak Avenue, Demo Town', 'citizen');

-- Insert demo government official user
INSERT INTO users (username, password, email, full_name, phone_number, address, user_type)
VALUES ('official', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'official@egov.com', 'Government Official', '9876543213', 'Government Complex, Capital City', 'government_official');

-- Insert sample tax records
INSERT INTO tax_records (user_id, tax_type, amount, tax_year, payment_status)
VALUES 
(2, 'property_tax', 5000.00, 2023, 'pending'),
(2, 'income_tax', 12000.00, 2022, 'paid'),
(3, 'property_tax', 4500.00, 2023, 'pending'),
(4, 'income_tax', 15000.00, 2022, 'overdue');

-- Insert sample utility bills
INSERT INTO utility_bills (user_id, bill_type, amount, bill_date, due_date, payment_status)
VALUES 
(2, 'electricity', 1200.50, '2023-05-01', '2023-05-15', 'pending'),
(2, 'water', 450.75, '2023-05-01', '2023-05-15', 'paid'),
(3, 'electricity', 980.25, '2023-05-01', '2023-05-15', 'pending'),
(4, 'gas', 750.00, '2023-05-01', '2023-05-15', 'overdue');

-- Insert sample FIR records
INSERT INTO fir_records (user_id, incident_type, incident_date, incident_location, description, witnesses, status)
VALUES 
(2, 'theft', '2023-04-15', 'Market Area, Demo City', 'Mobile phone stolen while shopping at central market', 'Two shop owners witnessed the incident', 'under_investigation'),
(3, 'vehicle_accident', '2023-04-20', 'Highway 7, Near Demo Town', 'Two-vehicle collision with minor injuries', 'Three passersby and traffic camera footage', 'submitted');

-- Insert sample personal records
INSERT INTO personal_records (user_id, document_type, document_number, issue_date, expiry_date, issuing_authority, document_status)
VALUES 
(2, 'passport', 'P1234567', '2020-01-15', '2030-01-14', 'Passport Authority', 'active'),
(2, 'driving_license', 'DL987654', '2019-05-20', '2029-05-19', 'Regional Transport Office', 'active'),
(3, 'birth_certificate', 'BC123456', '1985-08-10', NULL, 'Municipal Corporation', 'active'),
(4, 'property_deed', 'PD654321', '2018-11-25', NULL, 'Revenue Department', 'active');

-- Insert sample legal documents
INSERT INTO legal_documents (user_id, case_number, document_title, document_type, filing_date, court_name, status)
VALUES 
(2, 'CASE2023001', 'Land Dispute Resolution', 'affidavit', '2023-03-10', 'District Court', 'pending'),
(3, 'CASE2023002', 'Divorce Proceedings', 'court_order', '2023-02-15', 'Family Court', 'in_process');

-- Insert sample payment transactions
INSERT INTO payment_transactions (user_id, related_id, transaction_type, amount, payment_method, transaction_status, reference_number)
VALUES 
(2, 2, 'tax', 12000.00, 'net_banking', 'completed', 'TAX20230001'),
(2, 2, 'utility', 450.75, 'credit_card', 'completed', 'UTIL20230001');

-- Insert sample FAQs
INSERT INTO faqs (category, question, answer, is_published)
VALUES 
('Tax', 'How do I pay my property tax online?', 'To pay your property tax online, log in to your account, go to the Tax Services section, select Property Tax, enter your property details, choose a payment method, and complete the transaction.', TRUE),
('Utility Bills', 'What happens if I miss the due date for my utility bill?', 'If you miss the due date, you may be charged a late fee. Extended delays may lead to service disconnection. Contact customer service immediately to arrange payment.', TRUE),
('FIR', 'How can I check the status of my FIR?', 'You can check the status of your FIR by logging into your account, navigating to the "My FIRs" section, and selecting the specific FIR to view its current status and updates.', TRUE),
('Documents', 'What documents do I need to apply for a birth certificate?', 'You need to provide a hospital discharge certificate, parents\' ID proofs, and a completed application form. For children over 1 year, additional documents may be required.', TRUE);

-- Insert sample news updates
INSERT INTO news_updates (title, content, is_published, created_by)
VALUES 
('New Tax Filing System Launched', 'The government has introduced a simplified tax filing system to make the process easier for citizens. The new system features an intuitive interface and automated calculations to reduce errors and processing time.', TRUE, 1),
('Utility Bill Payment Deadline Extended', 'Due to the recent system maintenance, the deadline for utility bill payments has been extended by 15 days. No late fees will be charged during this period.', TRUE, 1),
('E-FIR System Enhancements', 'The E-FIR system has been enhanced with new features including real-time status tracking and automated notifications. Citizens can now upload evidence directly through the portal.', TRUE, 1);

-- Insert sample feedback
INSERT INTO feedback (user_id, service_type, rating, comments)
VALUES 
(2, 'Tax Payment', 4, 'Easy to use, but could be faster during peak hours.'),
(3, 'FIR Filing', 5, 'Very efficient process. Much better than visiting the police station in person.'),
(4, 'Utility Bill Payment', 3, 'The interface is confusing. Need better instructions for first-time users.');

-- Insert sample property records
INSERT INTO property_records (user_id, property_type, address, area_size, area_unit, registration_date, market_value)
VALUES 
(2, 'residential', '123 Demo Street, Demo City', 1500.00, 'sq_ft', '2018-05-12', 15000000.00),
(3, 'agricultural', 'Rural Area, Demo District', 5.50, 'acres', '2019-11-08', 8000000.00);

-- Insert sample service requests
INSERT INTO service_requests (user_id, service_type, request_details, status, priority, assigned_to)
VALUES 
(2, 'address_update', 'Need to update address on all my government documents after recent relocation', 'in_progress', 'medium', 5),
(3, 'document_correction', 'Correction needed in name spelling on birth certificate', 'pending', 'high', NULL);

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, notification_type, is_read)
VALUES 
(2, 'Tax Payment Due', 'Your property tax payment for 2023 is due in 5 days.', 'reminder', FALSE),
(2, 'FIR Status Update', 'Your FIR #FIR2023001 status has been updated to "under investigation".', 'update', TRUE),
(3, 'Bill Payment Confirmed', 'Your electricity bill payment of $980.25 has been successfully processed.', 'payment', FALSE);

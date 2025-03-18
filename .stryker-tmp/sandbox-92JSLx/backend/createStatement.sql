CREATE DATABASE IF NOT EXISTS user_auth;

USE user_auth;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE email_batches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_uploads_id INT UNIQUE,  -- SnapValid's upload ID
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE emails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    batch_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    FOREIGN KEY (batch_id) REFERENCES email_batches(id) ON DELETE CASCADE
);
ALTER TABLE emails
ADD COLUMN accept_all BOOLEAN,
ADD COLUMN role BOOLEAN,
ADD COLUMN free_email BOOLEAN,
ADD COLUMN disposable BOOLEAN,
ADD COLUMN spamtrap BOOLEAN,
ADD COLUMN result VARCHAR(50),
ADD COLUMN message TEXT;


DROP USER IF EXISTS "dev_admin"@"%";
CREATE USER "dev_admin"@"%" IDENTIFIED BY "Creative1";
GRANT ALL PRIVILEGES ON user_auth.* TO "dev_admin"@"%";

DROP USER IF EXISTS "dev_admin"@"localhost";
CREATE USER "dev_admin"@"localhost" IDENTIFIED BY "Creative1";
GRANT ALL PRIVILEGES ON user_auth.* TO "dev_admin"@"localhost";

FLUSH PRIVILEGES;

/*

    Keeping it simple for now, but you can expand this with more fields as needed.
    
 CREATE TABLE IF NOT EXISTS sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reset_token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
); */
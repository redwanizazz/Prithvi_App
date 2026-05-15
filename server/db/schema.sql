
CREATE TABLE species (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  scientific_name VARCHAR(255) NOT NULL,
  climate_zone VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE batches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  batch_number VARCHAR(100) UNIQUE NOT NULL,
  species_id INT NOT NULL,
  created_by VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (species_id) REFERENCES species(id) ON DELETE CASCADE
);

CREATE TABLE qr_codes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(255) UNIQUE NOT NULL,
  batch_id INT NOT NULL,
  species_id INT NOT NULL,
  scanned_at TIMESTAMP NULL DEFAULT NULL,
  season_detected ENUM('pre-monsoon','monsoon','post-monsoon','dry-winter') NULL DEFAULT NULL,
  day_zero TIMESTAMP NULL DEFAULT NULL,
  fcm_token VARCHAR(500) NULL DEFAULT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  FOREIGN KEY (species_id) REFERENCES species(id) ON DELETE CASCADE
);

CREATE TABLE care_schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  species_id INT NOT NULL,
  season ENUM('pre-monsoon','monsoon','post-monsoon','dry-winter') NOT NULL,
  day_offset INT NOT NULL,
  action_type ENUM('water','weed','fertilise','germination','harvest') NOT NULL,
  message_title VARCHAR(255) NOT NULL,
  message_body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (species_id) REFERENCES species(id) ON DELETE CASCADE
);

CREATE TABLE notifications_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  qr_code_id INT NOT NULL,
  action_type VARCHAR(100) NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('sent','failed') NOT NULL,
  FOREIGN KEY (qr_code_id) REFERENCES qr_codes(id) ON DELETE CASCADE
);

CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

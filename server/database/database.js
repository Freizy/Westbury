const mysql = require("mysql2/promise");
require("dotenv").config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "luxury_apartments_accra",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

//New db connection for online
const urlDB = `mysql://${process.env.MYSQLUSER} :${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST} :${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`


// Create connection pool
//const pool = mysql.createPool(dbConfig);
const pool = mysql.createPool(urlDB);




//const connection = mysql.createConnection(urlDB);



// Initialize database and create tables
async function initializeDatabase() {
  try {
    // Test connection
    const connection = await pool.getConnection();
    console.log("✅ MySQL database connected successfully");
    connection.release();

    // Create database if it doesn't exist
    //const dbName = dbConfig.database;
    const dbName = urlDB.database;

    await pool.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    await pool.query(`USE ${dbName}`);

    // Create tables
    await createTables();
    console.log("✅ Database tables created successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw error;
  }
}

// Create all necessary tables
async function createTables() {
  // Users table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user', 'superadmin') DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Properties table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS properties (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL,
      location VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      bedrooms INT NOT NULL,
      bathrooms INT NOT NULL,
      area DECIMAL(8,2),
      type ENUM('apartment', 'penthouse', 'studio') DEFAULT 'apartment',
      status ENUM('available', 'rented', 'maintenance') DEFAULT 'available',
      available BOOLEAN DEFAULT TRUE,
      featured BOOLEAN DEFAULT FALSE,
      images JSON,
      amenities JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Bookings table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      property_id INT NOT NULL,
      user_id INT,
      guest_name VARCHAR(100) NOT NULL,
      guest_email VARCHAR(100) NOT NULL,
      guest_phone VARCHAR(20),
      check_in_date DATE NOT NULL,
      check_out_date DATE NOT NULL,
      guests_count INT DEFAULT 1,
      total_amount DECIMAL(10,2) NOT NULL,
      status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
      special_requests TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Contact inquiries table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      phone VARCHAR(20),
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      property_id INT,
      status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Staff table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS staff (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(20),
      position VARCHAR(100) NOT NULL,
      department VARCHAR(100),
      hire_date DATE NOT NULL,
      salary DECIMAL(10,2),
      status ENUM('active', 'inactive', 'terminated') DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Attendance table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INT AUTO_INCREMENT PRIMARY KEY,
      staff_id INT NOT NULL,
      date DATE NOT NULL,
      time_in TIME,
      time_out TIME,
      hours_worked DECIMAL(4,2),
      status ENUM('present', 'absent', 'late', 'half-day') DEFAULT 'present',
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE
    )
  `);

  // Inventory table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(100),
      quantity INT NOT NULL DEFAULT 0,
      min_quantity INT NOT NULL DEFAULT 0,
      last_updated DATETIME,
      unit VARCHAR(20) NOT NULL,
      unit_price DECIMAL(10,2),
      supplier VARCHAR(255),
      location VARCHAR(255),
      min_stock_level INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

// Database query functions
async function query(sql, params = []) {
  try {
    const [rows] = await pool.query(sql, params);
    return rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

async function run(sql, params = []) {
  try {
    const [result] = await pool.query(sql, params);
    return result;
  } catch (error) {
    console.error("Database run error:", error);
    throw error;
  }
}

module.exports = {
  pool,
  initializeDatabase,
  query,
  run,
};

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db = null;

export async function getDB() {
    if (!db) {
        db = await open({
            filename: path.join(__dirname, '..', 'database.sqlite'),
            driver: sqlite3.Database
        });
        
        // Initialize database with tables
        await initializeDatabase();
    }
    return db;
}

async function initializeDatabase() {
    // Create users table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            role TEXT CHECK(role IN ('admin', 'user')) DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Create products table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            category TEXT,
            in_stock BOOLEAN DEFAULT 1,
            created_by INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES users(id)
        )
    `);

    // Check if we need to insert sample data
    const userCount = await db.get('SELECT COUNT(*) as count FROM users');
    if (userCount.count === 0) {
        // Insert sample users (password is 'password123' hashed)
        await db.exec(`
            INSERT INTO users (email, password, name, role) VALUES
            ('admin@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin'),
            ('user@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Regular User', 'user')
        `);

        // Insert sample products
        await db.exec(`
            INSERT INTO products (name, description, price, category, in_stock, created_by) VALUES
            ('Laptop', 'High-performance laptop', 999.99, 'Electronics', 1, 1),
            ('Coffee Mug', 'Ceramic coffee mug', 12.99, 'Home', 1, 1),
            ('Desk Chair', 'Ergonomic office chair', 199.99, 'Furniture', 1, 2),
            ('Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 'Electronics', 1, 2),
            ('Notebook', 'Premium quality notebook', 8.99, 'Office', 1, 1),
            ('Desk Lamp', 'LED desk lamp with adjustable brightness', 45.99, 'Home', 0, 2)
        `);
        
        console.log('Sample data inserted successfully');
    }
}

export default getDB;

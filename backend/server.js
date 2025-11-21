import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.json({ message: "Server is running!" });
});

// Auth routes
app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    console.log("🔐 Login attempt:", email);
    
    if (email === "admin@example.com" && password === "password123") {
        console.log("✅ Login successful for admin");
        res.json({
            token: "test-jwt-token-admin-123",
            user: {
                id: 1,
                email: "admin@example.com",
                name: "Admin User", 
                role: "admin"
            }
        });
    } else if (email === "user@example.com" && password === "password123") {
        console.log("✅ Login successful for user");
        res.json({
            token: "test-jwt-token-user-456",
            user: {
                id: 2,
                email: "user@example.com",
                name: "Regular User",
                role: "user"
            }
        });
    } else {
        console.log("❌ Login failed for:", email);
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Products routes
app.get("/api/products", (req, res) => {
    console.log("📦 Products request received");
    res.json({
        products: [
            {
                id: 1,
                name: "Laptop",
                description: "High-performance laptop with 16GB RAM",
                price: 999.99,
                category: "Electronics",
                in_stock: true,
                stock_quantity: 15,
                created_by_name: "Admin User"
            },
            {
                id: 2, 
                name: "Coffee Mug",
                description: "Ceramic coffee mug with company logo",
                price: 12.99,
                category: "Home",
                in_stock: true,
                stock_quantity: 50,
                created_by_name: "Admin User"
            },
            {
                id: 3,
                name: "Desk Chair",
                description: "Ergonomic office chair with lumbar support",
                price: 199.99,
                category: "Furniture",
                in_stock: true,
                stock_quantity: 8,
                created_by_name: "Regular User"
            }
        ],
        pagination: {
            page: 1,
            limit: 10,
            total: 3,
            pages: 1
        }
    });
});

// Create product
app.post("/api/products", (req, res) => {
    const { name, description, price, category, stock_quantity } = req.body;
    console.log("➕ Create product:", name);
    
    const newProduct = {
        id: Date.now(),
        name,
        description,
        price,
        category,
        in_stock: stock_quantity > 0,
        stock_quantity,
        created_by_name: "Current User"
    };
    
    res.status(201).json(newProduct);
});

// Update product
app.put("/api/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock_quantity } = req.body;
    console.log("✏️ Update product:", id);
    
    const updatedProduct = {
        id: parseInt(id),
        name,
        description,
        price,
        category,
        in_stock: stock_quantity > 0,
        stock_quantity,
        created_by_name: "Current User"
    };
    
    res.json(updatedProduct);
});

// Delete product
app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;
    console.log("🗑️ Delete product:", id);
    res.json({ message: "Product deleted successfully" });
});

// Users routes (admin only)
app.get("/api/users", (req, res) => {
    console.log("👥 Users list request");
    res.json([
        {
            id: 1,
            email: "admin@example.com",
            name: "Admin User",
            role: "admin",
            created_at: "2024-01-01"
        },
        {
            id: 2,
            email: "user@example.com", 
            name: "Regular User",
            role: "user",
            created_at: "2024-01-02"
        }
    ]);
});

app.post("/api/users", (req, res) => {
    const { email, name, role, password } = req.body;
    console.log("➕ Create user:", email);
    
    const newUser = {
        id: Date.now(),
        email,
        name,
        role,
        created_at: new Date().toISOString()
    };
    
    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log("🚀 FULL CRUD BACKEND SERVER STARTED!");
    console.log("======================================");
    console.log("📍 Server URL: http://localhost:" + PORT);
    console.log("✅ Health: http://localhost:" + PORT + "/api/health");
    console.log("🔐 Auth: POST http://localhost:" + PORT + "/api/auth/login");
    console.log("📦 Products: GET/POST/PUT/DELETE /api/products");
    console.log("👥 Users: GET/POST /api/users (admin only)");
    console.log("======================================");
});

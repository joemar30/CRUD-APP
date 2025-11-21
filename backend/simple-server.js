import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    console.log("Health check received");
    res.json({ message: "Server is running!" });
});

app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", email);
    
    if (email === "admin@example.com" && password === "password123") {
        console.log("Login successful for admin");
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
        console.log("Login successful for user");
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
        console.log("Login failed for:", email);
        res.status(401).json({ message: "Invalid credentials" });
    }
});

app.get("/api/products", (req, res) => {
    console.log("Products request received");
    res.json({
        products: [
            {
                id: 1,
                name: "Laptop",
                description: "High-performance laptop with 16GB RAM",
                price: 999.99,
                category: "Electronics",
                in_stock: true,
                created_by_name: "Admin User"
            },
            {
                id: 2, 
                name: "Coffee Mug",
                description: "Ceramic coffee mug with company logo",
                price: 12.99,
                category: "Home",
                in_stock: true,
                created_by_name: "Admin User"
            },
            {
                id: 3,
                name: "Desk Chair",
                description: "Ergonomic office chair with lumbar support",
                price: 199.99,
                category: "Furniture",
                in_stock: true, 
                created_by_name: "Regular User"
            },
            {
                id: 4,
                name: "Wireless Mouse",
                description: "Bluetooth wireless mouse",
                price: 29.99,
                category: "Electronics", 
                in_stock: false,
                created_by_name: "Regular User"
            }
        ],
        pagination: {
            page: 1,
            limit: 10,
            total: 4,
            pages: 1
        }
    });
});

// Handle product deletion (admin only)
app.delete("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    console.log("Delete request for product:", productId);
    res.json({ message: "Product deleted successfully" });
});

app.listen(PORT, () => {
    console.log("🚀 BACKEND SERVER STARTED SUCCESSFULLY!");
    console.log("========================================");
    console.log("📍 Server URL: http://localhost:" + PORT);
    console.log("✅ Health Check: http://localhost:" + PORT + "/api/health");
    console.log("🔐 Login API: POST http://localhost:" + PORT + "/api/auth/login");
    console.log("📦 Products API: GET http://localhost:" + PORT + "/api/products");
    console.log("========================================");
    console.log("Ready to accept connections! 🎉");
});

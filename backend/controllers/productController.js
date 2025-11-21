import { getDB } from '../config/database.js';

export const getProducts = async (req, res) => {
    try {
        const { search, category, in_stock, page = 1, limit = 10 } = req.query;
        const db = await getDB();
        
        let query = `
            SELECT p.*, u.name as created_by_name 
            FROM products p 
            LEFT JOIN users u ON p.created_by = u.id 
            WHERE 1=1
        `;
        const params = [];

        if (search) {
            query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        if (category) {
            query += ' AND p.category = ?';
            params.push(category);
        }

        if (in_stock !== undefined) {
            query += ' AND p.in_stock = ?';
            params.push(in_stock === 'true' ? 1 : 0);
        }

        // Count total records for pagination
        const countQuery = `SELECT COUNT(*) as total FROM (${query})`;
        const countResult = await db.get(countQuery, params);
        const total = countResult.total;

        // Add pagination
        query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
        const offset = (page - 1) * limit;
        params.push(parseInt(limit), offset);

        const products = await db.all(query, params);

        res.json({
            products,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await getDB();
        
        const product = await db.get(
            `SELECT p.*, u.name as created_by_name 
             FROM products p 
             LEFT JOIN users u ON p.created_by = u.id 
             WHERE p.id = ?`,
            [id]
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, in_stock } = req.body;
        const db = await getDB();
        
        if (!name || !price) {
            return res.status(400).json({ message: 'Name and price are required' });
        }

        const result = await db.run(
            'INSERT INTO products (name, description, price, category, in_stock, created_by) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, parseFloat(price), category, in_stock ? 1 : 0, req.user.id]
        );

        const product = await db.get(
            `SELECT p.*, u.name as created_by_name 
             FROM products p 
             LEFT JOIN users u ON p.created_by = u.id 
             WHERE p.id = ?`,
            [result.lastID]
        );

        res.status(201).json(product);
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, in_stock } = req.body;
        const db = await getDB();

        const result = await db.run(
            'UPDATE products SET name = ?, description = ?, price = ?, category = ?, in_stock = ? WHERE id = ?',
            [name, description, parseFloat(price), category, in_stock ? 1 : 0, id]
        );

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const product = await db.get(
            `SELECT p.*, u.name as created_by_name 
             FROM products p 
             LEFT JOIN users u ON p.created_by = u.id 
             WHERE p.id = ?`,
            [id]
        );

        res.json(product);
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await getDB();

        const result = await db.run(
            'DELETE FROM products WHERE id = ?',
            [id]
        );

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

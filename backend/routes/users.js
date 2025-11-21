import express from 'express';
import bcrypt from 'bcryptjs';
import { getDB } from '../config/database.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const db = await getDB();
        const users = await db.all('SELECT id, email, name, role, created_at FROM users');
        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create user (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Email, password, and name are required' });
        }

        const db = await getDB();
        
        // Check if user already exists
        const existingUser = await db.get('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await db.run(
            'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
            [email, hashedPassword, name, role || 'user']
        );

        const newUser = await db.get(
            'SELECT id, email, name, role, created_at FROM users WHERE id = ?',
            [result.lastID]
        );

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, role } = req.body;
        
        const db = await getDB();
        const result = await db.run(
            'UPDATE users SET email = ?, name = ?, role = ? WHERE id = ?',
            [email, name, role, id]
        );

        if (result.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await db.get(
            'SELECT id, email, name, role, created_at FROM users WHERE id = ?',
            [id]
        );

        res.json(updatedUser);
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Prevent admin from deleting themselves
        if (parseInt(id) === req.user.id) {
            return res.status(400).json({ message: 'Cannot delete your own account' });
        }

        const db = await getDB();
        const result = await db.run('DELETE FROM users WHERE id = ?', [id]);

        if (result.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

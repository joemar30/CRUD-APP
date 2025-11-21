import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const AddUser = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/users`, formData);
      showNotification('User created successfully!');
      setFormData({
        email: '',
        name: '',
        password: '',
        role: 'user'
      });
      
      if (onUserAdded) {
        onUserAdded();
      }
    } catch (error) {
      console.error('Error creating user:', error);
      showNotification('Error creating user', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          <i className={`fas fa-${notification.type === 'success' ? 'check' : 'exclamation'}-circle`}></i>
          {notification.message}
        </div>
      )}

      <div className="page-title">
        <h1>Add New User</h1>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="user@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter secure password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">User Role *</label>
              <select
                id="role"
                name="role"
                className="form-control"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="user">User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <div className="form-help">
            <p><strong>Role Permissions:</strong></p>
            <ul>
              <li><strong>User:</strong> Can view products and manage stock</li>
              <li><strong>Admin:</strong> Full access to all features including user management</li>
            </ul>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating User...' : 'Create User'}
            </button>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => setFormData({
                email: '',
                name: '',
                password: '',
                role: 'user'
              })}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

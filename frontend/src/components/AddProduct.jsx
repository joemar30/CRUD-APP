import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'http://localhost:5000/api';

const AddProduct = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock_quantity: ''
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
      const response = await axios.post(`${API_BASE}/products`, {
        ...formData,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity)
      });

      showNotification('Product added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock_quantity: ''
      });
      
      if (onProductAdded) {
        onProductAdded();
      }
    } catch (error) {
      console.error('Error adding product:', error);
      showNotification('Error adding product', 'error');
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
        <h1>Add New Product</h1>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Enter product description"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Home">Home</option>
                <option value="Furniture">Furniture</option>
                <option value="Office">Office</option>
                <option value="Clothing">Clothing</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="stock_quantity">Initial Stock *</label>
              <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                className="form-control"
                value={formData.stock_quantity}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                stock_quantity: ''
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

export default AddProduct;

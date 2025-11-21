import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'http://localhost:5000/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState('');
  const [pagination, setPagination] = useState({});
  const [notification, setNotification] = useState('');
  
  const { isAdmin } = useAuth();

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        search,
        ...(category && { category }),
        ...(inStock && { in_stock: inStock }),
        page,
        limit: 6
      });

      const response = await axios.get(`${API_BASE}/products?${params}`);
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
      showNotification('Error fetching products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, inStock]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      showNotification('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      showNotification('Error deleting product', 'error');
    }
  };

  const updateStock = async (id, newQuantity) => {
    try {
      const product = products.find(p => p.id === id);
      await axios.put(`${API_BASE}/products/${id}`, {
        ...product,
        stock_quantity: newQuantity,
        in_stock: newQuantity > 0
      });
      showNotification('Stock updated successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error updating stock:', error);
      showNotification('Error updating stock', 'error');
    }
  };

  if (loading) {
    return <div className="container">Loading products...</div>;
  }

  return (
    <div className="container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          <i className={`fas fa-${notification.type === 'success' ? 'check' : 'exclamation'}-circle`}></i>
          {notification.message}
        </div>
      )}

      <div className="page-title">
        <h1>Product Management</h1>
        <div className="total-products">
          Total: {pagination.total} products
        </div>
      </div>

      <div className="controls">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-sort">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Home">Home</option>
            <option value="Furniture">Furniture</option>
            <option value="Office">Office</option>
          </select>
          <select value={inStock} onChange={(e) => setInStock(e.target.value)}>
            <option value="">All Stock</option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-header">
              <div className="product-image">
                <i className="fas fa-box"></i>
              </div>
              <div className="product-name">{product.name}</div>
              <div className="product-category">{product.category}</div>
            </div>
            <div className="product-details">
              <div className="product-detail">
                <i className="fas fa-dollar-sign"></i>
                <span>${product.price}</span>
              </div>
              <div className="product-detail">
                <i className="fas fa-info-circle"></i>
                <span>{product.description}</span>
              </div>
              <div className="product-detail stock-info">
                <i className="fas fa-cube"></i>
                <span>Stock: {product.stock_quantity}</span>
                <span className={`stock-status ${product.in_stock ? 'in-stock' : 'out-of-stock'}`}>
                  {product.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="product-detail">
                <i className="fas fa-user"></i>
                <span>Added by: {product.created_by_name}</span>
              </div>
            </div>
            <div className="product-actions">
              {isAdmin && (
                <>
                  <button className="btn btn-outline">
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </>
              )}
              <div className="stock-controls">
                <button 
                  className="btn btn-warning btn-sm"
                  onClick={() => updateStock(product.id, product.stock_quantity - 1)}
                  disabled={product.stock_quantity <= 0}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="stock-quantity">{product.stock_quantity}</span>
                <button 
                  className="btn btn-success btn-sm"
                  onClick={() => updateStock(product.id, product.stock_quantity + 1)}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-box-open"></i>
          <h3>No products found</h3>
          <p>Try adjusting your search or add a new product.</p>
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="pagination">
          <button 
            disabled={pagination.page === 1}
            onClick={() => fetchProducts(pagination.page - 1)}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          
          {[...Array(pagination.pages)].map((_, i) => (
            <button
              key={i + 1}
              className={pagination.page === i + 1 ? 'active' : ''}
              onClick={() => fetchProducts(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            disabled={pagination.page === pagination.pages}
            onClick={() => fetchProducts(pagination.page + 1)}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;

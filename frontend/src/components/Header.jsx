import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Header = ({ user, onLogout, activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { key: 'products', label: 'Products', icon: 'fa-box' },
    { key: 'add-product', label: 'Add Product', icon: 'fa-plus' },
  ];

  // Add admin-only menu items
  if (user?.role === 'admin') {
    menuItems.push(
      { key: 'users', label: 'User Management', icon: 'fa-users' },
      { key: 'add-user', label: 'Add User', icon: 'fa-user-plus' }
    );
  }

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-store"></i>
            <span>StockManager</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul>
              {menuItems.map(item => (
                <li key={item.key}>
                  <button 
                    className={`nav-btn ${activeSection === item.key ? 'active' : ''}`}
                    onClick={() => setActiveSection(item.key)}
                  >
                    <i className={`fas ${item.icon}`}></i>
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="user-info">
                <span className="user-welcome">
                  <i className="fas fa-user"></i>
                  {user.name} ({user.role})
                </span>
                <button 
                  onClick={onLogout}
                  className="btn btn-outline logout-btn"
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="mobile-nav">
            <ul>
              {menuItems.map(item => (
                <li key={item.key}>
                  <button 
                    className={`nav-btn ${activeSection === item.key ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSection(item.key);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <i className={`fas ${item.icon}`}></i>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

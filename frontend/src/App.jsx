import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import UserManagement from './components/UserManagement';
import AddUser from './components/AddUser';
import Header from './components/Header';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('products');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductAdded = () => {
    setRefreshTrigger(prev => prev + 1);
    setActiveSection('products');
  };

  const handleUserAdded = () => {
    setRefreshTrigger(prev => prev + 1);
    setActiveSection('users');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'products':
        return <ProductList key={refreshTrigger} />;
      case 'add-product':
        return <AddProduct onProductAdded={handleProductAdded} />;
      case 'users':
        return <UserManagement key={refreshTrigger} />;
      case 'add-user':
        return <AddUser onUserAdded={handleUserAdded} />;
      default:
        return <ProductList />;
    }
  };

  return (
    <Router>
      {user && (
        <Header 
          user={user} 
          onLogout={logout}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}
      <Routes>
        <Route path="/login" element={
          user ? <Navigate to="/" /> : <Login />
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <main>
              {renderContent()}
            </main>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

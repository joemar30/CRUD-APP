import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE = 'http://localhost:5000/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState('');
  const { user: currentUser } = useAuth();

  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    password: '',
    role: 'user'
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('Error fetching users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 3000);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/users`, newUser);
      showNotification('User added successfully!');
      setNewUser({
        email: '',
        name: '',
        password: '',
        role: 'user'
      });
      setShowAddForm(false);
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      showNotification('Error adding user', 'error');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      return;
    }

    // Prevent deleting own account
    if (userId === currentUser.id) {
      showNotification('Cannot delete your own account', 'error');
      return;
    }

    try {
      await axios.delete(`${API_BASE}/users/${userId}`);
      showNotification('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification('Error deleting user', 'error');
    }
  };

  if (loading) {
    return <div className="container">Loading users...</div>;
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
        <h1>User Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <i className="fas fa-user-plus"></i> Add User
        </button>
      </div>

      {showAddForm && (
        <div className="form-card">
          <h3>Add New User</h3>
          <form onSubmit={handleAddUser}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  required
                  placeholder="user@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
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
                  className="form-control"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  required
                  placeholder="Enter password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role *</label>
                <select
                  id="role"
                  className="form-control"
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save"></i> Create User
              </button>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <i className="fas fa-user"></i>
                    {user.name}
                    {user.id === currentUser.id && <span className="current-user-badge">You</span>}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="user-actions">
                    <button className="btn btn-outline btn-sm">
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteUser(user.id, user.name)}
                      disabled={user.id === currentUser.id}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-users"></i>
          <h3>No users found</h3>
          <p>Add your first user to get started.</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

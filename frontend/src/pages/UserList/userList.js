import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './userListStyles.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('https://forty4-assignment.onrender.com/api/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8080/api/users/${id}`)
      .then(() => {
        fetchUsers();
      })
      .catch(error => {
        console.error('There was an error deleting the user!', error);
      });
  };

  return (
    <div className="user-list-container">
      <h2>User Management</h2>
      <Link to="/add-user" className="add-user-btn">Add User</Link>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/edit-user/${user.id}`} className="action-btn edit-btn">Edit</Link>
                  <button onClick={() => deleteUser(user.id)} className="action-btn delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

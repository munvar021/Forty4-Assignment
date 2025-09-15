import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/login';
import Signup from './pages/Signup/Signup'; // Placeholder
import UserList from './pages/UserList/userList';
import UserForm from './pages/UserForm/userForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/add-user" element={<UserForm />} />
          <Route path="/edit-user/:id" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
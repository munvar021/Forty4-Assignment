import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './userFormStyles.css';

const UserForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      axios.get(`https://forty4-assignment.onrender.com/api/users/${id}`)
        .then(response => {
          const user = response.data.data;
          setValue('name', user.name);
          setValue('email', user.email);
        })
        .catch(error => {
          console.error('There was an error fetching the user!', error);
        });
    }
  }, [id, isEditMode, setValue]);

  const onSubmit = (data) => {
    if (isEditMode) {
      axios.put(`http://localhost:8080/api/users/${id}`, data)
        .then(() => {
          navigate('/users');
        })
        .catch(error => {
          console.error('There was an error updating the user!', error);
        });
    } else {
      axios.post('http://localhost:8080/api/users', data)
        .then(() => {
          navigate('/users');
        })
        .catch(error => {
          console.error('There was an error creating the user!', error);
        });
    }
  };

  return (
    <div className="user-form-container">
      <div className="user-form-box">
        <h2>{isEditMode ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              {...register('email', { 
                required: 'Email is required', 
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } 
              })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <button type="submit" className="submit-button">{isEditMode ? 'Update User' : 'Add User'}</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import {useAuth} from './AuthContext'
import Cookies from 'js-cookie';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { userName, isLoggedIn, setIsLoggedIn, setUserName } = useAuth(); // Використовуйте відповідні значення з контексту
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
        const response = await fetch('http://localhost:54852/api/Authentication/logout', {
          method: 'POST',
        });
  
        if (response.ok) {
          setIsLoggedIn(false); // Встановіть стан isLoggedIn на false
          Cookies.remove('auth'); // Видаліть куку про аутентифікацію
        
        setUserName('');
        setIsLoggedIn(false);
      }
    }
     catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:54852/api/Authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true); // Встановіть стан isLoggedIn на true

        // Збережіть інформацію про аутентифікацію в кукі
        Cookies.set('auth', JSON.stringify({ userId: data.userId, name: data.name }), { expires: 1 }); // Expires in 1 day
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleOpen}>Login</button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <form onSubmit={handleSubmit} className='form'>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Login</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Login;

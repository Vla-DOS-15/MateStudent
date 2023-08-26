import React from 'react';
import './Header.css'
import Login from './..//user/Login/Login'
import { useAuth } from './..//user/Login/AuthContext'

const Header = () => {
  const { userName } = useAuth();

  return (
    <header className='header'>
      <h1>My App Header</h1>
      <div className='buttonLogin'>
        {<Login />}
      </div>
      <div>
      {userName && <h2>Welcome, {userName}!</h2>}
      </div>

    </header>
  );
};
export default Header;

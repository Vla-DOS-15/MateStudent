import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Додайте новий стан
  
    useEffect(() => {
      const authInfo = Cookies.get('auth');
      if (authInfo) {
        const { name } = JSON.parse(authInfo);
        setUserName(name);
        setIsLoggedIn(true); // Встановіть стан як true, якщо є інформація про аутентифікацію
      }
    }, []);
  
    // Передавайте більше інформації в контекст
    return (
      <AuthContext.Provider value={{ userName, setUserName, isLoggedIn, setIsLoggedIn }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => useContext(AuthContext);

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './UI/Header';
import Notifications from './UI/Notifications';
import Menu from './UI/Menu';
import Profile from './UI/Profile';
import NewTasks from './UI/NewTasks';
import WaitingResponse from './UI/WaitingResponse';
import MyTasks from './UI/MyTasks';
import Footer from './UI/Footer';
import TaskForm from './UI/components/user/TaskForm';
import ThemeMode from './UI/components/ThemeMode/ThemeMode.js'
import './App.css'

const App = () => {
  const menuLinks = [
    { to: '/profile', label: 'Профіль' },
    { to: '/new-tasks', label: 'Нові завдання' },
    { to: '/waiting-response', label: 'Очікування відповіді' },
    { to: '/my-tasks', label: 'Мої завдання' },
    { to: '/task-form', label: 'Додати завдання' },
  ];
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Notifications />
        <div style={{alignItems:'center', justifyContent:'center'}}><ThemeMode/></div>
        

        <div style={{ display: 'flex', flex: 1 }}>
        <Menu links={menuLinks} />
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/new-tasks" element={<NewTasks />} />
            <Route path="/waiting-response" element={<WaitingResponse />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/task-form" element={<TaskForm />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

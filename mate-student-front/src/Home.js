// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './UI/components/Header/Header';
import Notifications from './UI/components/Notification/Notification';
import Menu from './UI/components/Menu/Menu';
import Profile from './UI/components/Profile/Profile.jsx';
import NewTask from './UI/components/NewTask/NewTask';
import WaitingResponse from './UI/WaitingResponse';
import MyTasks from './UI/components/MyTasks/MyTasks';
import Footer from './UI/components/Footer/Footer';
import TaskForm from './UI/components/user/TaskForm/TaskForm';
import ThemeMode from './UI/components/ThemeMode/ThemeMode'
import Login from './UI/components/user/Login/Login';

import './App.css'

const App = () => {

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div className='App-header'>
          <Header />
        </div>
        <div className='App-notification'>
          <Notifications />
        </div>

        <div style={{ alignItems: 'center', justifyContent: 'center' }}><ThemeMode /></div>


        <div style={{ display: 'flex', flex: 1 }}>
          <div>
            <Menu />
          </div>

          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/new-tasks" element={<NewTask />} />
            <Route path="/waiting-response" element={<WaitingResponse />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/task-form" element={<TaskForm />} />
            <Route path="/login" element={<Login />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

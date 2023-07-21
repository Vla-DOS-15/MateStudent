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

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Notifications />

        <div style={{ display: 'flex', flex: 1 }}>
          <Menu />
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

import React, { useState, useEffect } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:54852/tasks', { mode: 'cors' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div>
      <h1>Tasks List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskId}>
            <p>{task.taskId}</p>
            <h2>Subject{task.subject}</h2>
            <h2>{task.title}</h2>
            <p>Type Of Work{task.typeOfWork}</p>

            <p>Description: {task.description}</p>
            <p>Publication Date: {task.publicationData}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Price: {task.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ tasks, onTaskClick }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.taskId} onClick={() => onTaskClick(task.taskId)}>
          {task.title}
        </li>
      ))}
    </ul>
  );
};

const TaskDetail = ({ task }) => {
  return (
    <div>
      <h2>Subject{task.subject}</h2>
      <h2>{task.title}</h2>
      <p>Type Of Work{task.typeOfWork}</p>

      <p>Description: {task.description}</p>
      <p>Publication Date: {task.publicationData}</p>
      <p>Deadline: {task.deadline}</p>
      <p>Price: {task.price}</p>

      {task.fileName && (
        <p>
          <a href={`http://localhost:54852/api/Tasks/${task.taskId}/Download`}>Download File</a>
        </p>
      )}
    </div>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:54852/api/Tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskClick = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:54852/api/Tasks/${taskId}`);
      setSelectedTask(response.data);
    } catch (error) {
      console.error('Error fetching task details:', error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h2>Task List</h2>
          <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
        </div>
        <div style={{ flex: 2 }}>
          {selectedTask ? (
            <TaskDetail task={selectedTask} />
          ) : (
            <p>Select a task from the list to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

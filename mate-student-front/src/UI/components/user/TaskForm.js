import React, { useState,  } from 'react';
import axios from 'axios';
import './task.css';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    title: '',
    typeOfWork: '',
    description: '',
    deadline: '',
    price: 0,
    file: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      file: event.target.files[0],
    });
  };

  // const handleFileUpload = async () => {
  //   try {
  //     const formDataObj = new FormData();
  //     formDataObj.append('file', formData.file);
  
  //     const response = await axios.post('http://localhost:54852/api/Tasks/UploadFile', formDataObj);
  
  //     return response.data.FileName; // Повертаємо тільки назву файла
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     throw error;
  //   }
  // };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formDataObj = new FormData();
      formDataObj.append('subject', formData.subject);
      formDataObj.append('title', formData.title);
      formDataObj.append('typeOfWork', formData.typeOfWork);
      formDataObj.append('description', formData.description);
      formDataObj.append('deadline', formData.deadline);
      formDataObj.append('price', formData.price);

      if (formData.file) {
        formDataObj.append('file', formData.file);
      }
  
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
  
      await axios.post('http://localhost:54852/api/Tasks', formDataObj, config);
  
      // After successful creation, notify the parent component about the new task
     // onTaskCreated();
  
      // Reset form data after successful submission
      setFormData({
        subject: '',
        title: '',
        typeOfWork: '',
        description: '',
        deadline: '',
        price: 0,
        file: null,
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  

  return (
    <div className="container">
      <h2>Add Task:</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="subject">Subject</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="title">Title</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            name="typeOfWork"
            value={formData.typeOfWork}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="typeOfWork">Type Of Work</label>
        </div>

        <div className="input-container">
          <textarea
            className="textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="description">Description</label>
        </div>

        <div className="input-container">
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="deadline">Deadline</label>
        </div>

        <div className="input-container">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="price">Price</label>
        </div>

        <div className="input-container">
          <input type="file" name="file" onChange={handleFileChange} />
          <label htmlFor="file">Upload File</label>
        </div>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;

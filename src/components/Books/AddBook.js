import React, { useState  } from 'react';
import '../../styles/styles.css'; // with import
import axios from 'axios';
import { Link } from 'react-router-dom';


const AddBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  
  //const [availableCopies, setAvailableCopies] = useState(1);
  const [message, setMessage] = useState('');
  const  handleSubmit =async(e) => {
    e.preventDefault();
    const usrId=localStorage.getItem('userId');
    //setUserId(usrId);     
    // Simulate sending data to a backend API
    const newBook = { "Title":title,"Author": author,"Genre": category, "PublishedYear":publishedYear,OwnerID:usrId};
    console.log('Book added:', newBook);
    try {
      const response = await axios.post('http://localhost:5000/api/books', newBook);
      console.log('Book added:', response.data);
      // Clear form or redirect after successful submission
      setMessage('Book added successfully!');
      
    } catch (error) {
      console.error('Error adding book:', error);
    }
    //console.log("New Book Added:", newBook);

    // Show success message
    
    
    // Clear form fields
    setTitle('');
    setAuthor('');
    setCategory('');
    setPublishedYear('');
    //setAvailableCopies(1);
  };

  return (
    <div className="add-book-container">
      <header className="add-book-header">
        <h1>Add a New Book</h1>
        <p>List a new book for others to borrow or exchange.</p>
      </header>

      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        
        

        <div className="form-group">
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Published Year</label>
          <textarea value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} required />
        </div>

        

        <button type="submit" className="add-book-btn">Add Book</button>
        <Link to="/dashboard"> Cancel </Link>
      </form>

      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default AddBook;

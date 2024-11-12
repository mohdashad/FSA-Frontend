import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.css'; // with import
import axios from 'axios';


const ViewBooks = () => {
  // State to manage the list of borrowable books (usually fetched from an API)
  const [books, setBooks] = useState([]);
  // State for search input, selected category, and filtered books
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch available books (Simulate fetching data from an API)
  useEffect(() => {
    const fetchBorrowableBooks = () => {
      // Example data (replace with an API call)
      const usrId=localStorage.getItem('userId');
      axios.get(`http://localhost:5000/api/books?userId=${usrId}`).then(response => {
        setBooks(response.data);  // Set the books data from the API response
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
      /*
      const availableBooks = [
        { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction' },
        { id: 2, title: 'Educated', author: 'Tara Westover', category: 'Memoir' },
        { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy' },
        // Additional books...
      ];
      setBooks(availableBooks);
      */
    };

    fetchBorrowableBooks();
  }, []);

   // Function to filter books based on search and category
   const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for the dropdown
  const categories = ['All', ...new Set(books.map(book => book.category))];

  // Handle Listing Event
  const handleListing=(e)=>{
    e.preventDefault();
    alert(e.target.dataset.idx);
  }

  return (
    <div className="book-exchange-container">
      <header className="book-exchange-header">
        <h1>Available for Lend</h1>
        <p>Explore books that you can make available for lend</p>
      </header>

      {/* Books List */}
      <section className="borrowable-books-list">
        <div className="wrapper">
             {/* Search and Category Filter */}
            <div className="filters">
            <input 
            type="text" 
            placeholder="Search by title or author..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"
            />
            <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)} 
            className="category-select"
            >
            {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
            ))}
            </select>
            </div>

             {/* Responsive Table for Displaying Books */}
                {filteredBooks.length > 0 ? (
                    <table className="responsive-table">
                    <thead>
                        <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((book,index) => (
                        <tr key={index}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>
                            <Link to={`/books/${book._id}`} state={{ book }} className="view-details-btn">View Details</Link>
                            <button className="request-borrow-btn" onClick={handleListing} data-idx={book._id}>List This Book</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p>No books available for borrowing at the moment.</p>
                )}
            </div>
        </section>

    </div>
  );
};

export default ViewBooks;

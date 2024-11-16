import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.css'; // with import
import axios from 'axios';
import Loader from '../Loader'; // with import '../../styles/styles.css'; // with import
import RequestPopup from './RequestPopup';


const BookExchange = () => {
  // State to manage the list of borrowable books (usually fetched from an API)
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [preloader, setPreloader] = useState(false);
  //const [updatedBook, setUpdatedBook] = useState('');
  /* Model */
  const [selectedBook, setSelectedBook] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  


  // Fetch available books (Simulate fetching data from an API)
  useEffect(() => {
    const fetchBooks  = async() => { 
      //const userId = localStorage.getItem('userId');   
      try {
        const response = await axios.get(`http://localhost:5000/api/books/available-books/`, {
          params: {
            search: searchTerm,
            page: currentPage,
            limit: 5
          },
        });
        
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages); 
      } catch (error) {
        setBooks([]);
        setTotalPages(0); 
      } 
      
    
  };

  fetchBooks ();
},  [searchTerm, currentPage]);

const handleBorrowClick = (book) => {
  setSelectedBook(book);
  setIsPopupOpen(true);
};

  const handlePopupSubmit = async (requestData) => {
    try {
      const userId=localStorage.getItem('userId');
      const { deliveryMethod, duration, negotiatedTerms } = requestData;
      const requestBody = {
        RequestedBy: userId,
        RequestedTo:selectedBook.OwnerID,
        BookID: selectedBook._id,
        DeliveryMethod:deliveryMethod,
        Duration:duration,
        NegotiatedTerms:negotiatedTerms
      };
      console.log(requestBody);
       const response = await axios.post('http://localhost:5000/api/request/', requestBody);
       alert(response.data.message);
    } catch (error) {
      console.error('Error creating exchange request:', error);
      alert('Failed to create exchange request. Please try again.');
    }
  };
 
  
  
  

  return (
    <div className="book-exchange-container">
      <header className="book-exchange-header">
        <h1>Available for Borrow</h1>
        <p>Explore books that other users have made available for exchange or borrowing.</p>
      </header>
      {preloader && <Loader/> }
      {/* Books List */}
      <section className="borrowable-books-list">
        <div className="wrapper">
             
            <div className="filters">
            <input 
            type="text" 
            placeholder="Search by title or author..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="search-input"
            />
           
            

            {/* Pagination Controls */}
            <button className="request-borrow-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="pagination">
              Page {currentPage} of {totalPages}
            </span>
            <button className="request-borrow-btn"
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>

            
          </div>
           

             {/* Responsive Table for Displaying Books */}
                {books.length > 0 ? (
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
                        {books.map((book) => (
                        <tr key={book._id}>
                            <td>{book.Title}</td>
                            <td>{book.Author}</td>
                            <td>{book.Genre}</td>
                            <td>
                            <Link to={`/books/${book._id}`} className="view-details-btn">View Details</Link>
                            {book.OwnerID!==localStorage.getItem('userId')?(<button className="request-borrow-btn" onClick={() => handleBorrowClick(book)}>Create Borrow Request</button>):('')}
                            
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p>No books available for borrowing at the moment.</p>
                )}

      <RequestPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handlePopupSubmit}
      />
            </div>
        </section>

    </div>
  );
};

export default BookExchange;

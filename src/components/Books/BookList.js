import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.css'; // with import
import Loader from '../Loader'; // with import '../../styles/styles.css'; // with import
import axios from 'axios';


const ViewBooks = () => {
  // State to manage the list of borrowable books (usually fetched from an API)
  const [books, setBooks] = useState([]);
  // State for search input, selected category, and filtered books
  const [searchTerm, setSearchTerm] = useState('');
 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatedBook, setUpdatedBook] = useState('');
  const [preloader, setPreloader] = useState(false);


  // Fetch available books (Simulate fetching data from an API)
  useEffect(() => {
      const fetchBooks  = async() => { 
        const userId = localStorage.getItem('userId');  
        try{  
            const response = await axios.get(`http://localhost:5000/api/books/owner/${userId}`, {
              params: {
                search: searchTerm,
                page: currentPage,
                limit: 5
              },
            });
            
            if(response.status==200){
              setBooks(response.data.books);
              setTotalPages(response.data.totalPages);
            }else{
              setBooks([]);
              setTotalPages(0);
            }
      }catch(e){
          setBooks([]);
          setTotalPages(0); 
      } 
      
    };

    fetchBooks ();
  },  [searchTerm, currentPage]);
    
 

  // Handle the deletion of a book
  const deleteBook = (bookId) => {
    axios
      .delete(`http://localhost:5000/api/books/${bookId}`)
      .then((response) => {
        console.log(response.data.message); // 'Book deleted successfully'
        
        // Update the UI by removing the deleted book from the state
        setBooks(books.filter((book) => book._id !== bookId));
      })
      .catch((error) => {
        console.error('There was an error deleting the book!', error);
      });
  };


  const updateBook = async (bookId, updatedData) => {
    try {
      console.log('Book updated:', updatedData);
      const response = await axios.put(`http://localhost:5000/api/books/${bookId}`, updatedData);
      console.log('Book updated:', response.data);
  
      // Optional: Update the local state to reflect the change
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId ? { ...book, ...updatedData } : book
        )
      );
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="book-exchange-container">
      
      

    


      {/* Books List */}
        <section className="borrowable-books-list">
        <div className="wrapper">
        {preloader && <Loader/> }
             {/* Search and Category Filter */}
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
                        {books.map((book,index) => (
                        <tr key={index}>
                            <td>{book.Title}</td>
                            <td>{book.Author}</td>
                           
                            <td>{book.Genre}</td>
                            <td>
                            <Link to={`/books/${book._id}`} state={{ book }} className="view-details-btn">View Details</Link>
                            <button className="request-borrow-btn"  onClick={() => deleteBook(book._id)}>Delete</button>
                            {
                            !book.IsAvailable ?(
                            <button className="request-borrow-btn"   onClick={() => updateBook(book._id, { IsAvailable: !book.IsAvailable })}>List This Book</button>
                            ):(<button className="request-borrow-btn"   onClick={() => updateBook(book._id, { IsAvailable: !book.IsAvailable })}>Remove From Listing</button>)

                          }

                            
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p>No books available for Lend at the moment.</p>
                )}
            </div>
        </section>

    </div>
  );
};

export default ViewBooks;

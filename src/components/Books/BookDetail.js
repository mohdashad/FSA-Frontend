import React from 'react';
import {  Link,useLocation } from 'react-router-dom';
import '../../styles/styles.css'; // with import
import bookBanner from '../../images/book-details/detail.jpeg'; // with import

const BookDetails = () => {
  //const { id } = useParams(); // Get the book ID from the URL
  //const [book, setBook] = useState(null);

  const location = useLocation(); 
  const { book } = location.state || {};
/*
  // Simulate fetching book details from an API based on the book ID
  useEffect(() => {
    const fetchBookDetails = () => {
      // Example book data (replace with an API call in a real app)
      const books = [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', description: 'A novel about the American dream...', availableCopies: 3,isLended:true },
        { id: 2, title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', category: 'Non-Fiction', description: 'A thought-provoking exploration of humanity...', availableCopies: 5,isLended:true },
        { id: 3, title: 'Dune', author: 'Frank Herbert', category: 'Science Fiction', description: 'A science fiction epic set on the desert planet...', availableCopies: 2,isLended:true },
        { id: 4, title: 'The Diary of a Young Girl', author: 'Anne Frank', category: 'Biographies', description: 'The wartime diaries of Anne Frank...', availableCopies: 1,isLended:false },
        // More books here...
      ];

      // Find the book by ID
      const selectedBook = books.find((book) => book.id === parseInt(id));
      setBook(selectedBook);
    };

    fetchBookDetails();
  }, [id]);
  */

  if (!book) { return <p>No book data available.</p>; }

  return (
    <div className="book-details-container">
      <div className="wrapper">
        <header className="book-details-header">
          <h1>{book.title}</h1>
          <p>{book.author}</p>
        </header>

        <section className="book-details-body">
          <img src={bookBanner} alt="detail"/>
          <p><strong>Category:</strong> {book.category}</p>
          <p><strong>Description:</strong> {book.summary}</p>
        </section>

        <section className="book-details-actions">
          <button className="request-exchange-btn">Request Exchange</button>
          <Link to="/books" className="back-to-books-btn">Back to Books</Link>
        </section>
      </div>
    </div>
  );
};

export default BookDetails;

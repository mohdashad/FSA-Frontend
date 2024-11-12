import React, { useState } from 'react';
import '../styles/styles.css';

const UserProfile = () => {
  // User data and edit mode state
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    borrowedBooks: [
      { id: 1, title: 'The Great Gatsby' },
      { id: 2, title: 'To Kill a Mockingbird' },
    ],
    lendingBooks: [
      { id: 3, title: '1984' },
      { id: 4, title: 'Pride and Prejudice' },
    ],
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setUser({ ...user, name: editName, email: editEmail });
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>User Profile</h1>
        <button className="edit-btn" onClick={handleEditToggle}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </header>

      <section className="user-info">
        <h2>Profile Details</h2>
        
        {isEditing ? (
          // Edit form
          <div className="edit-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>

            <button className="save-btn" onClick={handleSave}>Save</button>
          </div>
        ) : (
          // View mode
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </>
        )}
      </section>

      <section className="books-section">
        <h2>Borrowed Books</h2>
        <ul>
          {user.borrowedBooks.map(book => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      </section>

      <section className="books-section">
        <h2>Books Available for Lending</h2>
        <ul>
          {user.lendingBooks.map(book => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      </section>

      <section className="books-section">
        <h2>Books Listed for Lending</h2>
        <ul>
          {user.lendingBooks.map(book => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      </section>

    </div>
  );
};

export default UserProfile;

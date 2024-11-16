import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [ transactionDetails  , setTransactionDetails] = useState(null);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const userId=localStorage.getItem('userId');
    const getRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/request/user/${userId}`);
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    getRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      await axios.put(`http://localhost:5000/api/request/${requestId}`, { status: 'Accepted' });
      setRequests((prev) =>
        prev.map((request) =>
          request._id === requestId ? { ...request, Status: 'Accepted' } : request
        )
      );
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.put(`http://localhost:5000/api/request/${requestId}`, { status: 'Rejected' });
      setRequests((prev) =>
        prev.map((request) =>
          request._id === requestId ? { ...request, Status: 'Rejected' } : request
        )
      );
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const handleFetchTransaction = async (transactionId) => {


    navigate(`/transaction/${transactionId}`);
    /*
    try {
      const response = await axios.get(`http://localhost:5000/api/transaction/request/${exchangeRequestId}`);
      setTransactionDetails(response.data); // Store the transaction details
    } catch (error) {
      console.error('Error fetching transaction:', error);
      setTransactionDetails(null);
    }
      */
  };

  return (
    <section className="borrowable-books-list">
    <header className="user-hero-section">
    <h1>Your Request</h1>
    
    </header>
        <div className="wrapper">
    <div>
      
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Book</th>
            <th>Requested By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.BookID?.Title}</td>
              <td>{request.RequestedBy.Name}</td>
              <td>{request.Status}</td>
              <td>
                {
                request.Status === 'Pending' && request.BookID?.OwnerID===localStorage.getItem('userId')? (                  <>
                    <button className="request-borrow-btn" onClick={() => handleApprove(request._id)}>Approve</button>
                    <button className="request-borrow-btn" onClick={() => handleReject(request._id)}>Reject</button>
                  </>
                    )  :( <button className="request-borrow-btn" onClick={() => handleFetchTransaction(request._id)}>Manage Transaction</button>)                
                
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {transactionDetails && transactionDetails.TransactionDate }
    {transactionDetails &&   transactionDetails.Status}
    </div>
    </section>
  );
};

export default Request;

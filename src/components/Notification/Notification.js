
// src/components/Login.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../../styles/styles.css'; // with import



const Notification= () => {
    
    const [notifications, setNotifications] = useState(null);
    
    useEffect(() => {
        const userId=localStorage.getItem('userId');
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/notification/user/${userId}`);
                if (!response.ok) throw new Error('Failed to fetch notifications');
                const notifi = await response.json();
                setNotifications(notifi.notifications);
                
                console.log('User notifications:', notifi);
            } catch (error) {
                console.error(error);
            }
        };
        
        // Example usage
        fetchNotifications();
      }, []);

    const handleMarkAsRead = async (id) => {
        await axios.patch(`http://localhost:5000/api/notification/${id}`);
        setNotifications((prev) =>
            prev.map((notif) =>
            notif._id === id ? { ...notif, IsRead: true } : notif
            )
        );
    };

    const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/notification/${id}`);
        setNotifications((prev) => prev.filter((notif) => notif._id !== id));
    };
    

    return(
        <div>
            <header className="user-hero-section">
                <h1>Your Notification</h1>
            </header>
        
        <div className='wrapper'>

            {notifications? (
                    <table className="responsive-table">
                    <thead>
                        <tr>
                        <th>Title</th>
                        <th>Message</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.map((notif,index) => (
                        <tr key={index}>
                            <td>{notif.Type}</td>
                            <td>{notif.Message}</td>    
                            <td>{!notif.IsRead && ( <button className="request-borrow-btn" onClick={() => handleMarkAsRead(notif._id)}>Mark as Read</button>)}
                           
                           <button className="request-borrow-btn" onClick={() => handleDelete(notif._id)}>Delete</button></td>              
                            
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p>No Notifications availabl at the moment.</p>
                )}
      </div>
      </div>
    )

};



export default Notification;


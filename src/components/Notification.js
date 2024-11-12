
// src/components/Login.js
import React, { useState,useEffect } from 'react';

const Notification= () => {
    
    const [messages, setMessages] = useState(null);
    
    useEffect(() => {
        const userId=localStorage.getItem('userId');
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/notification/?userId=${userId}`);
                if (!response.ok) throw new Error('Failed to fetch notifications');
                const notifications = await response.json();
                setMessages(notifications);
                console.log('User notifications:', notifications);
            } catch (error) {
                console.error(error);
            }
        };
        
        // Example usage
        fetchNotifications();
      }, []);
    

    return(
        <div>
            {messages? (
                    <table className="responsive-table">
                    <thead>
                        <tr>
                        <th>Title</th>
                        <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((message,index) => (
                        <tr key={index}>
                            <td>{message.title}</td>
                            <td>{message.message}</td>
                            
                            
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p>No Notifications availabl at the moment.</p>
                )}
      </div>
    )

};



export default Notification;


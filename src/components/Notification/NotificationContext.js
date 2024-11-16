import React, { createContext, useState, useEffect,useContext } from 'react';
import axios from 'axios';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children}) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications initially
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId=localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/api/notification/user/${userId}`);
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unreadCount);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  // Function to update unread count when a notification is deleted or updated
  const updateUnreadCount = () => {
    const count = notifications.filter(notification => !notification.IsRead).length;
    setUnreadCount(count);
  };


  const updateNoti = (notidata) => {
    setNotifications(notidata.notifications);
    setUnreadCount(notidata.unreadCount);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, unreadCount, updateUnreadCount,updateNoti }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNoti = () => useContext(NotificationContext);

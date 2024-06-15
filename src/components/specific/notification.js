import React, { useState, useEffect } from 'react';
import { Box, Card, Text, Grid } from '@radix-ui/themes';

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/notifications`);
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const getBorderColor = (type) => {
    switch (type) {
      case 'pass':
        return 'green';
      case 'warning':
        return 'yellow';
      case 'reject':
        return 'red';
      default:
        return 'gray'; // Default color
    }
  };

  return (
    <div >
      <Text size='6'  style={{ marginBottom: '20px', fontWeight: '700'}}>Notifications</Text>
      <Grid gap='3' style={{marginTop: '20px'}}>
        {notifications.map((notification, index) => (
          <div key={index} maxWidth="350px" style={{ border: `2px solid ${getBorderColor(notification.type)}` }}>
            <Card variant='classic'  asChild='true'>
              <div style={{backgroundColor: 'white'}}>
              <a href="#">
                <Text as="div" size="2"  weight="bold">
                  <p >
                  {notification.message}
                  </p>
                  
                </Text>
                <Text as="div"   size="2">
                  
                  {notification.description}
                </Text>
              </a>
              </div>
              
            </Card>
          </div>
        ))}
      </Grid>
    </div>
  );
}

export default Notification;

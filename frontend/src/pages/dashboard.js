import { Flex, Heading, Button, Grid } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationMenuDemo from '../components/shared/navbar';
import ProfilePoints from '../components/specific/ProfilePoints';
import UserCard from '../components/specific/UserCard';
import './dashboard.css';
import MyChallengeList from '../components/specific/MyChallengeList';
import MyPrintList from '../components/specific/MyPrintList';
import Notification from '../components/specific/notification';
import Sidebar from '../components/shared/Sidebar';
import UserData from '../components/specific/UserData';






function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  

  useEffect(() => {
    const fetchMeData = async () => {
      try {
        
        if (!token) {
          alert("Login First!");
          throw new Error('Access token not found');
        }

        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMeData();
  }, []);

  const logout = async () => {
    try {
      
        if (!token) {
          throw new Error('Access token not found');
        }

      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ refresh_token: localStorage.getItem('refreshToken') })
      });

      if (response.ok) {
        // If logout is successful, clear the local storage and update the user authentication state

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        // Update user authentication state (e.g., set isAuthenticated to false)
        // Redirect to the login page or any other desired page
        window.location.href = '/login'; // Redirect to the login page
        console.log("Logout Successfully")
      } else {
        // If logout fails, handle the error accordingly
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (

    <div className="flex flex-col ">
    <header className="  ">
      <NavigationMenuDemo userData={userData} />
    </header>
    <div className="flex flex-1 ">
      <aside className=" ">
        <Sidebar userData={userData} />
      </aside>
      <section className="ml-15 w-2/3 ">
        <UserData userData={userData}/>
        <MyChallengeList userData={userData}/>
      </section>
    </div>
  </div>
  
  )

}

export default Dashboard;

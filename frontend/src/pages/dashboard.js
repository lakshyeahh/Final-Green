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
import DownBar from '../components/shared/DownBar';
import logo from '../Media/logo.png'






function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState(null);
  


  useEffect(() => {
    const fetchMeData = async () => {
      try {
        
        if (!token) {
          alert("Login First!");
          throw new Error('Access token not found');
        }

        const response = await fetch(`${process.env.REACT_APP_URL}/api/users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        const { user, position } = data;
        setUserData(user);
        setPosition(position);
        setTimeout(() => {
          setLoading(false);
        }, 500);
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

      const response = await fetch(`${process.env.REACT_APP_URL}/api/logout`, {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col">
        <img src={logo} className="h-16 mb-4" alt="Logo" />
        <span className="loading loading-dots loading-lg text-green-300 bg-green-300"></span>
      </div>
    );
  }

  return (
    
<div className="flex flex-col min-h-screen">
  <header>
    <NavigationMenuDemo userData={userData} />
  </header>
  <div className="flex flex-1">
    <aside className="hidden lg:block w-1/8">
      <Sidebar userData={userData} />
    </aside>
    <section className="w-full px-3 md:px-10 py-2 md:py-10">
      
      <UserData userData={userData}  position={position}/>
      <MyChallengeList userData={userData} />
    </section>
  </div>
  <div className="md:hidden fixed bottom-0 w-full">
    <DownBar />
  </div>
</div>


  )

}

export default Dashboard;

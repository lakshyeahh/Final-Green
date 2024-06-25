import React from 'react'
import NavigationMenuDemo from '../components/shared/navbar.js'
import './Homepage.css';
import Footer from '../components/shared/Footer.js';
import ChallengeList from '../components/specific/ChallengeList.js';
import Hero from '../components/specific/Hero.js';
import EventList from '../components/specific/EventList.js';
import ResourceList from '../components/specific/ResourceList.js';
import Steps from '../components/specific/Steps.js';
import CarbonFootprint from '../components/specific/CarbonFootprint.js';
import { useState, useEffect } from 'react';
import logo from '../Media/logo.png'


function HomePage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMeData = async () => {
      try {

        if (!token) {
        
          throw new Error('Access token not found');
        }

        const response = await fetch('https://final-green-api.vercel.app/api/users', {
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
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setError(error.message);
      }
    };

    fetchMeData();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col">
        <img src={logo} className="h-16 mb-4" alt="Logo" />
        <span className="loading loading-dots loading-lg text-green-300 bg-green-300"></span>
      </div>
    );
  }



  

  return (
    <div className='overflow-hidden'>
      <NavigationMenuDemo userData={userData}/>

      <Hero/>
      <div className="homepage" style={{ position: 'relative' }}>


  
        <ChallengeList />


        <EventList/>

        <ResourceList/>
        
        <Steps/>
        
        <CarbonFootprint/>

        {/* Footer */}

        <Footer />
      </div>
    </div>

  )
}

export default HomePage

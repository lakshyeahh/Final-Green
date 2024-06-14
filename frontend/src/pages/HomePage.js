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


function HomePage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  useEffect(() => {
    const fetchMeData = async () => {
      try {

        if (!token) {
        
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


  

  return (
    <div>
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
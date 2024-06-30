import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, CssBaseline, Box, Button } from '@mui/material';
import CardComponent from '../components/shared/Card';
import NavigationMenuDemo from '../components/shared/navbar';
import { useState, useEffect } from 'react';
import { Flex, Badge } from '@radix-ui/themes';
import user from '../Media/user.png'
import bkg from '../Media/background.png';
import Sidebar from '../components/shared/Sidebar';
import DownBar from '../components/shared/DownBar';
import logo from '../Media/logo.png'
import img1 from '../Media/user1.png'
import img2 from '../Media/user2.png'
import img3 from '../Media/user3.png'
import img4 from '../Media/user4.png'


const drawerWidth = 240;
const randomHashtags = [
  'ReactJS', 'JavaScript', 'WebDevelopment', 'Coding', 'Tech', 
  'OpenSource', 'Frontend', 'Backend', 'UIUX', 'Design'
];

function Challenge() {
    const [challenges, setChallenges] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
  
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('accessToken');
    const [loading, setLoading] = useState(true);


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
          setUserData(data);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchMeData();
    }, []);
    useEffect(() => {
        const fetchChallenges = async () => {
          try {
            
           
    
            const response = await fetch(`${process.env.REACT_APP_URL}/api/education/resources`, {
              method: 'GET',
              headers: {
                'Content': `application/json`
              }
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch user data');
            }
    
            const data = await response.json();
            setChallenges(data);
          } catch (error) {
            
          }
        };
    
        fetchChallenges();
      }, []);

      const formattedDate = new Date(challenges.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    
      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen flex-col">
            <img src={logo} className="h-16 mb-4" alt="Logo" />
            <span className="loading loading-dots loading-lg text-green-300 bg-green-300"></span>
          </div>
        );
      }
    

      const images = [

        img1,
        img2,
        img3,
        img4,
    
        // Add more images if needed
      ];
      
  return (
  
  <div className="flex flex-col min-h-screen">
  <header>
    <NavigationMenuDemo userData={userData} />
  </header>
  <div className="flex flex-1">
    <aside className="hidden lg:block w-1/8">
      <Sidebar userData={userData} />
    </aside>
    <section className="w-full px-3 md:px-10 py-5 md:py-10">
    <Box className=''>
  
    <div className=' bg-gradient-to-tr from-blue-500 to-teal-300 p-2 rounded-2xl' >
      <div className=' bg-white to-pink-300 p-4 rounded-2xl'>

 

   
    <Typography  variant="h3" gutterBottom  >
      <h1  className='font-bold text-black'>
      Resources
      </h1>
      
    </Typography>
    
    <div style={{ height: '2px', width: '50%', backgroundColor: 'blue'}}></div>
    <br />
     {/* Render the CardComponent for each challenge */}
     
     <p className="text-gray-700 text-lg mt-4 leading-tight">
Check out the exciting challenges below and start your journey towards personal growth and achievement!
</p>
</div>
</div>
<header class="text-gray-600 body-font">
<div class=" mx-auto mt-10 flex flex-wrap p-5 flex-col md:flex-row items-center bg-grey-200 border-2 border-black rounded-2xl  ">
<nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center ">
<a
  className={`mr-5 hover:text-gray-900 ${activeTab === 'all' ? 'border-b-2 border-gray-900' : ''}`}
  onClick={() => setActiveTab('all')}
>
  All
</a>
<a
  className={`mr-5 hover:text-gray-900 ${activeTab === 'popular' ? 'border-b-2 border-gray-900' : ''}`}
  onClick={() => setActiveTab('popular')}
>
  Popular
</a>
<a
  className={`mr-5 hover:text-gray-900 ${activeTab === 'highPoints' ? 'border-b-2 border-gray-900' : ''}`}
  onClick={() => setActiveTab('highPoints')}
>
  High Points
</a>
<a
  className={`mr-5 hover:text-gray-900 ${activeTab === 'new' ? 'border-b-2 border-gray-900' : ''}`}
  onClick={() => setActiveTab('new')}
>
  New
</a>
</nav>
</div>
</header>
    
<section class="text-gray-600 body-font overflow-hidden">

<div class=" py-24 mx-auto">
<div class="flex flex-wrap  gap-6">
{challenges.map((challenge, index) => (
 <div key={index} class="p-8 md:w-[calc(50%-1.5rem)] flex flex-col items-start 
 border-2 border-blue-200 rounded-lg shadow-lg ">

  
  <span class="inline-block py-1 px-2 rounded text-sky-800 bg-sky-300 text-xs font-medium tracking-widest">{challenge.type}</span>
  <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{challenge.title}</h2>
  <p class="leading-relaxed mb-8">{challenge.description}</p>
  <div class="flex items-center flex-wrap pb-4 mb-4 border-b-4 border-emerald-200 mt-auto w-full">
    <a class="text-indigo-500 inline-flex items-center" href={challenge.url}>Learn More
      <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14"></path>
        <path d="M12 5l7 7-7 7"></path>
      </svg>
    </a>
    <span class="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
      <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>1.2K
    </span>
    <span class="text-gray-400 inline-flex items-center leading-none text-sm">
      <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
      </svg>6
    </span>
  </div>
  <a class="inline-flex items-center">
    <img alt="blog" src={images[index % images.length]}  class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" /  >
    <span class="flex-grow flex flex-col pl-4">
      <span class="title-font font-medium text-gray-900">{challenge.authorName}</span>
      <span class="text-gray-400 text-xs tracking-widest mt-0.5">{challenge.authorPosition}</span>
    </span>
  </a>
</div>

))}
</div>
</div>
</section>
   
  </Box>
    </section>
  </div>
  <div className="md:hidden fixed bottom-0 w-full">
    <DownBar />
  </div>
</div>


  );
}

export default Challenge;

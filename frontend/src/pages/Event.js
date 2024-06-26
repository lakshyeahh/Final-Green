import React from 'react';
import { Toolbar, Typography, Box } from '@mui/material';
import CardComponent from '../components/shared/Card';
import NavigationMenuDemo from '../components/shared/navbar';
import { useState, useEffect } from 'react';
import { Flex, Badge } from '@radix-ui/themes';
import user from '../Media/user.png'
import bkg from '../Media/background.png';
import Sidebar from '../components/shared/Sidebar';
import DownBar from '../components/shared/DownBar';
import logo from '../Media/logo.png'

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
  const [filteredChallenges, setFilteredChallenges] = useState([]);
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



        const response = await fetch(`${process.env.REACT_APP_URL}/api/events`, {
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
  useEffect(() => {
    let sortedChallenges = [...challenges];
    switch (activeTab) {
      case 'popular':
        sortedChallenges.sort((a, b) => b.participants - a.participants);
        break;
      case 'online':
        sortedChallenges.filter((challenge) => challenge.mode === 'online');
        break;
      case 'new':
        sortedChallenges.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        sortedChallenges = challenges;
    }
    setFilteredChallenges(sortedChallenges);
  }, [activeTab, challenges]);

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
      <div className=''

>
  
  <div className=' bg-gradient-to-t from-purple-500 to-pink-300 p-2 rounded-2xl' >
    <div className=' bg-white to-pink-300 p-4 rounded-2xl'>




      <Typography variant="h3" gutterBottom  >
        <h1 className='font-bold text-black'>
          Events
        </h1>

      </Typography>

      <div style={{ height: '2px', width: '50%', backgroundColor: 'grey' }}></div>
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
          className={`mr-5 hover:text-gray-900 ${activeTab === 'online' ? 'border-b-2 border-gray-900' : ''}`}
          onClick={() => setActiveTab('online')}
        >
          Online
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

    <div class="  py-24 mx-auto">

      <div class="-my-8 divide-y-2 divide-gray-100 ">
        {filteredChallenges.map((challenge, index) => (
          <div class="py-8 px-2 flex flex-wrap md:flex-nowrap shadow-md mb-3 border rounded-lg bg-violet-50 ">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col  text-center">
              <span class="font-semibold title-font text-gray-700">{challenge.mode}</span>
              <span class="mt-1 text-gray-500 text-sm">{challenge.date}</span>
              <span class="mt-1 text-gray-500 text-sm">{challenge.location}</span>
            </div>
            <div class="md:flex-grow p-4">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">{challenge.title}</h2>
              <p class="leading-relaxed">{challenge.description}</p>
              <br />
              <p class="leading-relaxed">Enrolled: {challenge.participants.length}</p>
              <br />
              <a class="text-indigo-500 inline-flex items-center mt-4">Learn More
                <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>

  </section>

</div>
      </section>
    </div>
    <div className="md:hidden fixed bottom-0 w-full">
      <DownBar />
    </div>
  </div>
  

  );
}

export default Challenge;

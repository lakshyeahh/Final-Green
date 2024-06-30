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
import img1 from '../Media/event1.jpg';
import img2 from '../Media/event2.png';
import img3 from '../Media/event3.png';
import img4 from '../Media/event4.jpg';
import calender from '../Media/calendar.png'

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
            <section class="text-gray-600 body-font">
              <div class=" px-5 py-24 mx-auto">
                <div class="flex flex-wrap -m-4">
                  {filteredChallenges.map((challenge, index) => (
                    <div class="p-4 w-full shadow-md mb-4" key={index}>
                      <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">

                        <img alt="team" class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={images[index % images.length]} />
                        <div class="flex-grow sm:pl-8">
                          <ul>
                            <li> <h2 class="title-font font-medium text-lg text-gray-900">{challenge.title}</h2> </li>
                            <li> <h3 class="text-gray-500 mb-3">{challenge.mode}</h3></li>
                            <li> <p class="mb-4">{challenge.description}</p> </li>
                            <li className="my-4 flex items-center" key={index}>
                              <span className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded text-center">
                                Enrolled: {challenge.participants.length}
                              </span>
                              <button className="flex-end relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 ml-auto">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                  Enroll
                                </span>
                              </button>
                            </li>



                            {/* <span class="inline-flex">
              <a class="text-gray-500">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
              </a>
            </span> */}
                          </ul>
                          <div class="flex flex-wrap w-full my-3 sm:mx-auto sm:mb-2 -mx-2">
                            <div class="p-2 sm:w-1/2 w-full">
                              <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                                <img
                                  src={calender}
                                  alt="Your Image Description"
                                  class="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                                />
                                <span class="title-font font-medium">{new Date(challenge.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div class="p-2 sm:w-1/2 w-full">
                              <div class="bg-gray-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" class="text-green-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                  <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span class="title-font font-medium">{challenge.location}</span>
                              </div>
                            </div>

                          </div>
                        </div>

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

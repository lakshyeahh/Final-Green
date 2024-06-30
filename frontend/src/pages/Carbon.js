import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, CssBaseline, Box } from '@mui/material';
import CardComponent from '../components/shared/Card';
import NavigationMenuDemo from '../components/shared/navbar';
import { useState, useEffect, useRef } from 'react';
import { Flex, Badge, Button } from '@radix-ui/themes';
import user from '../Media/user.png'
import bkg from '../Media/background.png';
import nature from '../Media/mountain.jpg'
import cloud from '../Media/cloud.gif'
import Example from '../components/shared/Chart';
import PChart from '../components/shared/PieChart';
import Footer from '../components/shared/Footer';
import { Link } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import c1 from '../Media/c1.png'
import c2 from '../Media/c2.png'
import c3 from '../Media/c3.png'
import c4 from '../Media/c4.png'
import Linechart from '../components/shared/LineChart';
import Donut from '../components/shared/Donut';
import Bar from '../components/shared/Bar';
import DownBar from '../components/shared/DownBar';
import logo from '../Media/logo.png'
import leaf from '../Media/leaf3d.png'


const drawerWidth = 240;
const randomHashtags = [
  'ReactJS', 'JavaScript', 'WebDevelopment', 'Coding', 'Tech',
  'OpenSource', 'Frontend', 'Backend', 'UIUX', 'Design'
];


function Carbon() {

  const [challenges, setChallenges] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const chartRef = useRef(null);
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  const [loading, setLoading] = useState(true);
  const [carbonAvailable, setCarbonAvailable] = useState(false);

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
        setUserData(data.user);
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
    const fetchCarbonFootprint = async () => {
      const accessToken = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage

      if (!accessToken) {
        console.error('No auth token found');
        setError('No auth token found');
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/carbon-footprint/recent`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch carbon footprint');
        }

        const data = await response.json();
        setCarbonFootprint(data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching carbon footprint:', error);
        setError(error.message);
      }
    };

    fetchCarbonFootprint();
  }, []);// Empty dependency ar

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
        console.log(carbonFootprint);
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

  if(!carbonFootprint){
    return(
      
    <div className="flex flex-col min-h-screen">
    <header>
      <NavigationMenuDemo userData={userData} />
    </header>
    <div className="flex flex-1">
      <aside className="hidden lg:block w-1/8">
        <Sidebar userData={userData} />
      </aside>
      <section className="w-full px-3 md:px-10 ">
      <section class="bg-white  ">
    <div class=" flex items-center min-h-screen px-6  mx-auto">
        <div class="flex flex-col items-center max-w-sm mx-auto text-center">
           <img src={leaf}></img>
            <h1 class="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">Ooi! No Carbon Footprint Found</h1>
            <p class="mt-4 text-gray-500 ">You have calculated your recent carbon footprint yet, Click on the button below to calculate it now ;)</p>

            <div class="flex items-center w-full mt-6 justify-center sm:w-auto">
        
            <Link to='/carbon-footprint/new'>
            <Button color='lime' className='hover:scale-105' > Calculate CF</Button>
            </Link>
            </div>
        </div>
    </div>
</section>
      </section>
    </div>
    <div className="md:hidden fixed bottom-0 w-full">
      <DownBar />
    </div>
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
          <Box className=''>
            <div className=''>


              <div className='flex justify-between items-center my-7'>
                <h1 className='font-bold text-3xl '>Your footprint</h1>
                <Link to='/carbon-footprint/new'>
                  <Button color='lime' className='hover:scale-105' > Calculate CF</Button>
                </Link>

              </div>





              {carbonFootprint && (

                <div className='flex bg-sky-100 py-10 px-5 border-2 border-blue-700 rounded-xl items-center -mb-10 shadow-lg '>
                  <section class="text-gray-600 body-font w-full">
                    <div class="  mx-auto">
                      <div class="flex flex-wrap  text-center">
                        <div class=" md:w-1/5 sm:w-1/2 w-full">
                          <div className='relative  bg-gradient-to-t from-purple-500 to-pink-300 rounded-2xl p-4 overflow-hidden '>
                            <img src={nature} className='absolute top-0 left-0 w-full h-full object-cover rounded-2xl opacity-90' alt="Nature" />
                            <div className='absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 bg-white opacity-50 rounded-full' style={{ width: '300px', height: '300px' }}></div>
                            <div className='relative z-10'>
                              <div className=' p-4 rounded-2xl '>
                                <Typography variant="h3" gutterBottom>
                                  <br />
                                  <br />
                                  <img src={cloud} className='absolute right-10 top-0 w-lg' style={{ height: '50px' }} />
                                  <div className='absolute bottom-9 right-0 transform translate-x-1/2 translate-y-1/2 bg-blue-900 opacity-50 overflow-hidden rounded-full' style={{ width: '100px', height: '100px' }}></div>
                                  <div
                                    className="absolute bottom-8 left-6 transform -translate-x-1/2 translate-y-1/2 overflow-hidden rounded-full"
                                    style={{
                                      width: '60px',
                                      height: '60px',
                                      borderTopLeftRadius: '0',
                                      backgroundColor: carbonFootprint.total < 2000 ? '#10B981' : carbonFootprint.total >= 2000 && carbonFootprint.total <= 5000 ? '#F59E0B' : '#EF4444',
                                      opacity: 0.7,
                                    }}
                                  >
                                    <p className="text-white text-xs flex items-center justify-center h-full font-bold">
                                      {carbonFootprint.total < 2000 ? 'Good' : carbonFootprint.total >= 2000 && carbonFootprint.total <= 5000 ? 'Moderate' : 'High'}
                                    </p>
                                  </div>


                                  <h1 className='font-bold absolute text-sky-950 top-0 left-0 drop-shadow-blue-200 drop-shadow-2xl'>

                                    {carbonFootprint.total.toFixed(2)}
                                  </h1>
                                  <h6 className='font-sm-bold absolute text-sm text-sky-700 top-12 left-0 drop-shadow-blue-200 drop-shadow-2xl'>
                                    tons of CO2E
                                  </h6>

                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class=" md:w-1/5 sm:w-1/2 w-full">
                          <div class="border-4 border-blue-200 bg-white px-4 py-6 rounded-xl">

                            <img src={c1} class="w-12 h-12 mb-3 inline-block" alt="Descriptive Alt Text" />

                            <h2 class="title-font font-medium text-3xl text-gray-900">{carbonFootprint.transportation.toFixed(2)}</h2>
                            <p class="leading-relaxed">Transport</p>
                          </div>
                        </div>
                        <div class=" md:w-1/5 sm:w-1/2 w-full">
                          <div class="border-4 border-blue-200 bg-white px-4 py-6 rounded-xl">
                            <img src={c2} class="w-12 h-12 mb-3 inline-block" alt="Descriptive Alt Text" />
                            <h2 class="title-font font-medium text-3xl text-gray-900">{carbonFootprint.diet.toFixed(2)}</h2>
                            <p class="leading-relaxed">Diet</p>
                          </div>
                        </div>
                        <div class=" md:w-1/5 sm:w-1/2 w-full">
                          <div class="border-4 border-blue-200  bg-white px-4 py-6 rounded-xl">
                            <img src={c3} class="w-12 h-12 mb-3 inline-block" alt="Descriptive Alt Text" />
                            <h2 class="title-font font-medium text-3xl text-gray-900">{carbonFootprint.energyUsage.toFixed(2)}</h2>
                            <p class="leading-relaxed">Energy Usage</p>
                          </div>
                        </div>
                        <div class="md:w-1/5 sm:w-1/2 w-full">
                          <div class="border-4 border-blue-200 bg-white px-4 py-6 rounded-xl">
                            <img src={c4} class="w-12 h-12 mb-3 inline-block" alt="Descriptive Alt Text" />
                            <h2 class="title-font font-medium text-3xl text-gray-900">{carbonFootprint.otherFactors.toFixed(2)}</h2>
                            <p class="leading-relaxed">Other Factors</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>

            <section class="text-gray-600 body-font" >

              <div class=" px-5 py-24 mx-auto " >

                <h1 className='text-2xl font-medium  text-sky-300 mb-10'>
                  Red<span className='text-sky-400'>uce</span> <span className='text-sky-500'>yo</span><span className='text-sky-600'>ur</span> <span className='text-sky-700'>CF</span>
                </h1>


                <div class="flex flex-wrap -m-4" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(155,213,255,1) 46%, rgba(255,255,255,1) 100%)' }}>

                  <div class="p-4 lg:w-1/3">
                    <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">TRANSPORT</h2>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-sky-700 mb-3">Electric Vehicles</h1>
                      <p class="leading-relaxed mb-3">Switching to electric vehicles can significantly reduce carbon emissions and air pollution.</p>
                      <a href="#" class="text-indigo-500 inline-flex items-center">Learn More
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                      <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                        <span class="text-gray-400 bg-gray-300 w-2/3 rounded-xl mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">

                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="p-4 lg:w-1/3">
                    <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">DIET</h2>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-sky-700 mb-3">Plant-Based Diet</h1>
                      <p class="leading-relaxed mb-3">Adopting a plant-based diet reduces greenhouse gas emissions associated with meat production.</p>
                      <a href="#" class="text-indigo-500 inline-flex items-center">Learn More
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                      <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                        <span class="text-gray-400 bg-gray-300 w-2/3 rounded-xl mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">

                        </span>
                      </div>
                    </div>
                  </div>


                  <div class="p-4 lg:w-1/3">
                    <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                      <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">ENERGY</h2>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-sky-700 mb-3">Renewable Energy</h1>
                      <p class="leading-relaxed mb-3">Switching to renewable energy sources like solar and wind power reduces dependence on fossil fuels.</p>
                      <a href="#" class="text-indigo-500 inline-flex items-center">Learn More
                        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                      <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                        <span class="text-gray-400 bg-gray-300 w-2/3 rounded-xl mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">

                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            <section className=' px-5 py-20 -mx-10 mb-20 mx-auto   ' >
              <h1 className='text-2xl font-bold font-medium  text-sky-300 text-left'>
                An<span className='text-sky-400'>al</span><span className='text-sky-500'>yt</span><span className='text-sky-600'>ic</span><span className='text-sky-700'>s</span>
              </h1>
              <div className='flex flex-wrap gap-6 justify-center ' style={{ background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(83,167,237,1) 46%, rgba(115,155,240,1) 56%, rgba(147,165,243,1) 66%, rgba(255,255,255,1) 100%)' }} >



                <h4 className='font-medium'>History of Your CFs</h4>
                <div className='w-full bg-gray-200 rounded-2xl h-1' >

                </div>
                <Linechart />

                <h4 className='font-medium text-lg text-white mt-20 -mb-44'>Contributions in Your CFs</h4>
                <div className='w-full bg-blue-300 rounded-2xl h-1 mt-24 -mb-44' >

                </div>
                <Donut />

                <h4 className='font-medium text-lg text-indigo-900 '>Comparisions with Others</h4>
                <div className='w-full bg-indigo-200 rounded-2xl h-1 ' >

                </div>
                <Bar />


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

export default Carbon;

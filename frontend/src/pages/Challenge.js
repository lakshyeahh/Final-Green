import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, CssBaseline, Box } from '@mui/material';
import CardComponent from '../components/shared/Card';
import NavigationMenuDemo from '../components/shared/navbar';
import { useState, useEffect } from 'react';
import { Flex, Badge } from '@radix-ui/themes';
import user from '../Media/user.png'
import bkg from '../Media/background.png';
import Sidebar from '../components/shared/Sidebar';
import img1 from '../Media/Image1.png';
import img2 from '../Media/Image2.png';
import img3 from '../Media/Image3.png';
import img4 from '../Media/Image4.png';
import img5 from '../Media/Image5.png';
import img6 from '../Media/Image6.png';
import img7 from '../Media/Image7.png';
import img8 from '../Media/Image8.png';
import img9 from '../Media/Image9.png';
import img10 from '../Media/Image10.png';


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

    useEffect(() => {
        const fetchChallenges = async () => {
          try {
            
           
    
            const response = await fetch('/api/challenges', {
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
          case 'highPoints':
            sortedChallenges.sort((a, b) => b.points - a.points);
            break;
          case 'new':
            sortedChallenges.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
            break;
          default:
            sortedChallenges = challenges;
        }
        setFilteredChallenges(sortedChallenges);
      }, [activeTab, challenges]);
      
    const images = [
      
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10
      // Add more images if needed
    ];
    
  return (

    <div className="flex flex-col   ">
    <header className="  ">
      <NavigationMenuDemo userData={userData} />
    </header>
    <div className="flex flex-1 ">
      <aside className=" ">
        <Sidebar userData={userData} />
      </aside>
      <section className="">
       <Box className='mx-9 my-10'
  
        >
        
          <div className=' bg-gradient-to-tr from-teal-300 to-lime-300 p-2 rounded-2xl' >
            <div className=' bg-white to-pink-300 p-4 rounded-2xl'>

       

         
          <Typography  variant="h3" gutterBottom  >
            <h1  className='font-bold text-black'>
            Challenges
            </h1>
            
          </Typography>
          
          <div style={{ height: '2px', width: '50%', backgroundColor: 'grey'}}></div>
          <br />
           {/* Render the CardComponent for each challenge */}
           
           <p className="text-gray-700 text-lg mt-4 leading-tight">
  Check out the exciting challenges below and start your journey towards personal growth and achievement!
</p>
</div>
</div>
<header class="text-gray-600 body-font">
  <div class=" mx-auto mt-10 flex flex-wrap p-5 flex-col md:flex-row items-center bg-grey-200 border-2 border-black rounded-2xl  ">
  <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
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
            <section class="text-gray-600 body-font">
  <div class=" px-5 py-20 mx-auto">
    <div class="flex flex-wrap -m-4">
    {filteredChallenges.map((challenge, index) => (
      <div class="p-4 md:w-1/3">
        <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img class="lg:h-48 md:h-36 w-full object-cover object-center" src={images[index % images.length]} alt="blog" />
          <div class="p-6">
            <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY  <Badge variant="solid" color="teal">
                New
              </Badge></h2>
            <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{challenge.title} </h1>
           
            <p class="leading-relaxed mb-3">{challenge.description}</p>
            <div class="flex items-center flex-wrap ">
              <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
              <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
               <img className='h-6' src={user} /> {challenge.participants.length}
              </span>
              <span class="text-gray-400 inline-flex items-center leading-none text-sm">
              <svg  class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="20" viewBox="0 0 30 30">
    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path>
</svg> 


{challenge.points}
                
              </span>
            </div>
          </div>
        </div>
      </div>
          ))}
    </div>
  </div>
</section>
         
        </Box>
      </section>
    </div>
  </div>
  );
}

export default Challenge;

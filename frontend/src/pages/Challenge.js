import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, CssBaseline, Box } from '@mui/material';
import CardComponent from '../components/shared/Card';
import NavigationMenuDemo from '../components/shared/navbar';
import { useState, useEffect } from 'react';
import { Flex, Badge, Button } from '@radix-ui/themes';
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
import DownBar from '../components/shared/DownBar';
import { ToastContainer, toast } from 'react-toastify';
import logo from '../Media/logo.png'
import Reward from '../components/specific/Reward';
import poster from '../Media/poster.png'
import './Challenge.css';


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
    const [showModal, setShowModal] = useState(true);

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
        const fetchChallenges = async () => {
          try {
            
           
    
            const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges`, {
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
            sortedChallenges.sort((a, b) => b.participants > a.participants);
            break;
          case 'highPoints':
            sortedChallenges.sort((a, b) => b.points > a.points);
            break;
          case 'new':
            sortedChallenges.sort((a, b) => new Date(b.startDate) > new Date(a.startDate));
            break;
          default:
            sortedChallenges = challenges;
        }
        setFilteredChallenges(sortedChallenges);
      }, [activeTab, challenges]);

      const handleJoinChallenge = async (challengeId) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges/${challengeId}/join`, {
            method: 'POST',
            headers: {
              'Content': `application/json`,
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          toast.success(data.message);
        } catch (error) {
          toast.error('Failed to join the challenge. Please try again later.');
        }
      };
      
      
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
  <ToastContainer />
  
  <Box className=' '>
  {showModal && (
        <>
          <div className="modal-overlay"></div>
          <dialog id='reward' className="modal" open>
            <div className="modal-box bg-white relative z-20 p-4">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </form>
              <img src={poster} alt="Reward Poster" className="mb-4" />
              <div className="flex justify-center mt-4">
                <a href={poster} download="reward-poster.jpg" className="btn btn-secondary">
                  Download Image
                </a>
              </div>
            </div>
          </dialog>
        </>
      )}
  {/* <dialog id='reward' className="modal w-full -p-4"><div class="modal-box  text-gray-600 body-font bg-white">
  <img src={poster}></img>
  </div></dialog> */}
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
          <div className="py-20 mx-auto">
  <div className="flex flex-wrap -m-4">
    {filteredChallenges.map((challenge, index) => (
      <div className="p-4 md:w-1/3" key={index}>
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden flex flex-col justify-between min-h-[400px] max-h-[800px]">
          <img
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={images[index % images.length]}
            alt="blog"
          />
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">


              <Badge variant="solid" color={
          challenge.category === 'leaf' ? 'teal' :
          challenge.category === 'fuel' ? 'amber' :
          challenge.category === 'drop' ? 'blue' :
          challenge.category === 'clean' ? 'violet' :
          'gray' // Default to gray if category doesn't match known types
        } className='shadow-lg'>
          {challenge.category}
        </Badge>
              </h2>
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{challenge.title}</h1>
              <p className="leading-relaxed mb-3">{challenge.description}</p>
            </div>
            <div className="flex items-center flex-wrap">
            <button
                className="btn bg-gradient-to-tr from-teal-300 to-lime-300 text-gray-600 mt-5 w-20"
                onClick={() => {
                  document.getElementById(`my_modal_${index}`).showModal();
                }}
              >
                Join
              </button>
              <dialog id={`my_modal_${index}`} className="modal">
                <div className="modal-box bg-white">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg text-green-500 mb-5">Good Job!</h3>
                  <ul className="max-w-md space-y-1 text-gray-800 list-inside mb-10">
                    {challenge.steps.map((step) => (
                      <li key={step._id} className="flex items-center">
                        <svg className="w-3.5 h-3.5 me-2 text-gray-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                        {step.description}
                      </li>
                    ))}
                  </ul>
                  <p className="py-4 mt-4 text-gray-400 mb-5">
                    Click on the button to confirm your joining and completing the challenge within the end date.
                  </p>
                  <br/>
                  <Button color='jade' className='mt-5 bg-green-400 px-3 py-1 rounded-xl hover:bg-green-500' onClick={() => handleJoinChallenge(challenge._id)}>Confirm</Button>
                </div>
              </dialog>
              <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                <img className="h-6" src={user} alt="participants" /> {challenge.participants.length}
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
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
<div className="md:hidden fixed bottom-0 w-full">
  <DownBar />
</div>
</div>

  );
}

export default Challenge;

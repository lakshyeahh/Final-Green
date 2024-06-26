import React, { useEffect, useState } from 'react';
import NavigationMenuDemo from '../components/shared/navbar';
import './dashboard.css';
import Sidebar from '../components/shared/Sidebar';
import DownBar from '../components/shared/DownBar';
import { Toolbar, Typography, Box } from '@mui/material';
import clean from '../Media/clean.png';
import leaf from '../Media/leaf.png';
import drop from '../Media/drop.png';
import fuel from '../Media/fuel.png';
import { Link } from 'react-router-dom';
import logo from '../Media/logo.png'






function Submit() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  const [challengeDetails, setChallengeDetails] = useState([null]);
  const [challenges, setChallenges] = useState([
    {
      _id: 'sample1',
      name: 'Sample Challenge 1',
      points: 100,
      endDate: '2024-12-31',
      progress: 50,
    },
    {
      _id: 'sample2',
      name: 'Sample Challenge 2',
      points: 200,
      endDate: '2024-11-30',
      progress: 75,
    },
  ]);
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
    if (!userData || !userData.activeChallenges) {
      setLoading(false);
      return;
    }

    const fetchActiveChallenges = async () => {
      try {
        if (!token) {
          alert("Login First!");
          throw new Error('Access token not found');
        }

        const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges/active`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        setChallengeDetails(data);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActiveChallenges();
  }, [userData]);




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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
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
          <div className=' bg-gradient-to-r from-[rgba(33,0,255,0.9025735294117647)] to-[rgba(128,0,255,0.8969712885154062)] p-1 md:p-2 rounded-2xl' >
            <div className=' bg-white to-pink-300 p-4 rounded-2xl'>




              <Typography variant="h3" gutterBottom  >
                <h1 className='font-bold text-black'>
                  Active Challenges
                </h1>

              </Typography>



              {/* Render the CardComponent for each challenge */}


            </div>
          </div>
          <section class="text-gray-600 body-font">
            <div class="  mx-auto flex flex-col">
              {challengeDetails && challengeDetails.map((one, index) => (
                <div class="w-full mx-auto">
                  {one && one.challenge && (
                    <div class="px-10 py-5 flex flex-col sm:flex-row mt-10 bg-white border border-gray-200 rounded-lg shadow " >
                      <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                        <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-green-200 text-gray-400">
                          <img src={
                            one.challenge.category === 'leaf' ? leaf :
                              one.challenge.category === 'fuel' ? fuel :
                                one.challenge.category === 'drop' ? drop :
                                  one.challenge.category === 'clean' ? clean :
                                    clean


                          } alt="Profile Image" className="w-10 h-10 object-cover rounded-full" />

                        </div>

                        <div class="flex flex-col items-center text-center justify-center">
                          <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">{one.challenge.title}</h2>
                          <div class="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>

                        </div>

                      </div>
                      <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">

                        <ul key={one.challenge._id} className="max-w-md space-y-1 text-gray-700 list-inside dark:text-gray-400">
                          {one && one.challenge.steps && one.challenge.steps.map((step) => (
                            <li key={step._id} className="flex items-center">
                              <svg
                                className={`w-5 h-5 me-2 ${index < one.progress ? 'bg-green-500 text-white' : 'text-gray-500'} flex-shrink-0 rounded-full p-1`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                              </svg>
                              {step.description}
                            </li>
                          ))}
                        </ul>

                        <Link to={`/submit/${one.challenge.id}`}>

                          <button type="button" class="mt-4 w-20 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Submit
                          </button>
                        </Link>
                      </div>

                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </section>
      </div>
      <div className="md:hidden fixed bottom-0 w-full">
        <DownBar />
      </div>
    </div>


  )

}

export default Submit;

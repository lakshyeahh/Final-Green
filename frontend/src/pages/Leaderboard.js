import React, { useState, useEffect } from 'react'
import NavigationMenuDemo from '../components/shared/navbar'
import Footer from '../components/shared/Footer'
import users from '../Media/users.png'
import diamond from '../Media/diamond.png'
import info from '../Media/info.png'
import Timer from '../components/shared/Timer'
import Trophy from '../Media/trophy.png'
import userImage from '../Media/user.png'
import rank_1 from '../Media/one.png';
import rank_2 from '../Media/two.png';
import rank_3 from '../Media/three.png';
import DownBar from '../components/shared/DownBar'
import logo from '../Media/logo.png'
import Sidebar from '../components/shared/Sidebar'


function Leaderboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  const [completedChallenges, setCompletedChallenges] = useState(null);
  const [ranking, setRanking] = useState([null]);
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
       
        setUserData(data.user);
        
       
       
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMeData();
  }, []);

useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/leaderboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setRanking(data); // Assuming data is an array of leaderboard entries
        setRanking(data);
        setTimeout(() => {
          setLoading(false);
        }, 500);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []); 

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col">
        <img src={logo} className="h-16 mb-4" alt="Logo" />
        <span className="loading loading-dots loading-lg text-green-300 bg-green-300"></span>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const top3Ranking = ranking.slice(0, 3);
  const rankImages = [rank_1, rank_2, rank_3];
  const remainingRanking = ranking.slice(3);


  return (


    <div className="flex flex-col min-h-screen">
    <header>
      <NavigationMenuDemo userData={userData} />
    </header>
    <div className="flex flex-1">
      <aside className="hidden lg:block w-1/8">
        <Sidebar userData={userData} />
      </aside>
      <section className="w-full  ">
      <section className="">
          <div className=''>


            <section class="text-gray-600 body-font">
              <div class=" px-5 py-10 mx-auto">
                <div className="flex flex-wrap w-full mb-5 flex-col items-start text-left"> {/* Change items-center to items-start and text-center to text-left */}
                  <h1 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-900 ">Leaderboard</h1> {/* Add ml-6 class to move the heading to the left */}
                </div>
                <div class="flex flex-wrap -m-4">
                  <div class=" w-full md:w-1/4  p-4" >
                  {ranking && (  
                    <div class="border border-gray-200 p-6 w-full  bg-green-50 rounded-lg">
                    
                      <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                        <img src={users} />
                      </div>
                      <h2 class="text-lg text-gray-600  font-medium title-font mb-2">Joined Members</h2>
                      <p class="leading-relaxed text-3xl font-bold text-black">{ranking.length}</p>
                   
                    </div>
                  )}
                  </div>
                  {userData && ( 
                  <div class=" w-full md:w-1/4  p-4 ">
                    <div class="border border-gray-200 p-6 bg-blue-50 rounded-lg">
                    
                      <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                        <img src={diamond} />
                      </div>
                
                      <h2 class="text-lg text-gray-600  font-medium title-font mb-2">Challenges Completed</h2>
                      <p class="leading-relaxed text-3xl font-bold text-black">{userData.completedChallenges.length}</p>
                  
                    </div>
                  </div>
                    )}
              
                  <div class="w-full md:w-1/2  p-4">

                    <div className="border border-gray-200 p-6 bg-yellow-100 rounded-lg">
                      <h2 className="text-2xl font-bold text-black title-font mb-4">
                        Currently Active Challenges 🔥🔥
                        <div className='border-b border-1 border-gray-300  w-full '></div>
                        {/* Timer component placed to the right */}
                      </h2>

                      <p className="leading-relaxed font-medium text-base flex gap-2">
                        <img className='h-3' src={info} alt="Info Icon" />
                        <span>Time Remaining: <Timer /></span> {/* Timer component also displayed here */}
                        <img className='h-11 absolute right-20 hidden md:block' src={Trophy} />
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </section>

            <section class="text-gray-600 body-font">
              <div class=" px-5 py-10 ">
                <div className="flex flex-wrap w-full mb-5 flex-col items-start text-left"> {/* Change items-center to items-start and text-center to text-left */}
                  <h1 className="sm:text-2xl text-2xl font-bold title-font mb-2 text-gray-900 ">Current Leaders</h1> {/* Add ml-6 class to move the heading to the left */}
                </div>
                <div className="flex flex-wrap -m-4">
      {top3Ranking.map((user, index) => (
        <div key={index} className="w-full md:w-1/3  p-4">
          <div className="border border-gray-200 bg-gray-50 rounded-lg items-center">
            <div className="py-4 px-6 flex items-center">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mr-4">
                <img src={userImage} alt="User" className="w-full h-auto" />
              </div>
              <div>
                <h2 className="text-lg text-gray-600 font-medium title-font">{user.name}</h2>
                <p className="leading-relaxed text-2xl font-bold text-black">
                  {user.points} <span className="leading-relaxed text-xl font-bold text-gray-400">pts.</span>
                </p>
              </div>
              <img className='h-8 ml-auto' src={rankImages[index]} alt={`Rank ${index + 1}`} />
              </div>
          
            <div className="px-6">
              <div className='border-b border-gray-200'></div>
              <div className='flex w-full items-center text-center'>
                <div className='w-1/3 border-r border-gray-200 p-2 text-gray-400 font-bold text-center'>
                  <div>Challenges</div>
                  <div className='text-black text-xl font-medium mt-2'>{user.activeChallenges.length}</div>
                </div>
                <div className='w-1/3 border-r border-gray-200 p-2 text-gray-400 font-bold text-center'>
                  <div>Posts</div>
                  <div className='text-black text-xl font-medium mt-2'>{user.posts}</div> {/* Adjust with actual posts count */}
                </div>
                <div className='w-1/3 p-2 text-gray-400 font-bold text-center'>
                  <div>CF</div>
                  <div className='text-black text-xl font-medium mt-2'>{user.carbonFootprint}</div> {/* Adjust with actual CF value */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
              </div>
            </section>


            <section className="text-gray-600 body-font mb-9 overflow-auto">
      <div className="px-5 py-10 mx-auto">
        <div className="flex flex-wrap w-full mb-5 flex-col items-start text-left">
          <h1 className="sm:text-2xl text-2xl font-bold title-font mb-2 text-gray-900 ">Ranking</h1>
        </div>
        <div className="lg:w-full w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-lime-100 rounded-tl rounded-bl">Rank</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-lime-100 rounded-tl rounded-bl">Name</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-lime-100">Points</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-lime-100">CF</th>
              
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-lime-100">Challenges</th>
              </tr>
            </thead>
            <tbody>
              {remainingRanking.map((user, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{index + 4}</td> {/* Index + 4 because we are displaying from rank 4 */}
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.points}</td>
                  <td className="px-4 py-3 text-lg text-gray-900">{user.carbonFootprint || 0}</td> {/* Adjust with actual CF value */}
                 
                  <td className="px-4 py-3 text-lg text-gray-900">{user.activeChallenges?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

            {/* <div class="xl:w-1/3 md:w-1/2 p-4">
<div class="border border-gray-200 p-6 rounded-lg">
  <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
    </svg>
  </div>
  <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Bunker</h2>
  <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
</div>
</div>
<div class="xl:w-1/3 md:w-1/2 p-4">
<div class="border border-gray-200 p-6 rounded-lg">
  <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-6 h-6" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  </div>
  <h2 class="text-lg text-gray-900 font-medium title-font mb-2">Ramona Falls</h2>
  <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
</div>
</div>
</div>
<button class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
</div>
</section> */}


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

export default Leaderboard

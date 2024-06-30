import React from 'react'
import NavigationMenuDemo from '../components/shared/navbar'
import Footer from '../components/shared/Footer'
import pec from '../Media/pec-logo.png'
import { Button } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import Logo from '../Media/logo.png';
import { useState, useEffect } from 'react';
import DownBar from '../components/shared/DownBar'
import logo from '../Media/logo.png'
import './Forum.css'

function Forum() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [posts, setPosts] = useState(null);

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
            setShowOverlay(false);
          }, 5000); 
        
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMeData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {


        const response = await fetch(`${process.env.REACT_APP_URL}/api/social/forums`, {
          method: 'GET',
          headers: {

          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setPosts(data);

        
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
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
<>
{showOverlay && (
        <div id="forum-animation-overlay">
          <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center mb-4 md:mb-0">
  <img className='h-10' src={pec} alt="Logo" />
  <span className="ml-3 text-xl xl:block lg:hidden font-bold">X</span>
  <div className='ml-2 mb-2 logo-text' style={{ fontFamily: '"Abril Fatface", serif', fontWeight: 400, fontSize: '40px' }}>Green</div>
  <span class="ml-3 text-3xl font-light xl:block lg:hidden">Forum</span>
</a>
        </div>
      )}
    <div className="flex flex-col min-h-screen">
    <header>
      <NavigationMenuDemo userData={userData} />
      <header class="text-gray-400 bg-gray-900 body-font">
  <div class=" mx-auto flex flex-wrap  flex-col md:flex-row items-center justify-center">
 
    <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-white lg:items-center lg:justify-center mb-4 md:mb-0">
  <img className='h-10' src={pec} alt="Logo" />
  <span className="ml-3 text-xl xl:block lg:hidden font-bold">X</span>
  <div className='ml-2 mb-2 logo-text' style={{ fontFamily: '"Abril Fatface", serif', fontWeight: 400, fontSize: '40px' }}>Green</div>
  <span class="ml-3 text-3xl font-light xl:block lg:hidden">Forum</span>
</a>

   
  </div>
</header>
<header class="text-gray-600 body-font">
  <div class=" mx-auto flex flex-wrap  flex-col md:flex-row items-center">
   
    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <a class="mr-5 hover:text-gray-900">Stats: 23451</a>
      <a class="mr-5 hover:text-gray-900">Posts: 102</a>

    </nav>
    <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Create New
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</header>

    </header>
    <div className="flex flex-1">
      <aside className="hidden lg:block w-1/8">
        
      </aside>
      <section className="w-full px-3 md:px-10 py-2 md:py-10">
      <section className="text-gray-600 body-font">
  <div className="px-5 py-10 mx-auto flex flex-wrap">
    <div className="lg:w-full mx-auto">
      <div className="flex flex-wrap -mx-2">
        <div className="px-2 w-full md:w-1/3">
        <Link to='/challenges'>
  
          <div className="flex flex-col h-full bg-gray-100 sm:py-12 py-8 sm:px-10 px-6 relative rounded-lg
          hover:scale-105 ease-in-out duration-300 " style={{ background: 'radial-gradient(circle at 10% 20%, rgb(28, 142, 210) 0%, rgb(113, 192, 244) 47.3%, rgb(139, 238, 230) 88.4%)' }}>
             <img src={Logo} alt="Logo" className="logo-image "  class="mt-1 ml-1 h-6 logo-text absolute top-0 left-0" />
            <div className="text-center relative z-10 w-full flex-grow flex flex-col justify-center">
              <h2 className="text-2xl text-white font-bold title-font mb-2">Participate in Challenges</h2>
              <p className="leading-relaxed">Participate and Complete More and More to Be the Number One.</p>
            </div>
          </div>
          </Link>
        </div>
        <div className="px-2 w-full md:w-1/3">
          <div className="flex flex-col h-full bg-gray-100 sm:py-12 py-8 sm:px-10 px-6 relative rounded-lg">
            <div className="text-center relative z-10 w-full flex-grow flex flex-col justify-center">
              <div className="ml-2 mb-2 logo-text" style={{ fontFamily: '"Abril Fatface", serif', fontWeight: 400, fontSize: '20px', color: 'black', textShadow: '0px 0px 20px white' }}>Forum</div>
              <p className="leading-relaxed text-gray-500">Connect, Collaborate, Compliment.</p>
            </div>
          </div>
        </div>
       
        <div className="px-2 w-full md:w-1/3">
        <Link to='/carbon-footprint'>
          <div className="flex flex-col h-full bg-gray-100 sm:py-12 py-8 sm:px-10 px-6 relative rounded-lg
          hover:scale-105 ease-in-out duration-300" style={{ background: 'radial-gradient(circle at -3.1% -4.3%, rgb(57, 255, 186) 0%, rgb(21, 38, 82) 90%)' }}>
           
            <img src={Logo} alt="Logo" className="logo-image "  class="mt-1 ml-1 h-6 logo-text absolute top-0 left-0" />
            <div className="text-center relative z-10 w-full flex-grow flex flex-col justify-center">
              <h2 className="text-2xl text-white font-bold title-font mb-2">Calculate Carbon Footprint</h2>
              <p className="leading-relaxed text-gray-300">Evaluate the actual effect you are causing.</p>
            </div>
          </div>
          </Link>
        </div>
        
      </div>
    </div>
  </div>
</section>

<div className='flex flex-wrap mb-10'>


<section className="text-gray-600 body-font p-6 w-full md:w-2/3 h-2/3 items-left">
<section class="text-gray-600 body-font overflow-hidden">
  <div class=" px-5 py-24 mx-auto">
    <div class="flex flex-wrap -m-12">
    {posts.map(post => (
      <div class="p-12 md:w-1/2 flex flex-col items-start">
        <span class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">{post.confessionCategory}</span>
        <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{post.confessionTitle}</h2>
        <p class="leading-relaxed mb-8">{post.confessionText}</p>
        <div class="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
         
         
         
        </div>
        <a class="inline-flex items-center">

          <span class="flex-grow flex flex-col pl-4">
            <span class="title-font font-medium text-gray-900">Anonymous..</span>
            <span class="text-gray-400 text-xs tracking-widest mt-0.5">email at verma.lakshya071@gmail.com for any response.. </span>
          </span>
        </a>
      </div>
    ))}
    </div>
  </div>
</section>


</section>
<section className="text-gray-600 flex-col body-font w-full md:w-1/3 h-2/3">
  <div class="px-5  mx-auto h-1/3">
    <h1 class="text-3xl font-medium title-font text-gray-900 mb-12 text-center">Testimonials</h1>
    <div class="p-4 md:w-full w-full">
      <div class="h-full bg-gray-100 p-8 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
          <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
        </svg>
          <p class="leading-relaxed mb-6">Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland.</p>

           
            <span class="flex-grow flex flex-col mt-2">
              <span class="title-font font-medium text-gray-900">Holden Caulfield</span>
              <span class="text-gray-500 text-sm">UI DEVELOPER</span>
            </span>

        </div>
      </div>
      <div class="p-4 md:w-full w-full">
      <div class="h-full bg-gray-100 p-8 rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
          <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
        </svg>
          <p class="leading-relaxed mb-6">Synth chartreuse iPhone lomo cray raw denim brunch everyday carry neutra before they sold out fixie 90's microdosing. Tacos pinterest fanny pack venmo, post-ironic heirloom try-hard pabst authentic iceland.</p>
        
           
            <div class="flex-grow flex flex-col mt-2">
              <span class="title-font font-medium text-gray-900">Alper Kamu</span>
              <span class="text-gray-500 text-sm">DESIGNER</span>
            </div>

        </div>
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
  </>
  )
}

export default Forum

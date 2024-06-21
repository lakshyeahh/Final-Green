import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ResourceList() {
    const [resources, setResources] = useState([]);
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/education/resources`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResources(data.slice(0, 2)); // Only take the top 3 events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchResources();
  }, []);

  return (

    <section class="text-gray-600 m-6 body-font overflow-hidden " >
    <h1 className='text-4xl font-bold text-black m-5' style={{ fontFamily: '' }}> 3. Resources</h1>

    <div class=" px-5 py-10 mx-auto bg-lime-50 rounded-xl ">
      <div class="flex flex-wrap -m-12  ">
      {resources.map((resource, index) => (
        <div class="p-12 md:w-1/2  flex flex-col  items-start    shadow-lg ease-in-out duration-300 hover:scale-105 ">
        <span class="inline-block py-1 px-2 rounded text-lime-800 bg-lime-300 text-xs font-medium tracking-widest">{resource.type}</span>
          <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{resource.title}</h2>
          <p class="leading-relaxed mb-8">{resource.description}</p>
          <div class="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-lime-900 mt-auto w-full">
          
            
            <a class="text-lime-800  font-bold inline-flex items-center" href='/login'>Explore
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
  )
}

export default ResourceList

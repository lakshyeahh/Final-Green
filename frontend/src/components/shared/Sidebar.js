import React, { useState, useEffect } from 'react';
import Logo from '../../Media/logo.png';


const Sidebar = ({ userData, logout }) => {


   const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications when component mounts
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/api/notifications`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        throw new Error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
   return (
    <div className='h-full w-64 dark:bg-teal-950 dark:border-gray-700 '>


    
      <aside className='h-full w-64 dark:bg-teal-950 dark:border-gray-700 '>
        


      <aside class="flex flex-col w-64 h-screen px-10 py-4 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-teal-950 dark:border-gray-700 scroll-smooth">
        
         <div class="flex flex-col justify-between flex-1 ">
            <nav class="-mx-3 space-y-3 mb-6">
            {userData && (
            <div class="flex flex-col items-center mt-6 -mx-2 mb-6">
        <img class="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar"/>
        <h4 class="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{userData.name}</h4>
        <p class="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{userData.email}</p>
    </div>
    )}

              

               <a class="flex items-center px-3 py-2 text-gray-500 transition-colors duration-300 transform rounded-lg  hover:bg-teal-300   hover:text-black" href="/submit">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                  </svg>

                  <span class="mx-2 text-sm font-medium">Submit Challenge</span>
               </a>

               <a class="flex items-center px-3 py-2 text-gray-500 transition-colors duration-300 transform rounded-lg  hover:bg-teal-300    hover:text-black" href="/carbon-footprint">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                     <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                  </svg>

                  <span class="mx-2 text-sm font-medium">Carbon Footprint</span>
               </a>

               <a class="flex items-center px-3 py-2 text-gray-500 transition-colors duration-300 transform rounded-lg  hover:bg-teal-300    hover:text-gray-700" href="/leaderboard ">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M14.2718 10.445L18 2M9.31612 10.6323L5 2M12.7615 10.0479L8.835 2M14.36 2L13.32 4.5M6 16C6 19.3137 8.68629 22 12 22C15.3137 22 18 19.3137 18 16C18 12.6863 15.3137 10 12 10C8.68629 10 6 12.6863 6 16Z" />

                  </svg>
                

                  <span class="mx-2 text-sm font-medium">Leaderboard</span>
               </a>
               <a class="flex items-center px-3 py-2 text-gray-500 transition-colors duration-300 transform rounded-lg  hover:bg-teal-300    hover:text-gray-700" href="/forum">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>

                  <span class="mx-2 text-sm font-medium">Forum</span>
               </a>
            </nav>

            <div>
               <div class="flex items-center justify-between">
                  <h2 class="text-base font-semibold text-gray-800 dark:text-white">Notifications</h2>

             
               </div>

               <nav className="mt-4 -mx-3 space-y-3">
      {notifications.map(notification => (
        <button
          key={notification._id} // Assuming notification has an _id field
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium transition-colors duration-300 transform rounded-lg bg-gray-300 hover:text-gray-700"
        >
          <div className="flex items-center gap-x-2">
            <span
              className={`w-2 h-2 absolute rounded-full ${getColorClass(notification.type)}`}
            ></span>
            <span className='ml-6'>{notification.message}</span>
          </div>
        </button>
      ))}
    </nav>
            </div>
         </div>
      </aside>

      
      </aside>
      </div>

   )
}
const getColorClass = type => {
   switch (type) {
     case 'pass':
       return 'bg-green-500';
     case 'warning':
       return 'bg-yellow-500';
     case 'reject':
       return 'bg-red-500';
     default:
       return 'bg-gray-500'; // Default color for unknown types
   }
 };

export default Sidebar

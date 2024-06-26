import React, { useState, useEffect } from 'react';
import bkg from '../../Media/background.png'
import img1 from '../../Media/Image1.png';
import img2 from '../../Media/Image2.png';
import img3 from '../../Media/Image3.png';
import img4 from '../../Media/Image4.png';
import img5 from '../../Media/Image5.png';
import img6 from '../../Media/Image6.png';
import img7 from '../../Media/Image7.png';
import img8 from '../../Media/Image8.png';
import img9 from '../../Media/Image9.png';
import img10 from '../../Media/Image10.png';

function ChallengeList() {
    const [challenges, setChallenges] = useState([]);
    const [error, setError] = useState(null);

    const fetchChallenges = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges`);

            if (!response.ok) {
                throw new Error('Failed to fetch challenges data');
            }

            const data = await response.json();
            setChallenges(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchChallenges();
    }, []);

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
   
        <section class="text-gray-600 body-font overflow-hidden">
        <div class="px-5 py-24 mx-auto">
          <h1 class='text-4xl font-bold text-black m-5' style={{ fontFamily: '' }}> 1. Challenges</h1>
          <div class="flex flex-no-wrap animate-infinite-scroll-mobile md:animate-infinite-scroll" >
          {challenges.map((challenge, index) => (
           <div className="flex-none p-4" style={{width: "400px"}} key={index}>
           <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:translate-x-2">
             <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={images[index % images.length]} alt="challenge" />
             <div className="p-6">
               <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{challenge.category}</h2>
               <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{challenge.title}</h1>
               <p className="leading-relaxed mb-3">{challenge.description.split(' ').slice(0, 9).join(' ')} ...</p>
               <div className="flex items-center flex-wrap mt-10 justify-center text-center space-x-4">
                 <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                   <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                     <circle cx="12" cy="12" r="3"></circle>
                   </svg>
                   {challenge.participants.length}
                 </span>
                 <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                   <p>Points: {challenge.points}</p>
                 </span>
               </div>
             </div>
           </div>
         </div>
         
            ))}
          </div>
        </div>
      </section>
      
      

    );
}

export default ChallengeList;

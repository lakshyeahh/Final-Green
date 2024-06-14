import React, {useState, useEffect} from 'react'
import NavigationMenuDemo from '../components/shared/navbar'
import Map from './map';
import arrow from '../Media/arrow.png'
import { MinusCircledIcon } from '@radix-ui/react-icons';
import wm from '../Media/wm1.png'
import wm2 from '../Media/wm2.png'
import wm3 from '../Media/wm3.jpg'
import wm4 from '../Media/wm4.jpg'
import Footer from '../components/shared/Footer';


function Waste() {
  const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('accessToken');


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


  return (
    <div>
        <NavigationMenuDemo userData={userData}/>
  
<section class="text-gray-600 body-font relative">
  <div class="absolute inset-0 bg-gray-300">
    <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="map" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11531.854028529664!2d76.7759022086421!3d30.762207920682993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff282845c404b%3A0xc0844bf7cbdcc6e9!2sPunjab%20Engineering%20College%20(PEC)!5e0!3m2!1sen!2sin!4v1718094760026!5m2!1sen!2sin" ></iframe>
  </div>
  <div class=" px-5 py-24 mx-auto flex">
    <div class="lg:w-1/3 md:w-1/2 bg-lime-200 border-4 border-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
      <h2 class="text-gray-900 text-xl mb-1 font-medium title-font">Waste Management Points</h2>
      <p class="leading-relaxed mb-5 text-gray-600">Throuought the college, the places where where efficient collection, management and disposal of waste takes place</p>
      <div className="relative mb-4">
      <ul className="list-none pl-6"> {/* Remove default list style and adjust left padding */}
        <li className="flex items-center mb-2">
          <span className="h-4 w-4 bg-white rounded-full mr-2"></span> {/* White bullet */}
          PEC Market WM Point
        </li>
        <li className="flex items-center mb-2">
        <span className="h-4 w-4 bg-white rounded-full mr-2"></span> {/* White bullet */}
          Nescafe WM Point
        </li>
        <li className="flex items-center mb-2">
        <span className="h-4 w-4 bg-white rounded-full mr-2"></span> {/* White bullet */}
          Himalya Hostel WM Point
        </li>
        {/* Add more places as needed */}
      </ul>
    </div>
      <div class="relative mb-4">
      
      </div>
      <button class="text-white flex gap-20 bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Explore More   </button>
    
      <p class="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
    </div>
  </div>
</section>
{/* <section class="text-gray-600 body-font p-4" >
  <h1 className='m-4 mt-10 text-3xl'>
    All Waste Management Points (WM)
  </h1>
  <div className='w-full h-2 bg-lime-100 mb-4' ></div>
  <div class=" mx-auto flex px-5 py-10 md:flex-row bg-lime-100 flex-col items-center">
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6  mb-10 md:mb-0">
      <img class="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
    </div>
    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
        <br class="hidden lg:inline-block" />readymade gluten
      </h1>
      <p class="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
        <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
      </div>
    </div>
  </div>
</section> */}
<section class="text-gray-600 body-font">
  
  <div class=" px-5 py-24 mx-auto">
    <div class="flex flex-wrap w-full mb-20">
      <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">All Waste Management Points (WM)</h1>
        <div class="h-1 w-20 bg-lime-500 rounded"></div>
      </div>
      <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
    </div>
    <div class="flex flex-wrap -m-4">
      <div class="xl:w-1/4 md:w-1/2  p-4">
        <div class="bg-gray-100 p-2 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6 hover:scale-105 hover:shadow-2xl ease-in-out duration-300" src={wm} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Chichen Itza</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-100 p-2 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6 hover:scale-105 hover:shadow-2xl ease-in-out duration-300" src={wm2} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Colosseum Roma</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-100 p-2 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6 hover:scale-105 hover:shadow-2xl ease-in-out duration-300" src={wm3} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">Great Pyramid of Giza</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-100 p-2 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6 hover:scale-105 hover:shadow-2xl ease-in-out duration-300" src={wm4} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">San Francisco</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-100 p-2 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6 hover:scale-105 hover:shadow-2xl ease-in-out duration-300" src={wm4} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">San Francisco</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-100 p-2 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6 hover:scale-105 hover:shadow-2xl ease-in-out duration-300" src={wm4} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">San Francisco</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-100 p-2 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6 hover:scale-105 hover:shadow-2xl ease-in-out duration-300" src={wm4} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">San Francisco</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div class="xl:w-1/4 md:w-1/2 p-4">
        <div class="bg-gray-100 p-2 rounded-lg">
          <img class="h-40 rounded w-full object-cover object-center mb-6 hover:scale-105 hover:shadow-2xl ease-in-out duration-300" src={wm4} alt="content" />
          <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-4">San Francisco</h2>
          <p class="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<Footer/>
    </div>
 
  )
}

export default Waste
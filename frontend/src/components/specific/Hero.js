import React from 'react'
import star from '../../Media/star.png'
import battery from '../../Media/battery.gif'
import hero from '../../Media/hero.png'
import { Link } from 'react-router-dom';


function Hero() {
  return (
    
    <section class="text-white body-font" style={{ backgroundColor: '#1DB17C' }}>
    <div class=" mx-auto flex px-10 md:px-32 py-2 md:flex-row flex-col items-center">
      <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <div className="her-content">
          <h1 className="her-heading"><span ><img src={star} style={{ height: '40px' }}></img></span>Join Us in </h1>
          <h1 className="her-heading one">Making a </h1>
          <h1 className="her-heading twooooo">
            Sustainable
          </h1>
          <h1 className="her-heading twooooo">
            Future
            <div className='mt-5 absolute ' style={{ right: '20px', top: '40%', transform: 'translateY(-50%)' }}>

            </div>
            <span className='absolute opacity-0 md:opacity-100'><img src={battery} style={{ height: '150px' }}></img></span>
          </h1>
        </div>
        <br />
        <div class="flex justify-center">
          <Link to='/signup'>
            <button class="inline-flex text-black bg-lime-300 border-0 py-2 px-6 focus:outline-none hover:bg-lime-500  rounded text-lg">Get Started</button>
          </Link>

          <Link to='/login'>
            <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Login</button>
          </Link>



        </div>
        <p className="hero-subheading mt-10" >Participate in Challenges,Track Your Progress, Learn and Grow.</p>
      </div>
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 " >
        <img class="object-cover object-center rounded -mt-10 md:mt-0" alt="hero" src={hero} />
      </div>
    </div>
  </section>
  )
}

export default Hero
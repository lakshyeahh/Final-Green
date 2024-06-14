import React from 'react'
import logo from '../../Media/logo.png'

function Footer() {
  return (
    <footer class="text-gray-600 body-font bg-teal-950">
    <div class=" px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
      <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
        <a class="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <img className='h-7' src={logo}/>
          <div className='logo-text ' style={{fontFamily: '"Abril Fatface", serif', fontWeight: '400 ', fontSize: '30px'}}>Green</div>
        </a>
        <p class="mt-2 text-sm text-gray-500">Participate in Challenges,Track Your Progress, Learn and Grow.</p>
      </div>
      <div class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
        <div class="lg:w-2/4 md:w-1/2 w-full px-4">
          <h2 class="title-font font-medium text-white tracking-widest text-sm mb-3 text-center">About Us</h2>
          <nav class="list-none mb-10">
            <li>
              <p class="text-gray-600  ">Welcome to Green, where sustainability meets action. Our mission is simple: inspire and empower individuals to make a positive impact on the environment. Join us in our journey towards a greener future</p>
            </li>
          </nav>
        </div>
  
        <div class="lg:w-2/4 md:w-2/4 w-full px-4">
          <h2 class="title-font font-medium text-white tracking-widest text-center text-sm mb-3">Contact Us</h2>
          <nav class="list-none mb-10 text-center">
            <li>
              <a class="text-gray-600 hover:text-gray-500">Instagram</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-500">Linkedin</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-500">verma.lakshya071@gmail.com</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-500">+91 9878801587</a>
            </li>
          </nav>
        </div>
    
      </div>
    </div>
    
  </footer>
  )
}

export default Footer
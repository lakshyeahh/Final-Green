import React from 'react'
import Website from '../../Media/website.png'

function Steps() {
  return (
    <section class="text-gray-600 m-7 body-font ">
            <h1 class='text-4xl font-bold text-black mx-5 -mb-4 mt-4' style={{ fontFamily: '' }}>Follow the Map</h1>
    <div class=" px-5 py-24 mx-auto flex flex-wrap ">
      <div class="flex flex-wrap w-full">
        <div class="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
          <div class="flex relative pb-12">
            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div class="flex-grow pl-4">
              <h2 class="font-medium title-font text-lg text-gray-900 mb-1 tracking-wider">Step 1: Discover Challenges and Events</h2>
              <p class="leading-relaxed">Explore ongoing sustainability challenges and upcoming events.</p>
            </div>
          </div>
          <div class="flex relative pb-12">
            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div class="flex-grow pl-4">
              <h2 class="font-medium title-font text-lg  text-gray-900 mb-1 tracking-wider">Step 2: Expand Your Knowledge</h2>
              <p class="leading-relaxed">Access a wealth of educational resources.</p>
            </div>
          </div>
          <div class="flex relative pb-12">
            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="3"></circle>
                <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
              </svg>
            </div>
            <div class="flex-grow pl-4">
              <h2 class="font-medium title-font text-lg text-gray-900 mb-1 tracking-wider">Step 3: Assess Your Impact</h2>
              <p class="leading-relaxed">Utilize the carbon footprint calculator.</p>
            </div>
          </div>
          <div class="flex relative pb-12">
            <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div class="flex-grow pl-4">
              <h2 class="font-medium title-font text-lg text-gray-900 mb-1 tracking-wider">Step 4: Engage with the Community</h2>
              <p class="leading-relaxed"> Join the forum, explore waste management sites, and climb the leaderboard.</p>
            </div>
          </div>
          <div class="flex relative">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
            </div>
            <div class="flex-grow pl-4">
              <h2 class="font-medium title-font text-lg text-gray-900 mb-1 tracking-wider">FINISH: Take Action and Make a Difference</h2>
              <p class="leading-relaxed">Get involved and start making changes.</p>
            </div>
          </div>
        </div>
        <img class="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12 shadow-xl" src={Website} alt="step" />
      </div>
    </div>
  </section>
  )
}

export default Steps
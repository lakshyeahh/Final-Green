import React from 'react'
import badge1 from '../../Media/badge1.png'
import badge2 from '../../Media/badge2.png'
import badge3 from '../../Media/badge3.png'
import badge4 from '../../Media/badge4.png'
import badge5 from '../../Media/badge5.png'
import point from '../../Media/point.gif'
import * as HoverCard from '@radix-ui/react-hover-card';
import './styles.css';

function UserData({userData, position}) {
    if(!userData){
        return null;
    }
    return (
  <div>
{userData && (

<div className="stats-vetical w-full lg:stats shadow bg-gray-300 h-50 md:h-50 ">

  <div className="stat bg-white ">
    
  

          <div className="stat-title font-bold text-purple-500">Points</div>

          <div className="stat-value text-black">{userData.points}</div>
       
          <div className="stat-desc text-gray-400">All Time</div>
   


  </div>
  
  
  <div className="stat bg-white">
    <div className="stat-figure text-secondary">
      
    </div>
    <div className="stat-title font-bold text-blue-500">Rank</div>
    <div className="stat-value text-black">{position}</div>
    <div className="stat-desc text-gray">↗︎ 22%</div>
  </div>
  
  <div className="stat bg-white  flex flex-col ">
  
    <div className="stat-title font-bold text-orange-500 mb-4 flex items-center">Badges <img src={point} className='w-7 '></img> <span className='text-gray-300 font-medium' >*hover over each to explore</span></div>
  <div className="flex flex-wrap justify-left w-full max-w-xl p-4 px-0 items-center">
 
  
    <HoverCard.Root>
    <HoverCard.Trigger asChild>

    <img src={badge1} alt="Badge 1" className="w-20 h-20 md:w-24 md:h-24 mx-2 object-cover" />

    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content className="HoverCardContent" sideOffset={5}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <img
            className=" w-10 h-20 md:h-12 object-cover"
            src={badge1}
            alt="Radix UI"
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div>
              <div className="Text bold">Eco Warrier Initiate</div>

            </div>
            <div className="Text">
            Welcome to the Eco Warrior community! As a new member, you’ve taken the first step towards a more sustainable future. This badge recognizes your commitment to making a positive impact on our planet. Together, we can achieve a greener, cleaner world.
            </div>
           
          </div>
        </div>

        <HoverCard.Arrow className="HoverCardArrow" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>

  {userData.points > 500 && (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>

    <img src={badge2} alt="Badge 1" className="w-24 h-20 md:h-24 mx-2 object-cover" />

    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content className="HoverCardContent" sideOffset={5}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <img
            className=" w-14 h-20 md:h-12 object-cover"
            src={badge2}
            alt="Radix UI"
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div>
              <div className="Text bold">Sustainability Champion</div>

            </div>
            <div className="Text">
            Congratulations on earning 500 points! Your dedication to sustainability and continuous efforts to promote eco-friendly practices have earned you the title of Sustainability Champion. Keep up the great work and continue to inspire others to join our mission for a greener planet
            </div>
           
          </div>
        </div>

        <HoverCard.Arrow className="HoverCardArrow" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
     )}
  </div>
</div>

</div>
)}
</div>
    )
}

export default UserData
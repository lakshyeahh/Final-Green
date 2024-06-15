import React from 'react'

function UserData({userData}) {
    if(!userData){
        return null;
    }
    return (
<div className="stats shadow bg-gray-300 w-full h-40 m-6">
  
  <div className="stat bg-white">
    <div className="stat-figure text-secondary">
      
    </div>
    {userData.points && (
        <div>
          <div className="stat-title font-bold text-purple-500">Points</div>
          <div className="stat-value">{userData.points}</div>
          <div className="stat-desc text-black">This Month</div>
        </div>
      )}

  </div>
  
  
  <div className="stat bg-white">
    <div className="stat-figure text-secondary">
      
    </div>
    <div className="stat-title font-bold text-blue-500">Rank</div>
    <div className="stat-value">{userData.rank}</div>
    <div className="stat-desc text-black">↗︎ 22%</div>
  </div>
  
  <div className="stat bg-orange-50 border-r-2 border-yellow-200">
    <div className="stat-figure text-secondary ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
    </div>
    <div className="stat-title font-bold text-orange-500">Badges</div>
    
    
  </div>
  
</div>
    )
}

export default UserData
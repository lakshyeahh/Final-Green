import React, {useEffect, useState} from 'react'

function MyChallengeList({userData}) {
  const [challenges, setChallenges] = useState([
    {
      _id: 'sample1',
      name: 'Sample Challenge 1',
      points: 100,
      endDate: '2024-12-31',
      progress: 50,
    },
    {
      _id: 'sample2',
      name: 'Sample Challenge 2',
      points: 200,
      endDate: '2024-11-30',
      progress: 75,
    },
  ]);
  const [completedChallenges, setCompletedChallenges] = useState([
    {
      _id: 'sample3',
      name: 'Sample Completed Challenge 1',
      points: 300,
      endDate: '2024-10-31',
      progress: 100,
    },
    {
      _id: 'sample4',
      name: 'Sample Completed Challenge 2',
      points: 400,
      endDate: '2024-09-30',
      progress: 100,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userData || !userData.activeChallenges) {
      setLoading(false);
      return;
    }

    const fetchChallenges = async () => {
      try {
        const challengeDetails = await Promise.all(
          userData.activeChallenges.map(async (challengeId) => {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges/${challengeId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch challenge details');
            }
            return response.json();
          })
        );
        setChallenges(challengeDetails);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [userData]);

  useEffect(() => {
    if (!userData || !userData.completedChallenges) {
      setLoading(false);
      return;
    }

    const fetchCompletedChallenges = async () => {
      try {
        const challengeDetails = await Promise.all(
          userData.completedChallenges.map(async (challengeId) => {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges/${challengeId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch challenge details');
            }
            return response.json();
          })
        );
        setCompletedChallenges(challengeDetails);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCompletedChallenges();
  }, [userData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div >
      <section class="text-gray-600 body-font">
       
  <div class="  py-20 mx-auto">
  <h2 className='mb-10 text-xl md:text-2xl font-medium md:font-bold '>Active Challenges</h2>
    <div class="w-full mx-auto overflow-auto">
      <table class="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100 rounded-tl rounded-bl">Challenge</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Points</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">End Date</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Complete</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Progress</th>
          
          </tr>
        </thead>
        <tbody>
        {challenges.map((challenge, index) => (
           <tr key={challenge._id}>
            <td class="px-4 py-3">{challenge.title}</td>
            <td class="px-4 py-3"> {challenge.points}</td>
            <td class="px-4 py-3">{new Date(challenge.endDate).toLocaleDateString()}</td>
            
            <td class="px-4 py-3 text-lg text-gray-900"> <progress className="progress progress-accent w-20" value={challenges.progress} ></progress></td>
            <td class="px-4 py-3 text-lg text-gray-900"><a>Details</a></td>
          </tr>
               ))}
        </tbody>
      </table>
    </div>
    
  </div>
</section>
<section class="text-gray-600 body-font">
       
       <div class="   mx-auto">
       <h2 className='mb-10 text-xl md:text-2xl font-medium md:font-bold '>Completed Challenges</h2>
         <div class="w-full mx-auto overflow-auto">
           <table class="table-auto w-full text-left whitespace-no-wrap">
             <thead>
               <tr>
                 <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-emerald-500 rounded-tl rounded-bl">Challenge</th>
                 <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-emerald-500">Points</th>
                 <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-emerald-500">End Date</th>
                 <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-emerald-500">Complete</th>
                 <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-emerald-500">Progress</th>
               
               </tr>
             </thead>
             <tbody>
             {completedChallenges.map((challenge, index) => (
                <tr key={challenge._id}>
                 <td class="px-4 py-3">{challenge.title}</td>
                 <td class="px-4 py-3"> {challenge.points}</td>
                 <td class="px-4 py-3">{new Date(challenge.endDate).toLocaleDateString()}</td>
                 
                 <td class="px-4 py-3 text-lg text-gray-900"> <progress className="progress progress-accent w-20" value={100} ></progress></td>
                 <td class="px-4 py-3 text-lg text-gray-900"><a className='hover:bg-gray-200 px-5 py-2 rounded-xl'>Details</a></td> 
               </tr>
                    ))}
             </tbody>
           </table>
         </div>
         
       </div>
     </section>

</div>

  )
}

export default MyChallengeList

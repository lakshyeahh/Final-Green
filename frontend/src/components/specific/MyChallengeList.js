import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

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

    const fetchActiveChallenges = async () => {
      try {
        const challengeDetails = await Promise.all(
          userData.activeChallenges.map(async (activeChallenge) => {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges/${activeChallenge.challenge}`);
            if (!response.ok) {
              throw new Error('Failed to fetch challenge details');
            }
            const challengeData = await response.json();
            return challengeData;
          })
        );
        setChallenges(challengeDetails);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActiveChallenges();
  }, [userData]);

  useEffect(() => {
    if (!userData || !userData.completedChallenges) {
      setLoading(false);
      return;
    }

    const fetchCompletedChallenges = async () => {
      try {
        const challengeDetails = await Promise.all(
          userData.completedChallenges.map(async (completedChallenge) => {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges/${completedChallenge.challenge}`);
            if (!response.ok) {
              throw new Error('Failed to fetch challenge details');
            }
            const challengeData = await response.json();
            return challengeData;
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
            
  
            <td class="px-4 py-3 text-lg text-gray-900">                <Link to={`/submit/${challenge._id}`}>
         
         <a className="hover:bg-gray-200 px-5 py-2 rounded-xl">Details</a>
         </Link></td>
          </tr>
               ))}
        </tbody>
      </table>
    </div>
    
  </div>
</section>
<section class="text-gray-600 body-font">
       
{completedChallenges.length === 0 ? (
  <div className="mx-auto">
    <h2 className="mb-10 text-xl md:text-2xl font-medium md:font-bold">Completed Challenges</h2>
    <p>OOPS :( No challenges have been completed yet.</p>
  </div>
) : (
  <div className="mx-auto">
    <h2 className="mb-10 text-xl md:text-2xl font-medium md:font-bold">Completed Challenges</h2>
    <div className="w-full mx-auto overflow-auto">
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-emerald-500 rounded-tl rounded-bl">Challenge</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-emerald-500">Points</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-emerald-500">End Date</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-emerald-500">Complete</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-emerald-500">Progress</th>
          </tr>
        </thead>
        <tbody>
          {completedChallenges.map((challenge, index) => (
            <tr key={challenge._id}>
              <td className="px-4 py-3">{challenge.title}</td>
              <td className="px-4 py-3">{challenge.points}</td>
              <td className="px-4 py-3">{new Date(challenge.endDate).toLocaleDateString()}</td>
              <td className="px-4 py-3 text-lg text-gray-900">
                <progress className="progress progress-accent w-20" value={100}></progress>
              </td>
              <td className="px-4 py-3 text-lg text-gray-900">
                <Link to='/submit/specific'>
         
                <a className="hover:bg-gray-200 px-5 py-2 rounded-xl">Details</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

     </section>

</div>

  )
}

export default MyChallengeList

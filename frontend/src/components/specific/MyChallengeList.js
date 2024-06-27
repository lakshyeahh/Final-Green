import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

function MyChallengeList({userData}) {
  const [challengeDetails, setChallengeDetails] = useState([null]);
  const token = localStorage.getItem('accessToken');
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
    const fetchActiveChallenges = async () => {
      try {
        if (!token) {
          alert("Login First!");
          throw new Error('Access token not found');
        }

        const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges/active`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        setChallengeDetails(data);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActiveChallenges();
  }, [userData]);

  useEffect(() => {
    const fetchCompletedChallenges = async () => {
      try {
        if (!token) {
          alert("Login First!");
          throw new Error('Access token not found');
        }

        const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges/complete`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        setCompletedChallenges(data);

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
    <div>
  <table className="table-auto w-full text-left whitespace-no-wrap">
    <thead>
      <tr>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100 rounded-tl rounded-bl">Challenge</th>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Points</th>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">End Date</th>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Complete</th>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Progress</th>
      </tr>
    </thead>
    <tbody>
      {challengeDetails && challengeDetails.map((one, index) => (
        one && one.challenge && (
          <tr key={one.challenge._id}>
            <td className="px-4 py-3">{one.challenge.title}</td>
            <td className="px-4 py-3">{one.challenge.points}</td>
            <td className="px-4 py-3">{new Date(one.challenge.endDate).toLocaleDateString()}</td>
            <td className="px-4 py-3 text-lg text-gray-900">
              <progress className="progress progress-accent w-20" value={one.progress + 1} max={4}></progress>
            </td>
            <td className="px-4 py-3 text-lg text-gray-900">
              <Link to={`/submit/${one.challenge.id}`}>
                <a className="hover:bg-gray-200 px-5 py-2 rounded-xl">Details</a>
              </Link>
            </td>
          </tr>
        )
      ))}
    </tbody>
  </table>
</div>


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
            <tr key={challenge.id}>
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

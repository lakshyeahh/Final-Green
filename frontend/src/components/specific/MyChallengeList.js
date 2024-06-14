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
            const response = await fetch(`/api/challenges/${challengeId}`);
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
            const response = await fetch(`/api/challenges/${challengeId}`);
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
    <div>
    <div className="overflow-x-auto m-6 rounded-xl shadow-lg">
      <table className="table">
        <thead>
          <tr className='bg-pink-100'>
            <th>
              <label>
                <input type="checkbox" className="checkbox bg-white" />
              </label>
            </th>
            <th className='text-pink-700'>Challenge</th>
            <th className='text-pink-700'>Points</th>
            <th className='text-pink-700'>End Date</th>
            <th className='text-pink-700'>Complete</th>
            <th className='text-pink-700'>Progress</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge, index) => (
            <tr key={challenge._id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar"></div>
                  <div>
                    <div className="font-bold">{challenge.title}</div>
                  </div>
                </div>
              </td>
              <td>
                {challenge.points}
              </td>
              <td>{new Date(challenge.endDate).toLocaleDateString()}</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
              <th>
                <div className="radial-progress text-primary text-xs w-10 h-10" style={{ "--value": challenge.progress }} role="progressbar">
                  {challenge.progress}%
                </div>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Challenge</th>
            <th>Points</th>
            <th>End Date</th>
            <th>Complete</th>
            <th>Progress</th>
          </tr>
        </tfoot>
      </table>
    </div>
  <div className="overflow-x-auto m-6 rounded-xl shadow-lg">
  <table className="table">
        <thead>
          <tr className='bg-green-100'>
            <th>
              <label>
                <input type="checkbox" className="checkbox bg-white" />
              </label>
            </th>
            <th className='text-green-700'>Challenge</th>
            <th className='text-green-700'>Points</th>
            <th className='text-green-700'>End Date</th>
            <th className='text-green-700'>Complete</th>
            <th className='text-green-700'>Progress</th>
          </tr>
        </thead>
        <tbody>
          {completedChallenges.map((challenge, index) => (
            <tr key={challenge._id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar"></div>
                  <div>
                    <div className="font-bold">{challenge.title}</div>
                  </div>
                </div>
              </td>
              <td>
                {challenge.points}
              </td>
              <td>{new Date(challenge.endDate).toLocaleDateString()}</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
              <th>
                <div className="radial-progress text-primary text-xs w-10 h-10" style={{ "--value": challenge.progress }} role="progressbar">
                  {challenge.progress}%
                </div>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Challenge</th>
            <th>Points</th>
            <th>End Date</th>
            <th>Complete</th>
            <th>Progress</th>
          </tr>
        </tfoot>
      </table>
</div>
</div>

  )
}

export default MyChallengeList
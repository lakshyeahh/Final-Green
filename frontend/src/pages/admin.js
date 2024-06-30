import React, { useEffect, useState } from 'react'
import CreateChallengeForm from '../components/specific/AdminCreate';
import { ToastContainer, toast } from 'react-toastify';
import { json } from 'react-router-dom';
import logo from '../Media/logo.png'

function Admin() {
    const [challenges, setChallenges] = useState([]);
    const [error, setError] = useState(null);
    const [ranking, setRanking] = useState([null]);
    const [loading, setLoading] = useState(true);

    const fetchChallenges = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges`);

            if (!response.ok) {
                throw new Error('Failed to fetch challenges data');
            }

            const data = await response.json();
            setChallenges(data);
        } catch (error) {
            setError(error.message);
        }
    };
    

    useEffect(() => {
        fetchChallenges();
    }, []);

    const handleVerifyStep = async (userId, stepNumber, challengeId) => {
        // Implement the logic to verify the step here
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges/verify/${challengeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    stepNumber,
                    userId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch challenges data');
            }

            toast.success("verified successfully");
        } catch (error) {
            setError(error.message);
        }
      
      };

      useEffect(() => {
        const fetchLeaderboard = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/leaderboard`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch user data');
            }
    
            const data = await response.json();
            setRanking(data); // Assuming data is an array of leaderboard entries
            setTimeout(() => {
              setLoading(false);
            }, 500);
      
          } catch (error) {
            setError(error.message);

          }
        };
    
        fetchLeaderboard();
      }, []); 

      const handleReward1 = async () => {
        try{
          const 

        }catch (error){

        }
      };

      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-screen flex-col">
            <img src={logo} className="h-16 mb-4" alt="Logo" />
            <span className="loading loading-dots loading-lg text-green-300 bg-green-300"></span>
          </div>
        );
      }
  return (
    <div>
        <section class="text-gray-600 body-font">
            <ToastContainer/>
  <div class=" px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Challenges</h1>
     
    </div>
 
    <div class="flex flex-wrap -m-2">
    {challenges && challenges.map((challenge, index) => (
  <div key={challenge._id} className="p-2 w-full ">
    <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
      <div className="flex-grow">
        <ul className="text-gray-900 title-font font-medium">
          <li className="mb-2">
            <strong>Title:</strong> {challenge.title}
          </li>
          <li className="mb-2">
            <strong>Description:</strong> {challenge.description}
          </li>
          <li className="mb-2">
            <strong>Points:</strong> {challenge.points}
          </li>
          <li className="mb-2">
            <strong>End Date:</strong> {new Date(challenge.endDate).toLocaleDateString()}
          </li>
          <li className="mb-2">
            <strong>Steps:</strong>
            <ul className="pl-4 list-disc">
              {challenge.steps.map(step => (
                <li key={step._id}>
                  <strong>Step {step.stepNumber}:</strong> {step.description}
                </li>
              ))}
            </ul>
          </li>
          <div className="space-y-4">
      {challenge.participants && challenge.participants.map((participant, index) => (
        <div key={index} className="border p-4 rounded-md shadow-md">
          <h2 className="text-lg font-medium">Participant: {participant.userId}</h2>
          {participant.details.length > 0 ? (
            <div className="mt-4 space-y-2">
              {participant.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Step {detail.stepNumber}</p>
                    <p className="text-sm">{detail.inputGiven || 'No input provided'}</p>
                    {detail.verified ? (
                      <span className="text-sm text-green-600 font-medium">Verified</span>
                    ) : (
                      <button
                        onClick={() => handleVerifyStep(participant.userId, detail.stepNumber, challenge._id, detail.length)}
                        className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Verify
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No steps recorded for this participant.</p>
          )}
        </div>
      ))}
    </div>
        </ul>
      </div>
    </div>
  </div>
))}


    </div>

  </div>
  <CreateChallengeForm/>
</section>

<section className="text-gray-600 body-font mb-9 overflow-auto">
      <div className="px-5 py-10 mx-auto">
        <div className="flex flex-wrap w-full mb-5 flex-col items-start text-left">
          <h1 className="sm:text-2xl text-2xl font-bold title-font mb-2 text-gray-900 ">Ranking</h1>
        </div>
        <div className="lg:w-full w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-lime-100 rounded-tl rounded-bl">Rank</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-lime-100 rounded-tl rounded-bl">Name</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-lime-100">Points</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-lime-100">Reward1</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-lime-100">Reward2</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-lime-100">Reward3</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-lime-100">Reward4</th>
              
                
              </tr>
            </thead>
            <tbody>
              {ranking && ranking.map((user, index) => (
                <tr key={index}>
                  <td className="px-4 py-3">{index}</td> {/* Index + 4 because we are displaying from rank 4 */}
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.points}</td>
                
    <td className="px-4 py-3 text-lg text-gray-900">
      <button className="btn btn-primary">Anonymous Confession</button>
    </td>


  {/* Show button if user points are greater than 1000 */}

    <td className="px-4 py-3 text-lg text-gray-900">
      <button className="btn btn-primary">Gift Voucher</button>
    </td>
 

  {/* Show button if user points are greater than 2000 */}
  
    <td className="px-4 py-3 text-lg text-gray-900">
      <button className="btn btn-primary">Meet Up with Seniors</button>
    </td>


  {/* Show button if user points are greater than 2500 */}

    <td className="px-4 py-3 text-lg text-gray-900">
      <button className="btn btn-primary">Cute Surprise from Seniors</button>
    </td>

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

export default Admin
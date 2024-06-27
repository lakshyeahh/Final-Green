import React, { useEffect, useState } from 'react'
import CreateChallengeForm from '../components/specific/AdminCreate';
import { ToastContainer, toast } from 'react-toastify';
import { json } from 'react-router-dom';

function Admin() {
    const [challenges, setChallenges] = useState([]);
    const [error, setError] = useState(null);

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

    </div>
  )
}

export default Admin
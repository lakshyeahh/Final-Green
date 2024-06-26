import { Flex, Heading, Button, Grid } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationMenuDemo from '../components/shared/navbar';
import ProfilePoints from '../components/specific/ProfilePoints';
import UserCard from '../components/specific/UserCard';
import './dashboard.css';
import MyChallengeList from '../components/specific/MyChallengeList';
import MyPrintList from '../components/specific/MyPrintList';
import Notification from '../components/specific/notification';
import Sidebar from '../components/shared/Sidebar';
import UserData from '../components/specific/UserData';
import DownBar from '../components/shared/DownBar';
import img1 from '../Media/Image1.png';
import { useParams } from 'react-router-dom';
import logo from '../Media/logo.png'
import { ToastContainer, toast } from 'react-toastify';


function ChanllengeDetails() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  const [activeTab, setActiveTab] = useState('step1');
  const [step1Input, setStep1Input] = useState('');
  const [step2Input, setStep2Input] = useState('');
  const [step3Input, setStep3Input] = useState('');
  const [step4Input, setStep4Input] = useState(null);
  const [challenges, setChallenges] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputValues, setInputValues] = useState({});

  const { challengeId } = useParams();
  console.log(challengeId);
  const handleInputChange = (e, stepNumber) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;

    setInputValues(prevState => ({
      ...prevState,
      [stepNumber]: value
    }));
  };
  useEffect(() => {

    const fetchChallengeById = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges/active/${challengeId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch challenge details');
        }
        const challengeData = await response.json();
        setChallenges(challengeData); // Assuming you have a state variable for single challenge
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchChallengeById();
  }, [challengeId]);

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchMeData = async () => {
      try {

        if (!token) {
          alert("Login First!");
          throw new Error('Access token not found');
        }

        const response = await fetch(`${process.env.REACT_APP_URL}/api/users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMeData();
  }, []);

  const handleSubmit = async (stepNumber,totalSteps, event) => {
    try {
      event.preventDefault();

      const formData = {
        stepNumber: stepNumber,
        inputGiven: inputValues[stepNumber]
      }
      console.log(formData);

      if (!token) {
        alert("Login First!");
        throw new Error('Access token not found');
      }

      const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges/submit/${challengeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({stepNumber: stepNumber,
          inputGiven: inputValues[stepNumber]})
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      toast.success(data.message);

      if(stepNumber == totalSteps){
        document.getElementById('last-step-modal').showModal();
      }

    } catch (error) {
      console.error('Error submitting input:', error);
      toast.error('Failed to submit input. Please try again.');
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

    <div className="flex flex-col min-h-screen">
      <header>
        <NavigationMenuDemo userData={userData} />
      </header>
      <div className="flex flex-1">
        <aside className="hidden lg:block w-1/8">
          <Sidebar userData={userData} />
        </aside>
        <section className="w-full px-3 md:px-10 py-2 md:py-10 mb-10">
          <ToastContainer />
          <dialog id='last-step-modal' className="modal">
                <div className="modal-box bg-white">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>
                  <h3 className="font-bold text-lg text-green-500 mb-5">Hurray!!!</h3>
                  <ul className="max-w-md space-y-1 text-gray-800 list-inside ">
                  </ul>
                  <p className="py-4  text-gray-400 mb-5">
                   You have completed all the steps of the challenge, now just sit back and relax while our admin 
                   verifies your last step. The points will be credited instantly on verification. This may take a while.
                   Thank You :)
                  </p>
                  <br/>
                </div>
              </dialog>
          <section class="text-gray-600 body-font">
            {challenges && (
              <div class=" mx-auto flex  md:flex-row flex-col items-center">

                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                  <img class="object-cover object-center rounded" alt="hero" src={img1} />
                </div>
                <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                  <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{challenges.title}

                  </h1>
                  <p class="mb-8 leading-relaxed">{challenges.description}</p>

                </div>
              </div>
            )}
          </section>
          <section className="text-gray-600 body-font mb-10 ">
            <div className="mt-10 mx-auto flex flex-wrap flex-col w-full">
              <div className="flex mx-auto flex-wrap mb-20">
                {challenges && challenges.steps && challenges.steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => openTab(step.stepNumber)}
                    className={`sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium ${activeTab === step.stepNumber ? 'bg-gray-100 border-indigo-500 text-indigo-500' : 'border-gray-200 hover:text-gray-900'} inline-flex items-center leading-none tracking-wider rounded-t`}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    {`STEP ${index + 1}`}
                  </button>
                ))}
              </div>
              {challenges && challenges.steps && challenges.steps.map((step, index) => (
                <div key={index} id={step.stepNumber} className={`tabcontent ${activeTab === step.stepNumber ? 'block' : 'hidden'}`}>
                  <div className="flex flex-col items-center text-center w-full">
                    <h1 className="text-xl font-medium title-font mb-4 text-gray-900">{`STEP ${index + 1}`}</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                      {step.description}
                    </p>
                    <div className="flex flex-col items-center w-full md:w-1/2 mt-20">
                      {step.inputType === 'file' && (
                        <input

                          type="file"
                          onChange={(e) => handleInputChange(e, step.stepNumber)}
                          className="w-full p-2 mb-4 border border-gray-300 rounded-sm bg-white"
                        />
                      )}
                      {step.inputType === 'text' && (
                        <input
                          type="text"
                          value={inputValues[step.stepNumber] || ''}
                          onChange={(e) => handleInputChange(e, step.stepNumber)}
                          placeholder={`Enter Step ${index + 1} text input`}
                          className="w-full p-2 mb-4 border border-gray-300 rounded-sm bg-white"
                        />
                      )}
                      {step.inputType === 'image' && (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleInputChange(e, step.stepNumber)}
                          className="w-full p-2 mb-4 border border-gray-300 rounded-sm bg-white"
                        />
                      )}
                      {step.inputType === 'video' && (
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleInputChange(e, step.stepNumber)}
                          className="w-full p-2 mb-4 border border-gray-300 rounded-sm bg-white"
                        />
                      )}
                      {challenges.verifiedCount === index ? (
                        <button type="submit" onClick={(e) => handleSubmit(step.stepNumber,challenges.steps.length, e)} className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
                          {`Submit Step ${index + 1}`}
                        </button>
                      ) : challenges.verifiedCount > index ? (
                        <p className="text-green-500 mt-2">You have already submitted this step.</p>
                      ) : (
                        <p className="text-red-500 mt-2">You cannot submit this step yet. Please complete previous steps.</p>
                      )}
                    </div>


                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>

      </div>
      <div className="md:hidden fixed bottom-0 w-full">
        <DownBar />
      </div>
    </div>


  )

}

export default ChanllengeDetails
import { useState, useEffect } from "react";
import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Secret() {
    const [userData, setUserData] = useState(null);
    const [confessionTitle, setConfessionTitle] = useState('');
    const [confessionText, setConfessionText] = useState('');
    const [confessionCategory, setConfessionCategory] = useState('academic');
    const [confessionEmail, setConfessionEmail] = useState('');
    const [confessionAttachment, setConfessionAttachment] = useState(null);
      const [error, setError] = useState(null);
      const token = localStorage.getItem('accessToken');

      const navigate = useNavigate();

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
            setUserData(data.user);
   

          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchMeData();
      }, []);
    
      const { secret } = useParams();

    
      const handleSubmit = async (e) => {
        e.preventDefault();
    

    
        try {
          const response = await fetch(`${process.env.REACT_APP_URL}/api/social/forums/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                userId: secret,
                confessionTitle,
                confessionText,
                confessionCategory,
                confessionEmail

            }),
          });
    
          if (response.ok) {
           toast.success('Confession submitted successfully');
           setTimeout(() => {
            navigate('/forum'); // Navigate to '/forum' after a delay
          }, 1100);
          } else {
            const error = await response.json();
            console.log('Error submitting confession: ' + error.message);
          }
        } catch (error) {
          console.log('Error submitting confession: ' + error.message);
        }
      };
  return (

        <div className="min-h-screen flex items-center justify-center bg-blue-950">
            <ToastContainer/>
          <section className="w-full md:max-w-4xl m-10 p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Confession Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 mt-4">
                <div>
                  <label className="text-gray-700 dark:text-gray-200" htmlFor="confessionTitle">Confession Title</label>
                  <input
                    id="confessionTitle"
                    name="confessionTitle"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    value={confessionTitle}
                    onChange={(e) => setConfessionTitle(e.target.value)}
                    required
                  />
                </div>
    
                <div>
                  <label className="text-gray-700 dark:text-gray-200" htmlFor="confessionText">Confession Text</label>
                  <textarea
                    id="confessionText"
                    name="confessionText"
                    rows="5"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    value={confessionText}
                    onChange={(e) => setConfessionText(e.target.value)}
                    required
                  />
                </div>
    
                <div>
                  <label className="text-gray-700 dark:text-gray-200" htmlFor="confessionCategory">Category</label>
                  <select
                    id="confessionCategory"
                    name="confessionCategory"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    value={confessionCategory}
                    onChange={(e) => setConfessionCategory(e.target.value)}
                    required
                  >
                    <option value="academic">Academic</option>
                    <option value="personal">Personal</option>
                    <option value="funny">Funny</option>
                    <option value="other">Other</option>
                  </select>
                </div>
    
                <div>
                  <label className="text-gray-700 dark:text-gray-200" htmlFor="confessionEmail">Email Address (Optional)</label>
                  <input
                    id="confessionEmail"
                    name="confessionEmail"
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    value={confessionEmail}
                    onChange={(e) => setConfessionEmail(e.target.value)}
                  />
                </div>
    
                <div>
                  <label className="text-gray-700 dark:text-gray-200" htmlFor="confessionAttachment">Attachment (Optional)</label>
                  <input
                    id="confessionAttachment"
                    name="confessionAttachment"
                    type="file"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    onChange={(e) => setConfessionAttachment(e.target.files[0])}
                  />
                </div>
              </div>
    
              <div className="flex justify-end mt-6">
                <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit Confession</button>
              </div>
            </form>
          </section>
        </div>

  
  )
}

export default Secret
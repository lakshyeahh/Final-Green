import React, { useEffect, useState } from 'react';
const cardStyle = {
    background: 'rgba(255, 255, 255, 0.54)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(9.4px)',
    WebkitBackdropFilter: 'blur(9.4px)',
    border: '1px solid rgba(255, 255, 255, 0.76)',
    height: '350px'
  };

function EventList() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/events`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data.slice(0, 3)); // Only take the top 3 events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section
    className="main-content-events "
    style={{
      
      background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(155,255,199,1) 46%, rgba(255,255,255,1) 100%)',
    }}
  >
    <section className="text-gray-600 body-font ">
      <h1 className="text-4xl font-bold text-black mx-5 -my-2">2. Events</h1>
      <div className="px-4 py-10 mx-auto">
        <div className="flex flex-wrap -mx-4 -my-8">
          {events.map(event => (
            <div key={event._id} className="py-10 px-4 w-full md:w-1/2 lg:w-1/3 h-full">
              <div className="bg-white shadow-md  py-20 b px-4 h-full flex flex-col items-start " style={cardStyle}>
                <div className="w-12 flex-shrink-0 flex flex-col absolute top-5  text-center leading-none">
                  <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="font-medium text-lg text-gray-800 title-font leading-none">{new Date(event.date).getDate()}</span>
                </div>
                <div className="flex-grow pl-6 mt-4">
                  <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">{event.mode || 'CATEGORY'}</h2>
                  <h1 className="title-font text-xl font-medium text-gray-900 mb-3">{event.title}</h1>
                  <p className="leading-relaxed mb-5">{event.description}</p>
                  
                </div>
                <a className="inline-flex items-center px-5 py-5">
                    <img
                      alt="author"
                      src="https://dummyimage.com/103x103"
                      className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <div className="flex-grow flex flex-col pl-3 ">
                      <span className="title-font font-medium text-gray-900">{event.author}</span>
                    </div>
                  </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </section>
  );
}

export default EventList;

import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hours === 0 && minutes === 0 && seconds === 0) {
        // Reset the timer to 12 hours
        setHours(12);
        setMinutes(0);
        setSeconds(0);
      } else {
        if (seconds === 0) {
          if (minutes === 0) {
            setHours((prevHours) => prevHours - 1);
            setMinutes(59);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
          }
          setSeconds(59);
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes, hours]);

  return (
    <div>
      <h1 className='text-6xl tracking-wider text-black'>{hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</h1>
    </div>
  );
}

export default Timer;

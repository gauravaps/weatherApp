import React, { useState, useEffect } from 'react';
import './time.css';

const TimeAndLocation = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [location, setLocation] = useState('Fetching location...');

  // Function to update time every second
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };

    updateCurrentTime();
    const timer = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(timer);
  }, []);

  
useEffect(() => { 
    const now = new Date();
    const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}.${now.getFullYear()}`;
    setCurrentDate(formattedDate);

  }, []);

  // Function to fetch user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = import.meta.env.VITE_location_API;
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
          );
          const data = await response.json();
          const locationName = data.results[0].formatted;
          setLocation(locationName);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setLocation('Unable to fetch location');
        }
      );
    } else {
      setLocation('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className="time-location">
      <p className="time">{currentTime}</p>
      <p className="date">{currentDate}</p>
      <p className="location">{location}</p>
    </div>
  );
};

export default TimeAndLocation;

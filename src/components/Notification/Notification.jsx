import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar.jsx';

const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  // useEffect hook to perform side effects after the component mounts
  useEffect(() => {
    try {
      // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
      const storedUsername = sessionStorage.getItem('email');
      const storedDoctorData = JSON.parse(localStorage.getItem('doctorData') || '{}');
      const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name) || '{}');

      // Set the logged-in state and username if storedUsername exists
      if (storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
      }

      // Set doctorData if available in localStorage
      if (storedDoctorData && storedDoctorData.name) {
        setDoctorData(storedDoctorData);
      }

      // Set appointmentData if available in localStorage
      if (storedAppointmentData) {
        setAppointmentData(storedAppointmentData);
      }
    } catch (error) {
      console.error("Error retrieving data from storage:", error);
    }
  }, []);

  return (
    <div>
      {/* Render Navbar component */}
      <Navbar />
      {/* Render children components */}
      {children}

      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && doctorData && appointmentData && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {doctorData?.name}
            </p>
            {/* Display appointment details */}
            {appointmentData.date && (
              <p>
                <strong>Date:</strong> {appointmentData.date}
              </p>
            )}
            {appointmentData.time && (
              <p>
                <strong>Time:</strong> {appointmentData.time}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;

import React, { useState } from "react";
import './AppointmentFormIC.css'
const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber });
    setName("");
    setPhoneNumber("");
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Date of Appointment</label>
        <input
          type="date"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
      <label htmlFor="phoneNumber">Book Time slot:</label>
        <select name="" id="">
          <option value="">Select Time Slot:</option>
        </select>
      </div>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;

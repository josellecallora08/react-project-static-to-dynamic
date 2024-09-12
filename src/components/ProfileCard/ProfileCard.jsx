import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './ProfileCard.css'
const ProfileForm = () => {
  const [userDetails, setUserDetails] = useState(null); // Start with null to track if data is loaded
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile when the component mounts
  useEffect(() => {
    const authtoken = sessionStorage.getItem("token");
    if (!authtoken) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  // Function to fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage

      const response = await fetch(`${import.meta.env.VITE_URL}/fetch_user`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          Email: email, // Add the email to the headers
        },
      });
      if (response.ok) {
        const user = await response.json();
        setUserDetails(user); // Store the fetched user details
        setUpdatedDetails(user); // Set initial values for updatedDetails
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching user profile. Please try again.");
    }
  };
  console.log(userDetails)
  // Enable edit mode for the form
  const handleEdit = () => {
    setEditMode(true);
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authtoken = sessionStorage.getItem("token");
      const email = sessionStorage.getItem("email");

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${import.meta.env.VITE_URL}/update_user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          Email: email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Update the user details in session storage
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);
        setUserDetails(updatedDetails);
        setEditMode(false);
        alert("Profile updated successfully!");
        navigate("/");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating profile. Please try again.");
    }
  };

  // Return null if userDetails is not loaded yet
  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={updatedDetails.email || ""} // Add default value if not available
              onChange={handleInputChange}
            />
          </label>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={updatedDetails.name || ""} // Add default value if not available
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone || ""} // Add default value if not available
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="profile-details">
          <h1>Welcome, {userDetails.user.name}</h1>
          <p>
            <b>Email:</b> {userDetails.user.email}
          </p>
          <p>
            <b>Phone:</b> {userDetails.user.phone}
          </p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;

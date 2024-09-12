import { Link } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
function Navbar() {
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");

  return (
    <div className="header-container">
      <header>
        <div className="logo">
          <h2>SEAMedical</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Appointment</li>

            {token ? (
              <>
                <li>Hey, {name}</li>
                <li>
                  <button>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;

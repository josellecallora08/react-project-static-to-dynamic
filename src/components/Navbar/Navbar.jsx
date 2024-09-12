import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
function Navbar() {
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="header-container">
      <header>
        <div className="logo">
          <h2>SEAMedical</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
              <Link to={"/notif"}>Notification</Link>
            </li>
            <li>
              <Link to={"/instant-consultation"}>Appointment</Link>
            </li>

            {token ? (
              <>
                <div>
                  <li>Hey, {name}</li>
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: "white",
                      width: "150px",
                      boxShadow: "2px 4px 2px black",
                      height: "100px",
                    }}
                  >
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <li style={{ height: "20px" }}>
                        <Link to={'/profile'}>Your Profile</Link>
                      </li>
                      <li style={{ height: "20px" }}>
                        <Link to={'/reports'}>Your Reports</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <li>
                  <button onClick={() => logout()}>Logout</button>
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

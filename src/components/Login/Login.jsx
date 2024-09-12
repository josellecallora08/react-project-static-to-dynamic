import { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";

function Login() {
  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // Get navigation function from react-router-dom
  const navigate = useNavigate();
  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    // Send a POST request to the login API endpoint
    const res = await fetch(`${import.meta.env.VITE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    // Parse the response JSON
    const json = await res.json();
    console.log(json)
    if (json.token) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem("token", json.token);
      sessionStorage.setItem("email", json.response.email);
      sessionStorage.setItem("name", json.response.name);
      // Redirect to home page and reload the window
      navigate("/");
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };
  return (
    <div className="body">
      <Navbar />
      <div className="form-container">
        <form onSubmit={login}>
          <h1>Login</h1>

          <div className="input-control">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder=" "
              name=""
              id=""
            />
            <label for="">Email</label>
          </div>
          <div className="input-control">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder=" "
              name="password"
              id=""
            />
            <label for="">Password</label>
          </div>
          <div className="input-control">
            <input type="submit" value="Login" id="" />
          </div>
          <div className="input-control">
            <input type="reset" id="" />
          </div>
          <div className="">
            <p>Forgot Password</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

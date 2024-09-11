import { useState } from "react";
import "./Sign_Up.css";
import { useNavigate } from "react-router-dom";
function Sign_Up() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState(""); // State to show error messages
  const navigate = useNavigate(); // Navigation hook from react-router
  // Function to handle form submission
  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // API Call to register user
    const response = await fetch(`${import.meta.env.VITE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
      }),
    });
    const json = await response.json(); // Parse the response JSON
    if (json.authtoken) {
      // Store user data in session storage
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);
      // Redirect user to home page
      navigate("/");
      window.location.reload(); // Refresh the page
    } else {
      if (json.errors) {
        for (const error of json.errors) {
          setShowerr(error.msg); // Show error messages
        }
      } else {
        setShowerr(json.error);
      }
    }
  };

  return (
    <div className="body">
      <div className="form-container">
        <form onSubmit={register} >
          <h1>Sign Up</h1>
          <div className="input-control">
            <select name="role" id="role">
              <option value="">Doctor</option>
              <option value="">Patient</option>
            </select>
          </div>
          <div className="input-control">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              name=""
              id=""
            />
            <label for="">Name</label>
          </div>
          <div className="input-control">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              max={10}
              maxLength={10}
              placeholder=" "
              name=""
              id=""
            />
            <label for="">Phone Number</label>
          </div>
          <div className="input-control">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              name=""
              id=""
            />
            <label for="">Email</label>
          </div>
          <div className="input-control">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              name=""
              id=""
            />
            <label for="">Password</label>
          </div>
          <div className="input-control">
            <input type="submit" value="Login" id="" />
          </div>
          <div className="input-control">
            <input type="reset" name="" id="" />
          </div>
          {showerr && (
            <div className="err" style={{ color: "red" }}>
              {showerr}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Sign_Up;

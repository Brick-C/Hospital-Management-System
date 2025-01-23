import { useNavigate } from "react-router";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.phone) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/getstarted", data);
      console.log("From Server:", res.data);

      navigate("/info", { state: data });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdminLogin = () => {
    const username = prompt("Enter Admin Username");
    const adminUsername = "admin";
    const password = prompt("Enter Admin Password");
    const adminPassword = "admin123";

    if (password === adminPassword && username === adminUsername) {
      navigate("/home");
    } else if (
      password === null ||
      password === "" ||
      username === null ||
      username === ""
    ) {
      alert("Password entry canceled or left empty. Access denied.");
      navigate("/");
    } else {
      alert("Incorrect password. Access denied.");
      navigate("/");
    }
  };

  return (
    <>
      <div className="Container">
        <div className="left">
          <div className="logo">
            <img src="./Logo.png" alt="" />
          </div>

          <div className="text">
            <h2>Hi There👋</h2>
            <p>Get started with appointments.</p>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <input
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type="text"
              name="name"
              placeholder="Full Name"
            />
            <input
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              type="text"
              name="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              type="number"
              name="phone"
              placeholder="Number"
            />

            <button type="submit">Get Started</button>
          </form>

          <div className="footer">
            <p> &#169;2025 EverCare</p>
            <button className="admin" onClick={handleAdminLogin}>
              Admin
            </button>
          </div>
        </div>

        <div className="right">
          <img src="./lg.jpg" alt="" />
        </div>
      </div>
    </>
  );
}

export default App;

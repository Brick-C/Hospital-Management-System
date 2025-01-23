import React, { useEffect, useState } from "react";
import "./AboutPatient.css";
import { Navigate, useLocation, useNavigate } from "react-router";
import axios from "axios";

const AboutPatient = () => {
  const location = useLocation();
  const oldData = location.state;
  console.log(oldData);

  const [newData, setData] = useState({
    name: oldData?.name || "",
    email: oldData?.email || "",
    phone: oldData?.phone || "",
    gender: "",
    reason: "",
    physician: "",
    appointment: "",
  });

  useEffect(() => {
    if (oldData) {
      setData({
        ...oldData,
        reason: "",
      });
    }
  }, [oldData]);

  const [selectedGender, setSelectedGender] = useState("");
  const [selectedPhysician, setSelectedPhysician] = useState("");
  const [physicians, setPhysicians] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/doctors?fields=name,department"
        );
        setPhysicians(res.data);
      } catch (err) {
        console.log("Error fetching doctors: ", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawAppointment = e.target.appointment.value;
    const formattedAppointment = new Date(rawAppointment)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const updatedData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      reason: newData.reason,
      gender: selectedGender,
      physician: selectedPhysician,
      appointment: formattedAppointment,
    };

    if (
      !updatedData.name ||
      !updatedData.email ||
      !updatedData.phone ||
      !updatedData.reason ||
      !updatedData.gender ||
      !updatedData.physician ||
      !updatedData.appointment
    ) {
      alert("Please fill out all fields before submitting the form.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/infodetails",
        updatedData
      );
      console.log("Server Response:", res.data);

      navigate("/", { state: updatedData });
    } catch (err) {
      console.log(err.data);
    }
  };

  return (
    <div className="AboutPatient">
      <div className="left">
        <div className="logo">
          <img src="./Logo.png" alt="" />
        </div>

        <div className="text-area">
          <h3>Welcome👋</h3>
          <p>Let us know more about yourself.</p>

          <p id="info">Personal Information</p>

          <form onSubmit={handleSubmit} className="styled-form">
            <div className="form-row">
              <div className="form-column">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  value={oldData?.name || ""}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  name="name"
                  placeholder="Full Name"
                  id="name"
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={oldData?.email || ""}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  name="email"
                  placeholder="Email"
                  id="email"
                />
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="number"
                  value={oldData?.phone || ""}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  name="phone"
                  placeholder="Phone Number"
                  id="phone"
                />
              </div>
              <div className="form-column">
                <div className="radio">
                  <label>Gender</label>
                  <select
                    onChange={(e) => setSelectedGender(e.target.value)}
                    name="gender"
                    id="gender"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="date">
                  <label htmlFor="reason">Reason</label>
                  <textarea
                    onChange={(e) =>
                      setData({ ...newData, reason: e.target.value })
                    }
                    type="textarea"
                    id="reason"
                    name="reason"
                  />
                </div>
                <label htmlFor="physician">Primary Care Physician</label>
                <select
                  onChange={(e) => setSelectedPhysician(e.target.value)}
                  name="physician"
                  id="physician"
                >
                  <option value="">Select a physician</option>
                  {physicians.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name} - {doctor.department}
                    </option>
                  ))}
                </select>

                <label htmlFor="appointment">Appointment Date</label>
                <input
                  onChange={(e) =>
                    setData({ ...newData, appointment: e.target.value })
                  }
                  type="datetime-local"
                  id="appointment"
                  name="appointment"
                />
              </div>
            </div>

            <button type="submit">Submit and Continue</button>
          </form>
        </div>
      </div>

      <div className="right">
        <img src="./Login2.jpg" alt="" />
      </div>
    </div>
  );
};

export default AboutPatient;

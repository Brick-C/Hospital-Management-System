import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage/HomePage.jsx";
import DoctorManage from "./pages/DoctorManage/DoctorManage.jsx";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile.jsx";
import Patients from "./pages/Patients/Patients.jsx";
import AboutPatient from "./pages/AboutPatient/AboutPatient.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/info" element={<AboutPatient />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/doctor" element={<DoctorProfile />} />
        <Route path="/patient" element={<Patients />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

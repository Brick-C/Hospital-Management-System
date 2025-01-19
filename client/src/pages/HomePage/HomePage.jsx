import React from "react";
import "./HomePage.css";
import Navbar from "../../components/Navbar";
import { SlCalender } from "react-icons/sl";
import { FaRegHourglass } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import DoctorManage from "../DoctorManage/DoctorManage";

const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="logo">
        <img src="./Logo.png" alt="" />
      </div>

      <div className="text-area">
        <h2>Welcome 👋</h2>
        <p>Start Your day by managing your tasks and goals.</p>

        <div className="stat">
          <div className="stat-card">
            <div className="stat-text">
              <div className="stat-row">
                <SlCalender className="icon1" />
                <p className="number">5</p>
              </div>
              <p>Standard appointments</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-text">
              <div className="stat-row">
                <FaRegHourglass className="icon2" />
                <p className="number">5</p>
              </div>
              <p>Pending appointments</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-text">
              <div className="stat-row">
                <IoWarningOutline className="icon3" />
                <p className="number">5</p>
              </div>
              <p>Cancelled appointments</p>
            </div>
          </div>
        </div>

        <DoctorManage />

        <div className="about-area">
          <h3>Created By ✒️</h3>
          <div className="members">
            <p>Tamjid Hossain</p>
            <p>Sabiha Nusrat</p>
            <p>Hridoy Ahmmad Akash</p>
            <p>Fatiha Arbi</p>
            <p>Umme Habiba</p>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default HomePage;

import React from "react";
import "./navbar.css";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineSick } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { IoMdExit } from "react-icons/io";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("adminToken");
    alert("You have been logged out.");
    navigate("/");
  };

  const renderHome = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Home
    </Tooltip>
  );

  const renderDoctor = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Doctors
    </Tooltip>
  );

  const renderPatient = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Patients
    </Tooltip>
  );

  const renderLogOut = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Log Out
    </Tooltip>
  );

  return (
    <nav className="navbar">
      <div className="left">
        <ul>
          <li>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 250 }}
              overlay={renderHome}
            >
              <Link to="/home">
                <FiHome />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 250 }}
              overlay={renderDoctor}
            >
              <Link to="/doctor">
                <FaUserDoctor />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 250 }}
              overlay={renderPatient}
            >
              <Link to="/patient">
                <MdOutlineSick />
              </Link>
            </OverlayTrigger>
          </li>
          <li>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 250 }}
              overlay={renderLogOut}
            >
              <Link to="/" onClick={handleLogOut}>
                <IoMdExit />
              </Link>
            </OverlayTrigger>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import "./DoctorManage.css";
import Table from "react-bootstrap/Table";
import { IoWarningOutline } from "react-icons/io5";
import Navbar from "../../components/Navbar";

const DoctorManage = () => {
  return (
    <div className="DoctorManage">
      <div className="text-area">
        <Table
          striped
          bordered
          hover
          responsive
          className="modern-table"
          variant="dark"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Status</th>
              <th>Appointment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark Terra</td>
              <td>Otto High</td>
              <td>
                <button className="status" disabled>
                  <IoWarningOutline className="icon" />
                  Cancelled
                </button>
              </td>
              <td>June 28.2024 - 9:30 PM</td>
              <td>
                <button>View</button>
                <button>Cancel</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>
                <button className="status" disabled>
                  <IoWarningOutline className="icon" />
                  Pending
                </button>
              </td>
              <td>June 28.2024 - 9:30 PM</td>
              <td>
                <button>View</button>
                <button>Cancel</button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry Bird</td>
              <td>Fahad</td>
              <td>
                <button className="status" disabled>
                  <IoWarningOutline className="icon" />
                  Cancelled
                </button>
              </td>
              <td>June 28.2024 - 9:30 PM</td>
              <td>
                <button>View</button>
                <button>Cancel</button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <Navbar />
    </div>
  );
};

export default DoctorManage;

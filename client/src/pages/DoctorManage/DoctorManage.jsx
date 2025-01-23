import React, { useEffect, useState } from "react";
import "./DoctorManage.css";
import Table from "react-bootstrap/Table";
import Navbar from "../../components/Navbar";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import ViewAppoint from "../../components/ViewAppoint";

const DoctorManage = () => {
  const [data, setData] = useState([]);
  const [isPatientAdded, setIsPatientAdded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointsPerPage] = useState(5);

  // Get current doctors for the current page
  const indexOfLastAppoint = currentPage * appointsPerPage;
  const indexOfFirstAppoint = indexOfLastAppoint - appointsPerPage;
  const currentAppoint = data.slice(indexOfFirstAppoint, indexOfLastAppoint);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(data.length / appointsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/patients?fields=id,name,reason,physician,appointment"
        );
        console.log("Patients:", res.data);

        setData(res.data);
      } catch (err) {
        console.log("Error fetching patients:", err);
      }
    };

    fetchData();
  }, []);

  isPatientAdded && setIsPatientAdded(false);

  const handleCancel = async (appointmentId, currentAppointment) => {
    console.log("Cancelling appointment with ID:", appointmentId);
    try {
      const res = await axios.patch(
        `http://localhost:5000/patients/${appointmentId}/status`,
        { status: "cancelled", appointment: currentAppointment, reason: null }
      );
      console.log(res.data);

      // Update the local state
      const updatedData = data.map((item) =>
        item.id === appointmentId ? { ...item, status: "cancelled" } : item
      );
      setData(updatedData);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

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
            {currentAppoint.length > 0 ? (
              currentAppoint.map((appoint) => (
                <tr key={appoint.id}>
                  <td>{appoint.id}</td>
                  <td>{appoint.physician}</td>
                  <td>{appoint.name}</td>
                  <td>
                    <button
                      className={`status ${appoint.status}`}
                      disabled={appoint.status === "Cancelled"}
                    >
                      {appoint.status}
                    </button>
                  </td>
                  <td>{appoint.appointment}</td>
                  <td>
                    <ViewAppoint
                      appointmentId={appoint.id}
                      existingAppointment={appoint.appointment.slice(0, 10)}
                      existingReason={appoint.reason}
                      onStatusChange={(newStatus) => {
                        const updatedData = data.map((item) => {
                          item.id === appoint.id
                            ? { ...item, status: newStatus }
                            : item;
                        });
                        setData(updatedData);
                      }}
                    />
                    <button
                      onClick={() =>
                        handleCancel(appoint.id, appoint.appointment)
                      }
                      disabled={appoint.status === "cancelled"}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Appointments</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Pagination className="pagination">
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <Pagination.Item
              key={pageNumber + 1}
              className="page-item"
              active={pageNumber + 1 === currentPage}
              onClick={() => paginate(pageNumber + 1)}
            >
              {pageNumber + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <Navbar />
    </div>
  );
};

export default DoctorManage;

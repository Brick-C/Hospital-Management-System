import React, { useEffect, useState } from "react";
import "./Patients.css";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Patients = () => {
  const [data, setData] = useState([]);
  const [isPatientAdded, setIsPatientAdded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5);

  // Get current doctors for the current page
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = data.slice(indexOfFirstPatient, indexOfLastPatient);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(data.length / patientsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/patients?fields=id,name,email,phone,gender,physician,appointment"
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

  return (
    <div className="AllPatients">
      <div className="logo">
        <img src="../Logo.png" alt="" />
      </div>

      <div className="text-area">
        <h3>All Patients</h3>
        <button className="btn">Add</button>

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
              <th>Patient</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Physician</th>
              <th>Appointment</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.length > 0 ? (
              currentPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.physician}</td>
                  <td>{patient.appointment}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>No Patients</td>
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

export default Patients;

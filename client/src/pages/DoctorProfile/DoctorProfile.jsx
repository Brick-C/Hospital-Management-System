import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Navbar from "../../components/Navbar";
import "./DoctorProfile.css";
import DoctorModal from "../../components/DoctorModal";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

const DoctorProfile = () => {
  const [data, setData] = useState([]);
  const [isDoctorAdded, setIsDoctorAdded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5);

  // Get current doctors for the current page
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = data.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(data.length / doctorsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/doctors");
        console.log("Doctors:", res.data);

        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  isDoctorAdded && setIsDoctorAdded(false);

  const handleDoctorAdd = async (newDoctorData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/add-doctor",
        newDoctorData
      );
      console.log("Doctor added:", res.data);

      setData((prevData) => [...prevData, newDoctorData]);
      setIsDoctorAdded(true);
    } catch (err) {
      console.log("Error adding doctor:", err);
    }
  };

  return (
    <div className="DoctorProfile">
      <div className="logo">
        <img src="../Logo.png" alt="" />
      </div>

      <div className="text-area">
        <h3>Doctor Profiles</h3>
        <DoctorModal key={isDoctorAdded} onDoctorAdd={handleDoctorAdd} />

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
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Department</th>
              <th>Education</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDoctors.length > 0 ? (
              currentDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.department}</td>
                  <td>{doctor.education}</td>
                  <td>{doctor.experience} years</td>
                  <td>
                    <button className="delete">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No doctors found</td>
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

export default DoctorProfile;

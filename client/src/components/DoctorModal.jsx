import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./DoctorModal.css";
import axios from "axios";

const DoctorModal = ({ onDoctorAdd }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    education: "",
    experience: "",
  });

  const handleOnSubmit = (e) => {
    if (
      !values.name ||
      !values.email ||
      !values.phone ||
      !values.department ||
      !values.education ||
      !values.experience
    ) {
      const missingFields = [];
      if (!values.name) missingFields.push("Name");
      if (!values.email) missingFields.push("Email");
      if (!values.phone) missingFields.push("Phone");
      if (!values.department) missingFields.push("Department");
      if (!values.education) missingFields.push("Education");
      if (!values.experience) missingFields.push("Experience");

      alert(`The following fields are required: ${missingFields.join(", ")}`);
      return;
    }

    console.log("Payload being sent:", values);

    axios
      .post("http://localhost:5000/add-doctor", values)
      .then((res) => {
        console.log(res.data);
        onDoctorAdd(res.data.result);
        setValues({
          name: "",
          email: "",
          phone: "",
          department: "",
          education: "",
          experience: "",
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button onClick={handleShow}>Add</Button>

      <Modal
        backdrop="static"
        className="modal"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="modal-header">
          <Modal.Title>Doctor's Info</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleOnSubmit}>
          <Modal.Body className="modal-form">
            <Form.Group className="mb-3" controlId="fName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="formControl"
                type="text"
                name="name"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                placeholder="Name"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                placeholder="hello@example.com"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
                placeholder="12345678"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                onChange={(e) =>
                  setValues({ ...values, department: e.target.value })
                }
                placeholder="Department"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="education">
              <Form.Label>Education</Form.Label>
              <Form.Control
                type="text"
                name="education"
                onChange={(e) =>
                  setValues({ ...values, education: e.target.value })
                }
                placeholder="Education"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="experience">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                onChange={(e) =>
                  setValues({ ...values, experience: e.target.value })
                }
                placeholder="Experience"
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer className="modal-footer">
            <Button className="btnClose" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" className="btnSave">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default DoctorModal;

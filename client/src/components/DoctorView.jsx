import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./DoctorView.css";

const DoctorView = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>View</Button>

      <Modal
        backdrop="static"
        className="modal"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="modal-header">
          <Modal.Title>More Info</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-form">
          <Form>
            <Form.Group className="mb-3" controlId="fName">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                className="formControl"
                type="fName"
                placeholder="First Name"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="lName" placeholder="Last Name" autoFocus />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="hello@example.com"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="phone" placeholder="12345678" autoFocus />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="department"
                placeholder="Department"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="photo">
              <Form.Label>Photo</Form.Label>
              <Form.Control type="photo" placeholder="photo" autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button className="btnClose" onClick={handleClose}>
            Close
          </Button>
          <Button className="btnSave" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DoctorView;

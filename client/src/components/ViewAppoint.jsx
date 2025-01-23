import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./ViewAppoint.css";

const ViewAppoint = ({
  appointmentId,
  existingAppointment,
  existingReason,
  onStatusChange,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [values, setValues] = useState({
    appointment: existingAppointment,
    reason: existingReason,
  });

  useEffect(() => {
    setValues({
      appointment: existingAppointment || "",
      reason: existingReason || "",
    });
  }, [existingAppointment, existingReason]);

  // const handleOnSubmit = (e) => {
  //   axios
  //     .patch(`http://localhost:5000/patients/${appointmentId}/status`, {
  //       status: "scheduled",
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       onStatusChange("scheduled");
  //       setValues({
  //         appointment: "",
  //         reason: "",
  //       });
  //       handleClose();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleOnSubmit = (e) => {
    axios
      .patch(`http://localhost:5000/patients/${appointmentId}/status`, {
        status: "scheduled",
        appointment: values.appointment,
        reason: values.reason,
      })
      .then((res) => {
        console.log(res.data);
        onStatusChange("scheduled");
        setValues({ appointment: "", reason: "" });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Button onClick={handleShow}>Schedule</Button>

      <Modal
        backdrop="static"
        className="modal"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="modal-header">
          <Modal.Title>Schedule Appointment</Modal.Title>
          <p className="modal-subtext">
            Please fill in the following details to schedule appointment
          </p>
        </Modal.Header>
        <Form onSubmit={handleOnSubmit}>
          <Modal.Body className="modal-form">
            <Form.Group className="mb-3" controlId="reason">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="date"
                name="appointment"
                value={values.appointment}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reason">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text-area"
                name="reason"
                value={values.reason}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer className="modal-footer">
            <Button className="btnClose" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" className="btnSave">
              Schedule Appointment
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ViewAppoint;

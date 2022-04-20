import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../styles/CreateTask.css";

function PTORequest(props) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("/api/empTasks/newPtoRequest", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          assigned_to: assignee,
          date_due: dueDate,
          desc: description,
          start_date: start_date,
          end_date: end_date,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setTitle("");
        setAssignee("");
        setDueDate("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }

    handleClose();
  };

  return (
    <>
      <button onClick={handleShow} className="createTask">
        {props.category}
      </button>

      <Modal show={show} dialogClassName="test" onHide={handleClose}>
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            New Paid time off Request
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label className="label">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAssignee">
              <Form.Label className="label">Assignee</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter task assignee email"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label className="label">Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="MM/DD/YYYY"
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label className="label">End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="MM/DD/YYYY"
                value={end_date}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label className="label">Due Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="MM/DD/YYYY"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label className="label">Task description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default PTORequest;

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../styles/CreateTask.css";

function PTORequest(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className="createTask">
        {props.category}
      </Button>

      <Modal show={show} dialogClassName="test" onHide={handleClose}>
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            New Paid time off Request
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label className="label">Title</Form.Label>
              <Form.Control type="text" placeholder="Enter task title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAssignee">
              <Form.Label className="label">Assignee</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter task assignee email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label className="label">Start Date</Form.Label>
              <Form.Control type="date" placeholder="MM/DD/YYYY" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label className="label">End Date</Form.Label>
              <Form.Control type="date" placeholder="MM/DD/YYYY" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label className="label">Task description</Form.Label>
              <Form.Control as="textarea" rows={5} />
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

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../styles/CreateTask.css";

function TrainingRequest(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="createTask">
        {props.category}
      </Button>

      <Modal show={show} dialogClassName="test" onHide={handleClose}>
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            New Training Request
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
              <Form.Label className="label">Due Date</Form.Label>
              <Form.Control type="date" placeholder="MM/DD/YYYY" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLink">
              <Form.Label className="label">Training URL</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label className="label">Training description</Form.Label>
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

export default TrainingRequest;

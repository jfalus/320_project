import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../styles/CreateTask.css";

function PTORequest(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button variant="primary" onClick={handleShow} className="createTask">
        {props.category}
      </button>

      <Modal show={show} dialogClassName="test" onHide={handleClose}>
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            New Performance Review Request
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
            <Form.Group className="mb-3" controlId="formDueDate">
              <Form.Label className="label">Due Date</Form.Label>
              <Form.Control type="date" placeholder="MM/DD/YYYY" />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label">Growth Feedback</Form.Label>
              <Form.Control as="select">
                <option>Choose from...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="label">Kindness Feedback</Form.Label>
              <Form.Control as="select">
                <option>Choose from...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Control>
              <Form.Group>
                <Form.Label className="label">Delivery Feedback</Form.Label>
                <Form.Control as="select">
                  <option>Choose from...</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Form.Control>
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label className="label">Overall Comments</Form.Label>
              <Form.Control as="textarea" rows={3} />
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

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../styles/CreateTask.css";
import MultipleValueTextInput from "react-multivalue-text-input";

function PerformanceReview(props) {
  const assignee = [];
  const [title, setTitle] = useState("");
  const setAssignee = useState("");
  const [dueDate, setDueDate] = useState("");
  const [overall_comments, setComment] = useState("");
  const [growth_feedback, setGrowth] = useState("");
  const [delivery_feedback, setDelivery] = useState("");
  const [kindness_feedback, setKindness] = useState("");
  const [message, setMessage] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url = "/api/empTasks/newPerformanceReview";

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          assigned_to: assignee,
          date_due: dueDate,
          overall_comments: overall_comments,
          growth_feedback: growth_feedback,
          kindness_feedback: kindness_feedback,
          delivery_feedback: delivery_feedback,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setTitle("");
        setAssignee(assignee);
        setDueDate("");
        setGrowth("");
        setDelivery("");
        setKindness("");
        setComment("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }

    handleClose();
  };

  const onItemAdd = (item) => {
    assignee.push(item);
  };

  const onItemDelete = (item) => {
    var index = assignee.indexOf(item);
    if (index !== -1) {
      assignee.splice(index, 1);
    }
  };

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
            <MultipleValueTextInput
              className="assignee"
              onItemAdded={onItemAdd}
              onItemDeleted={onItemDelete}
              label="Assignee"
              name="assignee"
              placeholder="Enter assignee email(s); separate them with COMMA or ENTER."
            />
            <Form.Group className="mb-3" controlId="formDueDate">
              <Form.Label className="label">Due Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="MM/DD/YYYY"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label">Growth Feedback</Form.Label>
              <Form.Control
                as="select"
                value={growth_feedback}
                onChange={(e) => setGrowth(e.target.value)}
              >
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
              <Form.Control
                as="select"
                value={kindness_feedback}
                onChange={(e) => setKindness(e.target.value)}
              >
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
                <Form.Control
                  as="select"
                  value={delivery_feedback}
                  onChange={(e) => setDelivery(e.target.value)}
                >
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
              <Form.Control
                as="textarea"
                rows={3}
                value={overall_comments}
                onChange={(e) => setComment(e.target.value)}
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

export default PerformanceReview;

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../styles/CreateTask.css";
import MultipleValueTextInput from "react-multivalue-text-input";

function CustomTask(props) {
  const [assignee, setAssignee] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [error_message, setErrorMessage] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url = "/api/empTasks/newGeneralTask";

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAssignee([]);
      setErrorMessage("");
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          assigned_to: assignee,
          date_due: dueDate,
          description: description,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setTitle("");
        setAssignee([]);
        setDueDate("");
        setDescription("");
        setErrorMessage("");
        handleClose();
      } else {
        setErrorMessage(resJson.Error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onItemAdd = (item) => {
    setAssignee((assignee) => [...assignee, item]);
  };

  const onItemDelete = (item) => {
    setAssignee((assignee) => assignee.filter((key) => key !== item));
  };

  return (
    <>
      <button variant="primary" onClick={handleShow} className="createTask">
        {props.category}
      </button>

      <Modal show={show} dialogClassName="test" onHide={handleClose}>
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            New Task
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
            <div className="error-message">{error_message}</div>
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

export default CustomTask;

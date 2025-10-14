import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";

function TaskForm({ onAddTask, editTask, onUpdateTask, cancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || "");
      setDescription(editTask.description || "");
      setStatus(editTask.status || "Pending");
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required!");

    const taskData = { title, description, status };

    if (editTask) {
      onUpdateTask({ ...editTask, ...taskData });
    } else {
      onAddTask(taskData);
      // Reset only after adding a new task
      setTitle("");
      setDescription("");
      setStatus("Pending");
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{editTask ? "Edit Task" : "Add Task"}</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="me-2">
            {editTask ? "Update Task" : "Add Task"}
          </Button>
          {editTask && (
            <Button variant="secondary" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default TaskForm;

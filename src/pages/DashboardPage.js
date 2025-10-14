import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Form, Button, InputGroup } from "react-bootstrap";
import axios from "axios";
import { getTasks, addTaskAPI, updateTaskAPI, deleteTaskAPI } from "../services/api.js";

// Navbar component with username
function AppNavbar({ username, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        <div className="text-light fs-5 fw-semibold">
          Task Dashboard {username && <span className="ms-2">👋 {username}</span>}
        </div>
        <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
          Logout
        </button>
      </Container>
    </nav>
  );
}



// Task Form component
function TaskForm({ onAddTask, editTask, onUpdateTask, cancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setStatus(editTask.status);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required!");

    const taskData = { title, description, status };

    if (editTask) onUpdateTask({ ...editTask, ...taskData });
    else onAddTask({ title, description, status: "Pending" }); // always Pending for new task

    setTitle("");
    setDescription("");
    setStatus("Pending");
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

          {/* Show Status only while editing */}
          {editTask && (
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </Form.Select>
            </Form.Group>
          )}

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


// Tasks List component
function TasksList({ tasks, onEdit, onDelete }) {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return { backgroundColor: "#f0ad4e", color: "white", fontWeight: "bold", padding: "4px 10px", borderRadius: "12px", textAlign: "center" }; // yellow
      case "in progress":
        return { backgroundColor: "#0275d8", color: "white", fontWeight: "bold", padding: "4px 10px", borderRadius: "12px", textAlign: "center" }; // blue
      case "completed":
        return { backgroundColor: "#5cb85c", color: "white", fontWeight: "bold", padding: "4px 10px", borderRadius: "12px", textAlign: "center" }; // green
      default:
        return {};
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Tasks</Card.Title>
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <span style={getStatusStyle(task.status)}>
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      className="me-2"
                      onClick={() => onEdit(task)}
                    >
                      Edit
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => onDelete(task.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}



// Main Dashboard
function DashboardPage({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState("");

  const token = localStorage.getItem("authToken");

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(token);
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    if (token) fetchTasks();
  }, [token]);

  // Fetch user info
const BASE_URL = "https://task-management-backend-qmfb.onrender.com";

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(res.data.username);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };
  if (token) fetchUser();
}, [token]);


  const addTask = async (task) => {
    try {
      const newTask = await addTaskAPI(task, token);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const updateTask = async (task) => {
    try {
      const updated = await updateTaskAPI(task, token);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setEditTask(null);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskAPI(id, token);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const editExistingTask = (task) => setEditTask(task);
  const cancelEdit = () => setEditTask(null);

  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <>
      <AppNavbar username={username} onLogout={onLogout} />
      <Container>
        <Row>
          <Col md={4}>
            <TaskForm
              onAddTask={addTask}
              editTask={editTask}
              onUpdateTask={updateTask}
              cancelEdit={cancelEdit}
            />
          </Col>
          <Col md={8}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <TasksList tasks={filteredTasks} onEdit={editExistingTask} onDelete={deleteTask} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardPage;

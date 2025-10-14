import React from "react";
import { Card, Table, Button, Badge } from "react-bootstrap";

function TasksList({ tasks, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success"; // green
      case "In Progress":
        return "warning"; // yellow
      case "Pending":
      default:
        return "secondary"; // gray
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
                    <Badge bg={getStatusColor(task.status)}>{task.status}</Badge>
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

export default TasksList;

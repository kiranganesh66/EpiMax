import React, { useState } from "react";
import "./App.css"; // Importing CSS file for styles

const TaskList = () => {
  // State for managing tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    deadline: "",
    assignedTo: "",
  });

  // Function to handle task submission
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    // Validate task inputs
    if (!newTask.name || !newTask.deadline || !newTask.assignedTo) {
      alert("Please fill in all required fields.");
      return;
    }
    setTasks([...tasks, { ...newTask, status: "Pending" }]);
    // Reset newTask state
    setNewTask({ name: "", description: "", deadline: "", assignedTo: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleTaskStatusUpdate = (index, status) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = status;
    setTasks(updatedTasks);
  };

  return (
    <div className="task-list-container">
      <h1>Task List</h1>
      {/* Task creation form */}
      <form className="task-form" onSubmit={handleTaskSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Task Name"
          value={newTask.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="date"
          name="deadline"
          value={newTask.deadline}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="assignedTo"
          placeholder="Assigned To"
          value={newTask.assignedTo}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Task</button>
      </form>
      {/* Task list */}
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-card">
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Assigned To: {task.assignedTo}</p>
            {/* Task status buttons */}
            <button
              className="status-btn"
              onClick={() => handleTaskStatusUpdate(index, "In Progress")}
            >
              Start
            </button>
            <button
              className="status-btn"
              onClick={() => handleTaskStatusUpdate(index, "Paused")}
            >
              End
            </button>
            <button
              className="status-btn"
              onClick={() => handleTaskStatusUpdate(index, "Completed")}
            >
              Complete
            </button>
            <p>
              Status:{" "}
              <span style={{ color: "#a527e8", fontWeight: 500 }}>
                {task.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

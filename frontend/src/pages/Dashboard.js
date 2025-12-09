import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Badge, Col, Container, Row } from "reactstrap";
import "../App.css";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  const emptyTask = useMemo(
    () => ({ title: "", description: "", completed: false, category: "Work" }),
    []
  );

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "test work test ",
      description: "يفال الحمد لله على السلامة",
      completed: false,
      category: "Work",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [formTask, setFormTask] = useState(emptyTask);
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => {
    setFormTask(emptyTask);
    setEditingId(null);
  };

  const handleChange = (field, value) => {
    setFormTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formTask.title.trim()) return;

    if (editingId !== null) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingId ? { ...task, ...formTask } : task
        )
      );
    } else {
      const newTask = {
        ...formTask,
        id: Date.now(),
        completed: false,
      };
      setTasks((prev) => [newTask, ...prev]);
    }

    resetForm();
  };

  const startEdit = (task) => {
    setFormTask({
      title: task.title,
      description: task.description,
      completed: task.completed,
      category: task.category,
    });
    setEditingId(task.id);
  };

  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.category === selectedCategory);

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h2> do login pls :) </h2>
      </Container>
    );
  }

  return (
    <div className="App">
      <Container className="py-5">
        <Row className="mb-4 text-center">
          <Col>
            <h1 className="mb-3">Task Manager</h1>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <Badge
                color={selectedCategory === "All" ? "primary" : "secondary"}
                pill
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCategory("All")}>
                All
              </Badge>
              <Badge
                color={selectedCategory === "Work" ? "info" : "secondary"}
                pill
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCategory("Work")}>
                Work
              </Badge>
              <Badge
                color={
                  selectedCategory === "Personal" ? "success" : "secondary"
                }
                pill
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCategory("Personal")}>
                Personal
              </Badge>
              <Badge
                color={selectedCategory === "Urgent" ? "danger" : "secondary"}
                pill
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCategory("Urgent")}>
                Urgent
              </Badge>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg="5" className="mb-4">
            <TaskForm
              formTask={formTask}
              editingId={editingId}
              onSubmit={handleSubmit}
              onChange={handleChange}
              onCancel={resetForm}
            />
          </Col>

          <Col lg="7">
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={toggleComplete}
              onEdit={startEdit}
              onDelete={deleteTask}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;

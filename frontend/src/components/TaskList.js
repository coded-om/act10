import { Card, CardBody, CardTitle } from "reactstrap";
import TaskCard from "./TaskCard";

function TaskList({ tasks, onToggleComplete, onEdit, onDelete }) {
  return (
    <Card className="shadow-sm">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <CardTitle tag="h5" className="mb-1">
              Your Tasks
            </CardTitle>
          </div>
        </div>
        <div className="task-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

export default TaskList;

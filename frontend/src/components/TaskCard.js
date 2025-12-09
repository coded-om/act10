import { Badge, Button, Card, CardBody, CardText, CardTitle } from "reactstrap";

function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  const getCategoryColor = (category) => {
    switch (category) {
      case "Work":
        return "info";
      case "Personal":
        return "success";
      case "Urgent":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Card className={`task-card ${task.completed ? "completed" : ""}`}>
      <CardBody>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <CardTitle tag="h5" className="mb-0">
            {task.title}
          </CardTitle>
          <Badge color={getCategoryColor(task.category)} pill>
            {task.category || "Work"}
          </Badge>
        </div>
        {task.description && (
          <CardText className="text-muted mb-3">{task.description}</CardText>
        )}

        <div className="d-flex gap-2">
          <Button
            size="sm"
            color={task.completed ? "secondary" : "success"}
            onClick={() => onToggleComplete(task.id)}>
            {task.completed ? "Mark Incomplete" : "Mark Done"}
          </Button>
          <Button size="sm" color="info" outline onClick={() => onEdit(task)}>
            Edit
          </Button>
          <Button
            size="sm"
            color="danger"
            outline
            onClick={() => onDelete(task.id)}>
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default TaskCard;

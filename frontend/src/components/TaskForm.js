import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

function TaskForm({ formTask, editingId, onSubmit, onChange, onCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <Card className="shadow-sm">
      <CardBody>
        <CardTitle tag="h5" className="mb-3">
          {editingId ? "Edit Task" : "Create Task"}
        </CardTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              value={formTask.title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="e.g., Draft project brief"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              id="description"
              type="textarea"
              value={formTask.description}
              onChange={(e) => onChange("description", e.target.value)}
              placeholder="Add useful context for this task"
              rows={3}
            />
          </FormGroup>
          <FormGroup>
            <Label for="category">Category</Label>
            <Input
              id="category"
              type="select"
              value={formTask.category || "Work"}
              onChange={(e) => onChange("category", e.target.value)}>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </Input>
          </FormGroup>
          <div className="d-flex gap-2">
            <Button color="primary" type="submit">
              {editingId ? "Save Changes" : "Add Task"}
            </Button>
            {editingId && (
              <Button
                color="secondary"
                outline
                type="button"
                onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}

export default TaskForm;

export default class TodoController {
  constructor(Todo) {
    this.Todo = Todo;
  }

  create(req, res) {
    const todo = new this.Todo(req.body);
    return todo
      .save()
      .then(() => res.status(201).send(todo))
      .catch(err => res.status(422).send(err.message));
  }

  get(req, res) {
    return this.Todo.find({})
      .then(todos => res.send(todos))
      .catch(err => res.status(400).send(err.message));
  }

  getById(req, res) {
    const { params: { id } } = req;
    return this.Todo.find({ _id: id })
      .then(todos => res.send(todos))
      .catch(err => res.status(404).send(err.message));
  }

  update(req, res) {
    return this.Todo.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(422).send(err.message));
  }

  remove(req, res) {
    return this.Todo.remove({ _id: req.params.id })
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  }
}

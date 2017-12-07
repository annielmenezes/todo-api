export default class TodoController {
  // constructor() {}
  get(req, res) {
    return res.send([
      {
        text: "Default todo",
        completed: false
      }
    ]);
  }
}

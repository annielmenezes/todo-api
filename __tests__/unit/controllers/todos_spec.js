import TodosController from "../../../src/controllers/todos";

describe("Controllers: Todos", () => {
  const defaultTodo = [
    {
      text: "Default todo",
      completed: false
    }
  ];

  describe("get() todos", () => {
    test("shoul return a list of products", () => {
      const request = {};
      const response = {
        send: jest.fn()
      };
      const todosController = new TodosController();
      todosController.get(request, response);
      expect(response.send).toHaveBeenCalled();
      expect(response.send).toHaveBeenCalledWith(defaultTodo);
    });
  });
});

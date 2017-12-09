import sinon from "sinon";
import TodosController from "../../../src/controllers/todos";
import Todo from "../../../src/models/todo";

describe("Controllers: Todos", () => {
  const defaultTodo = [
    {
      __v: 0,
      _id: "56cb91bdc3464f14678934ca",
      text: "Default todo",
      completed: false
    }
  ];

  const defaultRequest = {
    params: {}
  };

  describe("get()", () => {
    it("should call send with a list of products", () => {
      const response = {
        send: sinon.spy()
      };
      Todo.find = sinon.stub();
      Todo.find.withArgs({}).resolves(defaultTodo);

      const todosController = new TodosController(Todo);
      return todosController.get(defaultRequest, response).then(() => {
        sinon.assert.calledWith(response.send, defaultTodo);
      });
    });

    it("should return 400 when an error occurs", () => {
      const request = {};
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      };

      response.status.withArgs(400).returns(response);
      Todo.find = sinon.stub();
      Todo.find.withArgs({}).rejects({ message: "Error" });

      const todosController = new TodosController(Todo);

      return todosController.get(request, response).then(() => {
        sinon.assert.calledWith(response.send, "Error");
      });
    });
  });

  describe("getById()", () => {
    it("should call send with a todo", () => {
      const fakeId = "a-fake-id";
      const request = {
        params: {
          id: fakeId
        }
      };
      const response = {
        send: sinon.spy()
      };
      Todo.find = sinon.stub();
      Todo.find.withArgs({ _id: fakeId }).resolves(defaultTodo);

      const todosController = new TodosController(Todo);

      return todosController.getById(request, response).then(() => {
        sinon.assert.calledWith(response.send, defaultTodo);
      });
    });
  });

  describe("create()", () => {
    it("should call send with a new todo", () => {
      const requestWithBody = Object.assign(
        {},
        { body: defaultTodo[0] },
        defaultRequest
      );
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      };
      class FakeTodo {
        save() {}
      }

      response.status.withArgs(201).returns(response);
      sinon
        .stub(FakeTodo.prototype, "save")
        .withArgs()
        .resolves();

      const todosController = new TodosController(FakeTodo);

      return todosController.create(requestWithBody, response).then(() => {
        sinon.assert.calledWith(response.send);
      });
    });

    it("should return 422 when an error occurs", () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      };
      class FakeTodo {
        save() {}
      }

      response.status.withArgs(422).returns(response);
      sinon
        .stub(FakeTodo.prototype, "save")
        .withArgs()
        .rejects({ message: "Error" });

      const todosController = new TodosController(FakeTodo);

      return todosController.create(defaultRequest, response).then(() => {
        sinon.assert.calledWith(response.status, 422);
      });
    });
  });

  describe("update()", () => {
    it("should respond with 200 when the todo is updated", () => {
      const fakeId = "a-fake-id";
      const updatedTodo = {
        _id: fakeId,
        text: "Updated Todo",
        completed: false
      };
      const request = {
        params: {
          id: fakeId
        },
        body: updatedTodo
      };
      const response = {
        sendStatus: sinon.spy()
      };
      class FakeTodo {
        static findOneAndUpdate() {}
      }

      const findOneAndUpdateStub = sinon.stub(FakeTodo, "findOneAndUpdate");
      findOneAndUpdateStub
        .withArgs({ _id: fakeId }, updatedTodo)
        .resolves(updatedTodo);

      const todosController = new TodosController(FakeTodo);

      return todosController.update(request, response).then(() => {
        sinon.assert.calledWith(response.sendStatus, 200);
      });
    });

    it("should return 422 when an error occurs", () => {
      const fakeId = "a-fake-id";
      const updatedTodo = {
        _id: fakeId,
        text: "Updated Todo",
        completed: false
      };
      const request = {
        params: {
          id: fakeId
        },
        body: updatedTodo
      };
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      };
      class FakeTodo {
        static findOneAndUpdate() {}
      }

      const findOneAndUpdateStub = sinon.stub(FakeTodo, "findOneAndUpdate");
      findOneAndUpdateStub
        .withArgs({ _id: fakeId }, updatedTodo)
        .rejects({ message: "Error" });
      response.status.withArgs(422).returns(response);

      const todosController = new TodosController(FakeTodo);

      return todosController.update(request, response).then(() => {
        sinon.assert.calledWith(response.send, "Error");
      });
    });
  });

  describe("remove()", () => {
    it("should respond with 204 when todo has deleted", () => {
      const fakeId = "a-fake-id";
      const request = {
        params: {
          id: fakeId
        }
      };
      const response = {
        sendStatus: sinon.spy()
      };
      class FakeTodo {
        static remove() {}
      }

      const removeStub = sinon.stub(FakeTodo, "remove");
      removeStub.withArgs({ _id: fakeId }).resolves([1]);

      const todosController = new TodosController(FakeTodo);

      return todosController.remove(request, response).then(() => {
        sinon.assert.calledWith(response.sendStatus, 204);
      });
    });

    it("should return 400 when an error occurs", () => {
      const fakeId = "a-fake-id";
      const request = {
        params: {
          id: fakeId
        }
      };
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      };
      class FakeTodo {
        static remove() {}
      }

      const removeStub = sinon.stub(FakeTodo, "remove");
      removeStub.withArgs({ _id: fakeId }).rejects({ message: "Error" });
      response.status.withArgs(400).returns(response);

      const todosController = new TodosController(FakeTodo);

      return todosController.remove(request, response).then(() => {
        sinon.assert.calledWith(response.send, "Error");
      });
    });
  });
});

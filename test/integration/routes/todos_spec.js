import Todo from "../../../src/models/todo";

describe("Routes: Todos", () => {
  let request;
  before(() => {
    return setupApp().then(app => {
      request = supertest(app);
    });
  });
  const defaultId = "56cb91bdc3464f14678934ca";
  const defaultTodo = {
    text: "Default todo",
    completed: false
  };

  const expectedTodo = {
    __v: 0,
    _id: defaultId,
    text: "Default todo",
    completed: false
  };
  beforeEach(() => {
    const todo = new Todo(defaultTodo);
    todo._id = "56cb91bdc3464f14678934ca";
    return Todo.remove().then(() => todo.save());
  });

  afterEach(() => Todo.remove({}).then());

  describe("GET /todos", () => {
    it("should return a list of todos", done => {
      request.get("/todos").end((err, res) => {
        expect(res.body).to.eql([expectedTodo]);
        done(err);
      });
    });

    context("When an id is specified", () => {
      it("should return 200 with a todo", done => {
        request
          .get(`/todos/${defaultId}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.eql([expectedTodo]);
            done(err);
          });
      });
    });
  });

  describe("POST /todos", () => {
    context("When post a todo", () => {
      it("should return a new todo with status code 201", done => {
        const customId = "56cb91bdc3464f14678934ba";
        const newTodo = Object.assign(
          {},
          { _id: customId, __v: 0 },
          defaultTodo
        );
        const expectedSavedTodo = {
          __v: 0,
          _id: customId,
          text: "Default todo",
          completed: false
        };

        request
          .post("/todos")
          .send(newTodo)
          .expect(201)
          .end((err, res) => {
            expect(res.body).to.eql(expectedSavedTodo);
            done(err);
          });
      });
    });
  });

  describe("PUT /todos/:id", () => {
    context("When editing a todo", () => {
      it("should update the todo and return 200 as status code", done => {
        const customTodo = {
          text: "Custom todo"
        };
        const updatedTodo = Object.assign({}, customTodo, defaultTodo);

        request
          .put(`/todos/${defaultId}`)
          .send(updatedTodo)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });

  describe("DELETE /todos/:id", () => {
    context("When delete a todo", () => {
      it("should delete a todo and return 204 as status code", done => {
        request.delete(`/todos/${defaultId}`).end((err, res) => {
          expect(res.status).to.eql(204);
          done(err);
        });
      });
    });
  });
});

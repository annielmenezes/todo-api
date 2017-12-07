import supertest from "supertest";
import app from "../../../src/app";

describe("Routes: Todos", () => {
  const defaultTodo = {
    text: "Default todo",
    completed: false
  };

  describe("GET /todos", () => {
    test("should return a list of todos", async () => {
      const response = await supertest(app).get("/todos");
      expect(response.body[0]).toEqual(defaultTodo);
    });
  });
});

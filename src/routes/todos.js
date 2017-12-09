import { Router } from "express";
import TodosController from "../controllers/todos";
import Todo from "../models/todo";

const router = Router();
const todosController = new TodosController(Todo);

router.post("/", (req, res) => todosController.create(req, res));
router.get("/", (req, res) => todosController.get(req, res));
router.get("/:id", (req, res) => todosController.getById(req, res));
router.put("/:id", (req, res) => todosController.update(req, res));
router.delete("/:id", (req, res) => todosController.remove(req, res));

export default router;

import { Router } from "express";
import TodosController from "../controllers/todos";

const router = Router();
const todosController = new TodosController();

router.get("/", (req, res) => todosController.get(req, res));

export default router;

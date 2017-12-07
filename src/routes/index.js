import { Router } from "express";
import todosRouter from "./todos";
const router = Router();

router.use("/todos", todosRouter);
router.get("/", (req, res) => res.send("Hello World!"));

export default router;

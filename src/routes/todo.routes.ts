import { Router } from 'express';
import todoController from "../controllers/todo.controller";

const router = Router();

/*
 * GET
 */
router.get("/", todoController.list);

/*
 * GET
 */
router.get("/:id", todoController.show);

/*
 * GET
 */
router.get("/listTodos/:userId", todoController.getUserTodos);

/*
 * POST
 */
router.post("/", todoController.create);

/*
 * PATCH
 */
router.patch("/completed/:id", todoController.setCompleted);

/*
 * PATCH
 */
router.patch("/uncompleted/:id", todoController.setUncompleted);

/*
 * DELETE
 */
router.delete("/:id", todoController.remove);


export default router;
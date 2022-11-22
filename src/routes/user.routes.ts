import { Router } from 'express';
import userController from "../controllers/user.controller";

const router = Router();

/*
 * GET
 */
router.get("/", userController.list);

/*
 * GET
 */
router.get("/:id", userController.show);

/*
 * POST
 */
router.post("/register", userController.create);

/*
 * POST
 */
router.post("/login", userController.login);

export default router;
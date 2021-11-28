import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { BookController } from "./controllers/BookController";
const router = Router();

router.post("/generate-user", new UserController().generateUser);
router.post("/authenticate", new UserController().authenticate);

router.get("/getAll", new BookController().getAll);
router.post("/create", new BookController().create);
router.put("/update", new BookController().update);
router.delete("/delete/:id", new BookController().delete);

export { router };

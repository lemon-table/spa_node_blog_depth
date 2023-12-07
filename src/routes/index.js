import express from "express";
import PostsRouter from "./posts.router.js";
import UsersRouter from "./users.router.js";
import AuthRouter from "./auth.router.js";

const router = express.Router();

router.use("/posts/", PostsRouter);
router.use("/users/", UsersRouter);
router.use("/auth/", AuthRouter);

export default router;

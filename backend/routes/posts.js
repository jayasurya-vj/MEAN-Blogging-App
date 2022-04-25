import express from "express";
import {postController} from "../controllers/post.js"
import {extractedFile} from "../middleware/file.js";
import {checkAuth} from "../middleware/check-auth.js";

export const postsRouter = express.Router();

postsRouter.post("",checkAuth,extractedFile,postController.createPost);

postsRouter.put("/:id",checkAuth,extractedFile, postController.editPost);

postsRouter.get("/:id",postController.getOnePost);

postsRouter.get("",postController.getPosts);

postsRouter.delete("/:id",checkAuth, postController.deletePost);


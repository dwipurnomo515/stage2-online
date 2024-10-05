import express from "express";
import authController from "../controller/auth.controller";
import { toggleLikeController } from "../controller/like.controller";
import threadController from "../controller/thread.controller";
import userController from "../controller/user.controller";
import { authentication } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorization";
import { upload } from "../middlewares/upload-file";
import { ReplyController } from "../controller/reply.controller";



export const routerV1 = express.Router();

routerV1.get("/",);
routerV1.get("/users", userController.find);
routerV1.get("/users/:id", userController.findById);
routerV1.post("/users", userController.create);
routerV1.patch("/users", userController.update);
routerV1.delete("/users/:id", userController.delete);

routerV1.get("/threads", authentication, threadController.find);
routerV1.get("/threads/:id", authentication, threadController.findById);
routerV1.post(
    "/threads",
    authentication,
    upload.single("image"),
    threadController.create
);
routerV1.patch("/threads/:id", authentication, threadController.update);
routerV1.delete("/threads/:id", authentication, threadController.delete);

routerV1.post("/auth/login", authController.login);
routerV1.post("/auth/register", authController.register);
routerV1.post("/auth/check", authentication, authController.check);

routerV1.post("/:userId/threads/:threadId/like", toggleLikeController);
routerV1.get('/threads/:threadId/comments',);
routerV1.post('/threads/:threadId/reply', authentication, upload.single('image'), ReplyController);


routerV1.get("/dashboard", authentication, authorize("ADMIN"), (req, res) => {
    res.json({ message: "Hello Dashboard" });
});
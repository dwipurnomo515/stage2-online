import express from "express";
import authController from "../controller/auth.controller";
import { toggleLikeController } from "../controller/like.controller";
import threadController from "../controller/thread.controller";
import userController from "../controller/user.controller";
import { authentication } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorization";
import { upload } from "../middlewares/upload-file";
import followController from "../controller/follow.controller";
import follow1Controller from "../controller/follow1.controller";
import like1Controller from "../controller/like1.controller";
import replyController from "../controller/reply.controller";

export const routerV1 = express.Router();

routerV1.get("/");
routerV1.get("/users", userController.find);
routerV1.get("/getUser", authentication, userController.getUser);
routerV1.get(
  "/users/suggested",
  authentication,
  userController.findSuggestedUsers
);
routerV1.get("/users/:id", authentication, userController.findById);
routerV1.post("/users", userController.create);
routerV1.put(
  "/users",
  authentication,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  userController.update
);
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
routerV1.post("/auth/forgotPassword", authController.forgotPassword);
routerV1.post("/auth/resetPassword/:token", authController.resetPassword);

routerV1.post("/:userId/threads/:threadId/like", toggleLikeController);
routerV1.get(
  "/threads/:threadId/reply",
  authentication,
  replyController.getReplyByPost
);

routerV1.post(
  "/threads/:threadId/reply",
  authentication,
  upload.single("image"),
  replyController.createReply
);

routerV1.get(
  "/threads/:threadId/like",
  authentication,
  like1Controller.getLikes
);
routerV1.post(
  "/threads/:threadId/like",
  authentication,
  like1Controller.likeThread
);

routerV1.post(
  "/reply/:replyId/like",
  authentication,
  replyController.toggleLikeReply
);

routerV1.get(
  "/reply/:replyId/likes",
  authentication,
  replyController.getReplyLikes
);

routerV1.get("/dashboard", authentication, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Hello Dashboard" });
});

// routerV1.post('/follow/:followingId', authentication, followController.toggleFollow)
routerV1.get(
  "/follow/:userId",
  authentication,
  follow1Controller.checkFollowStatus
);
routerV1.patch(
  "/follow/:userId",
  authentication,
  follow1Controller.toggleFollow
);
routerV1.get("/follows", authentication, follow1Controller.followList);

routerV1.get("/search", authentication, userController.searchUser);

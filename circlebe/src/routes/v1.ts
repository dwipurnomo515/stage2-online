import express from "express";
import userController from "../controller/user.controller";
import authController from "../controller/auth.controller";
import { authentication } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorization";
import threadController from "../controller/thread.controller";
import { upload, uploadDisk } from "../middlewares/upload-file";



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
    uploadDisk.single("image"),
    threadController.create
);
routerV1.patch("/threads/:id", authentication, threadController.update);
routerV1.delete("/threads/:id", authentication, threadController.delete);

routerV1.post("/auth/login", authController.login);
routerV1.post("/auth/register", authController.register);
routerV1.post("/auth/check", authentication, authController.check);

routerV1.get("/dashboard", authentication, authorize("ADMIN"), (req, res) => {
    res.json({ message: "Hello Dashboard" });
});
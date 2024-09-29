"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = authentication;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authentication(req, res, next) {
    /* #swagger.security = [{
          "bearerAuth": []
  }] */
    const authorizationHeader = req.header("Authorization");
    console.log("token", authorizationHeader);
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(404).json({
            message: "Unauthorizated!",
        });
    }
    const token = authorizationHeader.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({
            message: "Authorization token not found"
        });
    }
    try {
        const secretKey = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

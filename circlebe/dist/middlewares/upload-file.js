"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDisk = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const storageDisk = multer_1.default.diskStorage({
    destination: "./uploads"
});
exports.upload = (0, multer_1.default)({ storage: storage });
exports.uploadDisk = (0, multer_1.default)({ storage: storageDisk });

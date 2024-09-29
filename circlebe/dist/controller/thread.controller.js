"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const thread_service_1 = __importDefault(require("../services/thread.service"));
const thread_schema_1 = require("../utils/schemas/thread.schema");
const cloudinary_service_1 = __importDefault(require("../services/cloudinary.service"));
class ThreadController {
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const threads = yield thread_service_1.default.getAllThreads();
                res.json(threads);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const threads = yield thread_service_1.default.getThreadById(Number(id));
                res.json(threads);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*  #swagger.requestBody = {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/components/schemas/CreateThreadDTO"
                        }
                    }
                }
            }
        */
            try {
                const user = req.user;
                const image = yield cloudinary_service_1.default.uploadSingle(req.file);
                const body = Object.assign(Object.assign({}, req.body), { image: image.secure_url });
                const value = yield thread_schema_1.createThreadSchema.validateAsync(body);
                const threads = yield thread_service_1.default.createThread(value, user);
                console.log("Created thread:", threads); // Tambahkan ini untuk debug
                res.json(threads);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*  #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/UpdateThreadDTO"
                            }
                        }
                    }
                }
            */
            try {
                const threads = yield thread_service_1.default.updateThread(req.body);
                res.json(threads);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const threads = yield thread_service_1.default.deleteThread(Number(id));
                res.json(threads);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new ThreadController();

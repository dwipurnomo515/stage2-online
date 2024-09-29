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
const auth_schema_1 = require("../utils/schemas/auth.schema");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const joi_1 = __importDefault(require("joi"));
class authController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*  #swagger.requestBody = {
             required: true,
             content: {
                 "application/json": {
                     schema: {
                         $ref: "#/components/schemas/LoginDTO"
                     }
                 }
             }
         }
     */
            try {
                const value = yield auth_schema_1.loginSchema.validateAsync(req.body);
                const user = yield auth_service_1.default.login(value);
                res.json(user);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*  #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: {
                          $ref: "#/components/schemas/RegisterDTO"
                      }
                  }
              }
          }
      */
            try {
                const value = yield auth_schema_1.registerSchema.validateAsync(req.body);
                const user = yield auth_service_1.default.register(value);
                res.json(user);
            }
            catch (error) {
                if (error instanceof joi_1.default.ValidationError) {
                    return res.status(400).json({ message: error.details[0].message });
                }
                if (error instanceof Error) {
                    return res.status(400).json({ message: error.message });
                }
                res.status(500).json({ message: "Terjadi kesalahan yang tidak terduga." });
            }
        });
    }
    check(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                res.json(user);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
}
exports.default = new authController();

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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class authService {
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existingUser) {
                throw new Error("Email sudah terdaftar.");
            }
            const salt = 10;
            const hashedPassword = yield bcrypt_1.default.hash(data.password, salt);
            const _a = yield prisma.user.create({
                data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
            }), { password } = _a, result = __rest(_a, ["password"]);
            return result;
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: {
                    email: data.email,
                },
            });
            if (!user) {
                throw {
                    status: 404,
                    message: "User not found",
                };
            }
            const isValidPassword = yield bcrypt_1.default.compare(data.password, user.password);
            if (!isValidPassword) {
                throw {
                    status: 404,
                    message: "Email / password wrong!",
                };
            }
            const { password } = user, userToSign = __rest(user, ["password"]);
            const secretKey = process.env.JWT_SECRET;
            const token = jsonwebtoken_1.default.sign(userToSign, secretKey);
            return {
                user: userToSign,
                token: token,
            };
        });
    }
}
exports.default = new authService();

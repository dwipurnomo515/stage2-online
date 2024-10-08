var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/LoginForm.tsx
import { Box, Button, Input, Link, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import '../../../index.css'; // Impor file CSS global
import { useLoginForm } from '../hooks/use-login-form';
import { useState } from 'react';
export function LoginForm() {
    var _this = this;
    var _a = useLoginForm(), register = _a.register, onSubmit = _a.onSubmit, errors = _a.errors, handleSubmit = _a.handleSubmit;
    var _b = useState(''), loginError = _b[0], setLoginError = _b[1]; // State untuk menyimpan pesan kesalahan
    var handleLoginSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoginError(''); // Reset pesan kesalahan
                    return [4 /*yield*/, onSubmit(data)];
                case 1:
                    success = _a.sent();
                    if (!success) {
                        setLoginError('Email atau password Anda salah.'); // Set pesan kesalahan jika login gagal
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsx(Box, { width: { base: '90%', sm: '400px' }, p: 6, borderRadius: "md", boxShadow: "md", bgColor: "#1D1D1D", color: "white", children: _jsx("form", { onSubmit: handleSubmit(handleLoginSubmit), children: _jsxs(Stack, { spacing: 2, children: [_jsx(Text, { color: "brand.main", fontSize: "4xl", fontWeight: "bold", children: "Circle" }), _jsx(Text, { fontSize: "3xl", fontWeight: "bold", children: "Login to Circle" }), _jsxs(Box, { borderColor: '#545454', children: [_jsx(Input, __assign({}, register("email"), { mb: 2, type: "email", placeholder: 'Email*', name: 'email' })), errors.email && (_jsx("p", { style: { color: "red", margin: 0 }, children: errors.email.message })), _jsx(Input, __assign({}, register("password"), { type: "password", placeholder: 'Password*', name: 'password' })), errors.password && (_jsx("p", { style: { color: "red", margin: 0 }, children: errors.password.message }))] }), loginError && ( // Tampilkan pesan kesalahan di atas tombol login
                    _jsx(Text, { color: "red.500", textAlign: "center", mt: -3, children: loginError })), _jsx(Box, { textAlign: "end", children: _jsx(Link, { as: RouterLink, to: "/forgotpassword", fontSize: "sm", children: "Forgot Password?" }) }), _jsx(Button, { type: 'submit', backgroundColor: "brand.main", color: 'white', borderRadius: 17, _hover: {
                            bg: 'green.600',
                            boxShadow: 'lg',
                            transform: 'translateY(-2px)',
                            transition: 'all 0.3s ease',
                        }, children: "Login" }), _jsxs("text", { children: ["Don't have an account yet? ", _jsx(Link, { as: RouterLink, to: "/register", color: "brand.main", children: "Create account" })] })] }) }) }));
}
;

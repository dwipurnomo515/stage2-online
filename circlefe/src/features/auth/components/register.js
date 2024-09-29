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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/LoginForm.tsx
import { Box, Button, Input, Link, Spinner, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import '../../../index.css'; // Impor file CSS global
import { useRegisterForm } from '../hooks/use-register-form';
export function RegisterForm() {
    var _a = useRegisterForm(), register = _a.register, handleSubmit = _a.handleSubmit, errors = _a.errors, isSubmitting = _a.isSubmitting, onSubmit = _a.onSubmit, backendError = _a.backendError;
    return (_jsx(Box, { width: { base: '90%', sm: '400px' }, p: 6, borderRadius: "md", boxShadow: "md", bgColor: "#1D1D1D", color: "white", children: _jsxs(Stack, { spacing: 2, children: [_jsx(Text, { color: "brand.main", fontSize: "4xl", fontWeight: "bold", children: "Circle" }), _jsx(Text, { fontSize: "3xl", fontWeight: "bold", children: "Create account Circle" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs(Box, { borderColor: '#545454', children: [_jsx(Input, __assign({}, register("fullName"), { mb: 2, type: "text", placeholder: 'Full Name*', name: 'fullName' })), errors.fullName && (_jsx("p", { style: { color: "red", margin: 0 }, children: errors.fullName.message })), _jsx(Input, __assign({}, register("email"), { mb: 2, type: "email", placeholder: 'Email*', name: 'email' })), errors.email && (_jsx("p", { style: { color: "red", margin: 0 }, children: errors.email.message })), backendError && (_jsx(Text, { color: "red", mb: 2, children: backendError })), _jsx(Input, __assign({}, register("password"), { type: "password", placeholder: 'Password*', name: 'password' })), errors.password && (_jsx("p", { style: { color: "red", margin: 0 }, children: errors.password.message }))] }), _jsx(Button, { type: "submit", backgroundColor: "brand.main", color: 'white', borderRadius: 17, _hover: {
                                bg: 'green.600',
                                boxShadow: 'lg',
                                transform: 'translateY(-2px)',
                                transition: 'all 0.3s ease',
                            }, mt: 2, width: 'full', children: isSubmitting ? _jsx(Spinner, {}) : "Register" })] }), _jsxs("text", { children: ["Already have account? ", _jsx(Link, { as: RouterLink, to: "/login", color: "brand.main", children: "Login" })] })] }) }));
}
;

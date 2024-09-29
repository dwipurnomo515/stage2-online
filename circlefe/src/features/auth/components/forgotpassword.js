import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/LoginForm.tsx
import { Box, Button, Input, Link, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
export function ForgotPassword() {
    return (_jsx(Box, { width: { base: '90%', sm: '400px' }, p: 6, borderRadius: "md", boxShadow: "md", bgColor: "#1D1D1D", color: "white", children: _jsxs(Stack, { spacing: 2, children: [_jsx(Text, { color: "brand.main", fontSize: "4xl", fontWeight: "bold", children: "Circle" }), _jsx(Text, { fontSize: "3xl", fontWeight: "bold", children: "Forgot password" }), _jsx(Box, { borderColor: '#545454', children: _jsx(Input, { type: "email", placeholder: 'Email*', name: 'email' }) }), _jsx(Button, { backgroundColor: "brand.main", color: 'white', borderRadius: 17, _hover: {
                        bg: 'green.600',
                        boxShadow: 'lg',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease',
                    }, children: "Send Instruction" }), _jsxs("text", { children: ["Already have account? ", _jsx(Link, { as: RouterLink, to: '/login', color: "brand.main", children: "Login" })] })] }) }));
}
;

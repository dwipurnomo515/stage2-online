import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/LoginForm.tsx
import { Box, Button, Input, Stack, Text } from '@chakra-ui/react';
export function ResetPassword() {
    return (_jsx(Box, { width: { base: '90%', sm: '400px' }, p: 6, borderRadius: "md", boxShadow: "md", bgColor: "#1D1D1D", color: "white", children: _jsxs(Stack, { spacing: 2, children: [_jsx(Text, { color: "brand.main", fontSize: "4xl", fontWeight: "bold", children: "Circle" }), _jsx(Text, { fontSize: "3xl", fontWeight: "bold", children: "Reset password" }), _jsxs(Box, { borderColor: '#545454', children: [_jsx(Input, { mb: 2, type: "password", placeholder: 'New Password*', name: 'newpassword' }), _jsx(Input, { type: "password", placeholder: 'Confirm New Password*', name: 'confirmpassword' })] }), _jsx(Button, { backgroundColor: "brand.main", color: 'white', borderRadius: 17, _hover: {
                        bg: 'green.600',
                        boxShadow: 'lg',
                        transform: 'translateY(-2px)',
                        transition: 'all 0.3s ease',
                    }, children: "Create New Password" })] }) }));
}
;

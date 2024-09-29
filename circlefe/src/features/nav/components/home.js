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
import { useHome } from "@/features/layout/hook/useHome";
import { Box, Button, Divider, FormControl, FormErrorMessage, FormLabel, HStack, Input, Text, Textarea, VStack, Avatar // Import Avatar component
 } from "@chakra-ui/react";
export function HomeMainContent() {
    var _a, _b;
    var _c = useHome(), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.errors, isSubmitting = _c.isSubmitting, onSubmit = _c.onSubmit, data = _c.data;
    return (_jsxs(Box, { p: 4, bgColor: "black", color: "white", borderLeft: "2px solid grey" // Border kiri sepanjang halaman
        , borderRight: "2px solid grey" // Border kanan sepanjang halaman
        , maxWidth: "800px" // Menyesuaikan lebar konten halaman
        , mx: "auto" // Centering konten di halaman
        , children: [_jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs(FormControl, { isInvalid: !!errors.content, children: [_jsx(FormLabel, { htmlFor: "content", children: "Content" }), _jsx(Textarea, __assign({ id: "content", placeholder: "Write your thread content here" }, register("content"), { color: "white" })), _jsx(FormErrorMessage, { children: (_a = errors.content) === null || _a === void 0 ? void 0 : _a.message })] }), _jsxs(FormControl, { mt: 4, isInvalid: !!errors.image, children: [_jsx(FormLabel, { htmlFor: "image", children: "Image" }), _jsx(Input, __assign({ type: "file", id: "image" }, register("image"), { accept: "image/*" })), _jsx(FormErrorMessage, { children: (_b = errors.image) === null || _b === void 0 ? void 0 : _b.message })] }), _jsx(Button, { mt: 4, colorScheme: "teal", backgroundColor: "brand.main", isLoading: isSubmitting, type: "submit", children: "Create Thread" })] }), _jsx(VStack, { spacing: 4, align: "stretch", mt: 6, children: data === null || data === void 0 ? void 0 : data.map(function (thread) { return (_jsxs(Box, { p: 4, shadow: "md", bgColor: "black", children: [_jsx(Divider, { my: 3 }), _jsxs(HStack, { spacing: 4, align: "center", children: [_jsx(Avatar, { name: thread.user.fullName, src: thread.user.image || "", size: "md" // Ukuran avatar medium
                                 }), _jsxs(Box, { flex: "1", children: [_jsxs(HStack, { mb: 2, children: [_jsx(Text, { fontWeight: "bold", color: "white", children: thread.user.fullName }), _jsx(Text, { fontSize: "sm", color: "gray.300", children: thread.user.email })] }), _jsx(Text, { fontWeight: "bold", color: "white", children: thread.content }), thread.image && (_jsx("img", { src: thread.image, alt: "Thread image", style: { maxWidth: "50%", height: "auto", marginTop: "8px" } }))] })] })] }, thread.id)); }) })] }));
}

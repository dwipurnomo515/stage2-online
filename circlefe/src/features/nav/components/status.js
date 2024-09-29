var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/PostDetail.tsx
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Divider, HStack, IconButton, Image, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FaComment, FaHeart, FaImage } from 'react-icons/fa';
import { Link } from 'react-router-dom';
var sampleComments = [
    { id: 1, username: 'user1', text: 'Great post!', email: '@user1' },
    { id: 2, username: 'user2', text: 'Thanks for sharing!', email: '@user2' },
];
export function StatusMainContent() {
    var _a = useState(sampleComments), comments = _a[0], setComments = _a[1];
    var _b = useState(''), newComment = _b[0], setNewComment = _b[1];
    var _c = useState(null), image = _c[0], setImage = _c[1];
    var handleCommentChange = function (e) {
        setNewComment(e.target.value);
    };
    var handleImageChange = function (event) {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };
    var handleCommentSubmit = function () {
        if (newComment.trim()) {
            var newCommentObj = {
                id: comments.length + 1,
                username: 'current_user', // Replace with actual username
                text: newComment,
                email: '@current_email'
            };
            setComments(__spreadArray(__spreadArray([], comments, true), [newCommentObj], false));
            setNewComment('');
            setImage(null);
        }
    };
    return (_jsxs(Box, { p: 4, color: 'white', children: [_jsxs(HStack, { mb: 4, spacing: 4, children: [_jsx(Link, { to: '/', children: _jsx(IconButton, { icon: _jsx(ArrowBackIcon, {}), background: 'transparent', color: 'white', fontSize: '20px', "aria-label": "Back" }) }), _jsx(Text, { fontSize: "2xl", ml: -3, fontWeight: "bold", children: "Status" })] }), _jsx(Box, { bg: "black", p: 4, borderRadius: "md", mb: 4, children: _jsxs(VStack, { spacing: 2, align: "start", children: [_jsxs(HStack, { spacing: 2, children: [_jsx(Avatar, { size: "sm", name: "John Doe", src: "https://bit.ly/dan-abramov" }), _jsxs(VStack, { align: "start", ml: 2, children: [_jsx(Text, { fontWeight: "bold", children: "John Doe" }), _jsx(Text, { fontSize: 'small', mt: -2, color: 'grey', children: " @ John Doe" })] })] }), _jsx(Text, { children: "This is the post content. It can be text, images, or other types of content." }), _jsxs(HStack, { spacing: 4, mt: 2, children: [_jsx(IconButton, { size: "sm", color: "grey", background: 'transparent', "aria-label": "Like", icon: _jsx(FaHeart, {}) }), _jsxs(HStack, { spacing: 1, align: "center", children: [_jsx(IconButton, { size: "sm", color: "grey", background: 'transparent', "aria-label": "Comment", icon: _jsx(FaComment, {}) }), _jsx(Text, { fontSize: "sm", color: "gray", children: "300 Replies" })] })] })] }) }), _jsx(Divider, { my: 4 }), _jsx(Box, { mb: 6, p: 4, borderRadius: "md", border: "1px solid black", bg: "black", color: "white", children: _jsxs(HStack, { spacing: 4, children: [_jsx(Avatar, { size: "md", name: "User", src: "https://bit.ly/dan-abramov" }), _jsxs(VStack, { align: "start", flex: "1", children: [_jsxs(InputGroup, { children: [_jsx(Input, { placeholder: "What's on your mind?", value: newComment, onChange: handleCommentChange, bg: "black", color: "white", borderRadius: "md", border: '1px grey solid', pr: "120px" // Space for icon and button
                                            , onKeyDown: function (e) {
                                                if (e.key === 'Enter') {
                                                    handleCommentSubmit();
                                                }
                                            } }), _jsx(InputRightElement, { children: _jsxs(HStack, { spacing: 2, ml: -20, children: [_jsx(IconButton, { as: "label", htmlFor: "image-upload", "aria-label": "Upload Image", icon: _jsx(FaImage, {}), color: "white", bg: "transparent", size: "md", borderRadius: "md", _hover: { bg: 'grey' } }), _jsx("input", { type: "file", accept: "image/*", id: "image-upload", style: { display: 'none' }, onChange: handleImageChange }), _jsx(Button, { bg: "brand.main", color: "white", p: 3, onClick: handleCommentSubmit, size: "xs", borderRadius: "full", _hover: { bg: 'green.400' }, children: "Reply" })] }) })] }), image && (_jsx(Image, { src: URL.createObjectURL(image), alt: "Uploaded preview", mt: 4, borderRadius: "md", mx: 'auto', h: '200px' }))] })] }) }), _jsx(VStack, { spacing: 3, align: "start", children: comments.map(function (comment) { return (_jsxs(Box, { p: 2, borderRadius: "md", width: "full", children: [_jsxs(HStack, { spacing: 2, children: [_jsx(Avatar, { size: "sm", name: comment.username }), _jsx(Text, { fontWeight: "bold", children: comment.username }), _jsx(Text, { fontSize: 'small', color: 'grey', children: comment.email }), _jsx(Text, { color: "gray", fontSize: 'small', children: "2h" })] }), _jsx(Text, { mt: 1, children: comment.text }), _jsx(Divider, { my: 4 })] }, comment.id)); }) })] }));
}

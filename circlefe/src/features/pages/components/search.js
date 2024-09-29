import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Input, InputGroup, InputLeftElement, Box, Text, List, ListItem, Flex, VStack, Image, Button } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
// Daftar teman dengan detail tambahan dan URL gambar avatar dari sumber online
var friends = [
    { name: 'Dwipurnomo', username: '@dwipurnomo', bio: 'Software Developer', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Alice', username: '@alice', bio: 'Graphic Designer', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Bob', username: '@bob', bio: 'Photographer', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Charlie', username: '@charlie', bio: 'Writer', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'David', username: '@david', bio: 'Musician', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { name: 'Eva', username: '@eva', bio: 'Content Creator', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Frank', username: '@frank', bio: 'Entrepreneur', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { name: 'Grace', username: '@grace', bio: 'Teacher', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
];
export function SearchMainContent() {
    var _a = useState(''), query = _a[0], setQuery = _a[1];
    var _b = useState(false), isFocused = _b[0], setIsFocused = _b[1];
    // Filter saran berdasarkan query
    var filteredFriends = useMemo(function () {
        return friends.filter(function (friend) {
            return friend.name.toLowerCase().includes(query.toLowerCase());
        });
    }, [query]);
    var handleChange = function (event) {
        setQuery(event.target.value);
    };
    var handleSelect = function (name) {
        setQuery(name);
        setIsFocused(false); // Menutup saran setelah memilih
    };
    return (_jsxs(Box, { p: 4, bg: "black", borderRadius: "md", color: 'white', boxShadow: "md", position: "relative", children: [_jsxs(InputGroup, { children: [_jsx(InputLeftElement, { children: _jsx(FaUser, { color: 'grey' }) }), _jsx(Input, { placeholder: "Enter friend's name...", value: query, onChange: handleChange, onFocus: function () { return setIsFocused(true); }, onBlur: function () { return setTimeout(function () { return setIsFocused(false); }, 200); }, size: "md", borderColor: 'grey' })] }), isFocused && query && filteredFriends.length > 0 && (_jsx(Box, { position: "absolute", top: "100%", left: 0, bg: "black", color: "white", borderRadius: "md", boxShadow: "md", mt: 2, p: 2, width: "100%", children: _jsx(List, { spacing: 1, children: filteredFriends.map(function (friend) { return (_jsx(ListItem, { p: 2, borderRadius: "md", _hover: { bg: 'gray.900', cursor: 'pointer' }, onClick: function () { return handleSelect(friend.name); }, children: _jsxs(Flex, { align: "center", justify: "space-between", children: [_jsxs(Flex, { align: "center", children: [_jsx(Image, { src: friend.avatar, alt: "".concat(friend.name, "'s avatar"), borderRadius: "full", boxSize: "40px", mr: 2 }), _jsxs(VStack, { align: "start", spacing: 0, children: [_jsx(Text, { fontWeight: "bold", children: friend.name }), _jsx(Text, { color: "white", children: friend.username }), _jsx(Text, { color: "white", fontSize: "sm", children: friend.bio })] })] }), _jsx(Button, { size: "sm", colorScheme: "black", variant: "outline", children: "Follow" })] }) }, friend.name)); }) }) }))] }));
}

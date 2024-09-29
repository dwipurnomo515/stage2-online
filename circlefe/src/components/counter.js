import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/Counter.tsx
import { useState } from "react";
export function Counter() {
    var _a = useState(0), counter = _a[0], setCounter = _a[1];
    function tambah() {
        setCounter(counter + 1);
    }
    function kurang() {
        setCounter(counter - 1);
    }
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: counter }), _jsx("button", { onClick: tambah, children: "Tambah" }), _jsx("button", { onClick: kurang, children: "Kurang" })] }));
}

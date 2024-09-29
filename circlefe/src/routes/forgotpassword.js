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
import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@chakra-ui/react";
import { ForgotPassword } from "../features/auth/components/forgotpassword";
import { useCenterContentProps } from "../utils/center";
var center = useCenterContentProps();
export default function ForgotPasswordRoute() {
    return (_jsx(Box, __assign({}, center, { children: _jsx(ForgotPassword, {}) })));
}

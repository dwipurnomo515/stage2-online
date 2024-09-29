"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
function authorize(role) {
    return (req, res, next) => {
        const user = req.user;
        if (user.role !== role) {
            return res.status(403).json({
                message: "FORBIDDEN",
            });
        }
        ;
        next();
    };
}

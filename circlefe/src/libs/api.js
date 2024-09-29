import axios from "axios";
import Cookies from "js-cookie";
var baseURL = "http://localhost:5000";
export var apiV1 = axios.create({
    baseURL: "".concat(baseURL, "/api/v1"),
    headers: {
        Authorization: "Bearer ".concat(Cookies.get("token"))
    }
});

import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:5000";
export const apiV1 = axios.create({
    baseURL: `${baseURL}/api/v1`,
    headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
    }
});
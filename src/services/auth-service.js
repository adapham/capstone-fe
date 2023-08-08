import axios from "axios";
import {API_AUTH_URL, API_BASE_URL} from "../constants";

const register = (username, email, password) => {
    return axios.post(API_BASE_URL + "signup", {
        username,
        email,
        password,
    });
};
const login = (usernameOrEmail, password) => {
    console.log('login')

    return axios
        .post(API_AUTH_URL + "/sign-in", {
            usernameOrEmail,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        }).catch((e) => {
                throw e.response.data.description
            }
        );
};
const logout = () => {
    localStorage.removeItem("user");
};
const getCurrentUser = () => {
    console.log(localStorage)
    console.log(localStorage.getItem("user"))
    return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};
export default AuthService;
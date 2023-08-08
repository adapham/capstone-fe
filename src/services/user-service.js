import axios from "axios";
import authHeader from "./auth-header";
import {API_BASE_URL} from "../constants";


const getPublicContent = () => {
    return axios.get(API_BASE_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_BASE_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
    return axios.get(API_BASE_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_BASE_URL + "admin", { headers: authHeader() });
};

const UserService = {
    getPublicContent,
    getUserBoard,
    getModeratorBoard,
    getAdminBoard,
};

export default UserService;
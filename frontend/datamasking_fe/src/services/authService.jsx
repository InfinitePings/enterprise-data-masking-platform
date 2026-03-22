import API from "../api/axiosConfig";

export const loginUser = async (data) => {
    return await API.post("/auth/login", data);
};

export const registerUser = async (data) => {
    return await API.post("/auth/register", data);
};